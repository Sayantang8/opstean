import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { productCategories } from '@/data/productCategories';

interface CategoryCount {
    category: string;
    count: number;
}

// Robust category parser that handles deeply nested JSON strings
const parseCategories = (categoryData: any): string[] => {


    // Recursive function to deeply parse nested JSON strings
    const deepParse = (data: any): any => {
        if (typeof data === 'string') {
            const trimmed = data.trim();
            // Check if it looks like JSON
            if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
                (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
                try {
                    const parsed = JSON.parse(trimmed);
                    // Recursively parse the result in case it's still a JSON string
                    return deepParse(parsed);
                } catch (e) {
                    // If parsing fails, return the original string
                    return trimmed;
                }
            }
            return trimmed;
        } else if (Array.isArray(data)) {
            // Recursively parse each item in the array
            return data.map(item => deepParse(item)).flat();
        } else {
            return data;
        }
    };

    // Start the deep parsing process
    const parsed = deepParse(categoryData);


    // Flatten and clean the result
    const flattenArray = (arr: any): string[] => {
        const result: string[] = [];

        if (Array.isArray(arr)) {
            arr.forEach(item => {
                if (Array.isArray(item)) {
                    result.push(...flattenArray(item));
                } else if (typeof item === 'string' && item.trim()) {
                    result.push(item.trim());
                }
            });
        } else if (typeof arr === 'string' && arr.trim()) {
            result.push(arr.trim());
        }

        return result;
    };

    const categories = flattenArray(parsed);
    return categories.filter(cat => cat && cat.length > 0);
};

export const useCategoryCounts = () => {
    const queryClient = useQueryClient();

    // Main query for category counts
    const { data: categoryCounts = [], isLoading, refetch } = useQuery<CategoryCount[]>({
        queryKey: ['category-counts'],
        queryFn: async () => {
            console.log('🔍 useCategoryCounts: Fetching category counts...');

            try {
                const { data: products, error } = await supabase
                    .from('products')
                    .select('id, name, category, status')
                    .eq('status', 'active');

                if (error) {
                    console.error('❌ useCategoryCounts: Error fetching products:', error);
                    throw error;
                }

                console.log('✅ useCategoryCounts: Products fetched for counting:', products?.length || 0);


                // Count products by category using the same parsing logic as ProductsPage
                const counts: Record<string, number> = {};

                products?.forEach((product, index) => {
                    if (product.category) {
                        const categories = parseCategories(product.category);
                        categories.forEach((cat: string) => {
                            const cleanCat = cat.trim();
                            if (cleanCat) {
                                counts[cleanCat] = (counts[cleanCat] || 0) + 1;
                            }
                        });
                    } else {
                        console.log(`⚠️ Product ${index + 1} (${product.name}): no category found`);
                    }
                });



                // Map to our category structure with real counts
                const categoryCountsArray = productCategories.map((category) => ({
                    category: category.name,
                    count: counts[category.name] || 0,
                }));

                console.log('📊 useCategoryCounts: Final category counts:', categoryCountsArray);

                // If no products found, return zero counts
                if (!products || products.length === 0) {
                    console.log('⚠️ useCategoryCounts: No products found in database');
                    return productCategories.map((category) => ({
                        category: category.name,
                        count: 0,
                    }));
                }

                return categoryCountsArray;
            } catch (error) {
                console.error('❌ useCategoryCounts: Error calculating category counts:', error);
                // Return empty counts on error
                return productCategories.map((category) => ({
                    category: category.name,
                    count: 0,
                }));
            }
        },
        staleTime: 30000, // Consider data fresh for 30 seconds
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    // Listen for products query invalidation to automatically update category counts
    useEffect(() => {
        const handleProductsChange = () => {
            console.log('🔄 useCategoryCounts: Products query invalidated, updating category counts...');
            queryClient.invalidateQueries({ queryKey: ['category-counts'] });
        };

        // Listen for products query invalidation
        const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
            if (event.type === 'queryInvalidated' &&
                event.query.queryKey[0] === 'products') {
                handleProductsChange();
            }
        });

        return () => unsubscribe();
    }, [queryClient]);

    // Set up real-time subscription for product changes
    useEffect(() => {
        console.log('🔄 useCategoryCounts: Setting up real-time subscription...');

        const channel = supabase
            .channel('products-changes')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
                    schema: 'public',
                    table: 'products',
                },
                (payload) => {
                    console.log('🔄 useCategoryCounts: Real-time product change detected:', payload.eventType);
                    // Invalidate category counts when any product changes
                    queryClient.invalidateQueries({ queryKey: ['category-counts'] });
                    // Also invalidate products query to keep everything in sync
                    queryClient.invalidateQueries({ queryKey: ['products'] });
                }
            )
            .subscribe();

        return () => {
            console.log('🔄 useCategoryCounts: Cleaning up real-time subscription...');
            supabase.removeChannel(channel);
        };
    }, [queryClient]);

    return {
        categoryCounts,
        isLoading,
        refetch,
    };
};