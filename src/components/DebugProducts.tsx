import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { addSampleProducts } from '@/utils/addSampleProducts';

const DebugProducts = () => {
    const queryClient = useQueryClient();

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['debug-products'],
        queryFn: async () => {
            console.log('🔍 DebugProducts: Fetching all products...');
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .limit(10);

            if (error) {
                console.error('❌ DebugProducts: Error:', error);
                throw error;
            }

            console.log('✅ DebugProducts: Products found:', data);
            return data;
        }
    });

    const handleAddSampleProducts = async () => {
        const success = await addSampleProducts();
        if (success) {
            // Invalidate all product-related queries to refresh the data
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['debug-products'] });
            queryClient.invalidateQueries({ queryKey: ['category-counts'] });
        }
    };

    if (isLoading) return <div className="p-4 bg-yellow-100">Loading debug info...</div>;
    if (error) return <div className="p-4 bg-red-100">Error: {error.message}</div>;

    return (
        <div className="p-4 bg-blue-100 m-4 rounded">
            <h3 className="font-bold mb-2">Debug: Products in Database</h3>
            <p>Total products found: {products?.length || 0}</p>

            {(!products || products.length === 0) && (
                <div className="mt-2 p-2 bg-yellow-100 rounded">
                    <p className="text-sm mb-2">No products found in database!</p>
                    <button
                        onClick={handleAddSampleProducts}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
                    >
                        Add Sample Products
                    </button>
                </div>
            )}

            {products?.slice(0, 3).map((product, index) => (
                <div key={index} className="mt-2 p-2 bg-white rounded text-sm">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Status:</strong> {product.status}</p>
                    <p><strong>Category:</strong> {JSON.stringify(product.category)} (Type: {typeof product.category})</p>
                </div>
            ))}
        </div>
    );
};

export default DebugProducts;