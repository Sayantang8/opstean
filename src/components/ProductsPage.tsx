import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Search, Star, Package, Filter, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { productCategories } from '@/data/productCategories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  sku: string;
  manufacturer?: string;
  dosage?: string;
  image_url?: string;
  is_prescription: boolean;
  featured?: boolean;
  composition?: string;
  usage?: string;
  sideEffects?: string;
  precautions?: string;
  product_form?: string;
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Use the same query as admin and homepage for consistency
  const { data: products = [], isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ['products', searchQuery, selectedCategory],
    queryFn: async () => {
      console.log('🔍 ProductsPage: Fetching products from Supabase...');
      let query = supabase.from('products').select('*');
      
      // Apply filters
      if (searchQuery.trim()) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,manufacturer.ilike.%${searchQuery}%`);
      }
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      // Only show active products on the public products page
      query = query.eq('status', 'active');
      
      // Sort alphabetically by name instead of by date
      const { data, error } = await query.order('name', { ascending: true });
      
      if (error) {
        console.error('❌ ProductsPage: Error fetching products:', error);
        throw error;
      }
      
      console.log('✅ ProductsPage: Products fetched:', data);
      console.log('📊 ProductsPage: Total active products:', data?.length || 0);
      
      return data as Product[];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  // Add effect to refetch when component mounts
  useEffect(() => {
    console.log('🔄 ProductsPage component mounted, refetching products...');
    refetch();
  }, [refetch]);

  // Listen for custom events from homepage to open specific product details
  useEffect(() => {
    const handleOpenProductDetails = (event: CustomEvent) => {
      const { productId } = event.detail;
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setIsDetailDialogOpen(true);
      }
    };

    window.addEventListener('openProductDetails', handleOpenProductDetails as EventListener);
    return () => window.removeEventListener('openProductDetails', handleOpenProductDetails as EventListener);
  }, [products]);

  console.log('🏪 ProductsPage - Current products state:', products);
  console.log('🏪 ProductsPage - Products count:', products.length);
  console.log('🏪 ProductsPage - Search query:', searchQuery);
  console.log('🏪 ProductsPage - Selected category:', selectedCategory);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'discontinued': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-teal mx-auto mb-4" />
            <span className="text-navy">Loading products...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Products query error:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-red-500 mb-4">Unable to load products.</p>
            <p className="text-gray-600">Please check your connection and try again.</p>
            <p className="text-sm text-red-400 mt-2">Error: {error.message}</p>
            <Button onClick={() => refetch()} className="mt-4 bg-teal hover:bg-navy">
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 pt-20"> {/* Added padding-top to account for fixed navbar */}
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy mb-4">Our Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of pharmaceutical products designed to meet your healthcare needs.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-teal to-navy mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {productCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => refetch()} variant="outline">
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Showing {products.length} products
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No products found.</p>
              <p className="text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Products you add from the admin panel will appear here!'}
              </p>
              <Button onClick={() => refetch()} className="mt-4 bg-teal hover:bg-navy">
                Refresh Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300 border border-gray-100 cursor-pointer group flex flex-col h-full"
                  onClick={() => openProductDetail(product)}
                >
                  <div className="relative overflow-hidden">
                    {product.image_url ? (
                      <AspectRatio ratio={4/3} className="bg-gray-100">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                          onError={(e) => {
                            console.log('❌ Image failed to load:', product.image_url);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </AspectRatio>
                    ) : (
                      <AspectRatio ratio={4/3} className="bg-gray-200">
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-16 w-16 text-gray-400" />
                        </div>
                      </AspectRatio>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.featured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {product.is_prescription && (
                        <Badge variant="outline" className="bg-white">Rx</Badge>
                      )}
                    </div>
                    
                    <div className="absolute top-2 left-2">
                      <Badge variant={getStatusBadgeColor(product.status)}>
                        {product.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="space-y-1 mb-3 text-sm text-gray-600">
                      <p><span className="font-medium">Category:</span> {product.category}</p>
                      {product.manufacturer && (
                        <p><span className="font-medium">Manufacturer:</span> {product.manufacturer}</p>
                      )}
                      {product.product_form && (
                        <p><span className="font-medium">Form:</span> {product.product_form}</p>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2 flex-1">
                      {product.description || 'No description available'}
                    </p>

                    <div className="flex justify-end mt-auto">
                      <Button
                        size="sm"
                        className="bg-teal/10 text-teal hover:bg-teal hover:text-white transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductDetail(product);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-navy">
                  {selectedProduct?.name}
                </DialogTitle>
              </DialogHeader>
              
              {selectedProduct && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      {selectedProduct.image_url ? (
                        <AspectRatio ratio={4/3}>
                          <img
                            src={selectedProduct.image_url}
                            alt={selectedProduct.name}
                            className="w-full h-full object-contain rounded-lg shadow-md p-2 bg-gray-50"
                          />
                        </AspectRatio>
                      ) : (
                        <AspectRatio ratio={4/3} className="bg-gray-200 rounded-lg">
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-16 w-16 text-gray-400" />
                          </div>
                        </AspectRatio>
                      )}
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={getStatusBadgeColor(selectedProduct.status)}>
                          {selectedProduct.status}
                        </Badge>
                        {selectedProduct.featured && (
                          <Badge className="bg-yellow-500">Featured</Badge>
                        )}
                        {selectedProduct.is_prescription && (
                          <Badge variant="outline">Prescription Required</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Category:</strong> {selectedProduct.category}</div>
                        {selectedProduct.manufacturer && (
                          <div><strong>Manufacturer:</strong> {selectedProduct.manufacturer}</div>
                        )}
                        {selectedProduct.dosage && (
                          <div><strong>Dosage:</strong> {selectedProduct.dosage}</div>
                        )}
                        {selectedProduct.product_form && (
                          <div><strong>Form:</strong> {selectedProduct.product_form}</div>
                        )}
                        {selectedProduct.sku && (
                          <div><strong>SKU:</strong> {selectedProduct.sku}</div>
                        )}
                      </div>
                      
                      {selectedProduct.description && (
                        <div>
                          <h4 className="font-semibold text-navy mb-2">Description</h4>
                          <p className="text-gray-700">{selectedProduct.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProduct.composition && (
                      <div>
                        <h4 className="font-semibold text-navy mb-2">Composition</h4>
                        <p className="text-gray-700">{selectedProduct.composition}</p>
                      </div>
                    )}
                    
                    {selectedProduct.usage && (
                      <div>
                        <h4 className="font-semibold text-navy mb-2">Usage Instructions</h4>
                        <p className="text-gray-700">{selectedProduct.usage}</p>
                      </div>
                    )}
                    
                    {selectedProduct.precautions && (
                      <div>
                        <h4 className="font-semibold text-navy mb-2">Precautions</h4>
                        <p className="text-gray-700">{selectedProduct.precautions}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
