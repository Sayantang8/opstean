
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
}

interface ProductCardProps {
  product: Product;
  index: number;
  categoryIndex: number;
  onLearnMore: (productId: number) => void;
}

export const ProductCard = ({ product, index, categoryIndex, onLearnMore }: ProductCardProps) => {
  console.log('🎯 Rendering ProductCard for:', product.name);
  console.log('🎯 Product data:', product);
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden bg-gray-100">
          {product.image_url ? (
            <AspectRatio ratio={4/3} className="bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name || 'Product Image'}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                onError={(e) => {
                  console.log('❌ Image failed to load:', product.image_url);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={4/3} className="bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 font-medium text-sm">No Image</span>
              </div>
            </AspectRatio>
          )}
          
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {product.name || 'Unnamed Product'}
          </h3>
          
          {product.manufacturer && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
            </p>
          )}
          
          <p className="text-sm text-gray-700 line-clamp-3 flex-1">
            {product.description && product.description.trim() 
              ? product.description 
              : 'High-quality pharmaceutical product designed for your health needs.'
            }
          </p>

          <div className="flex justify-end items-center pt-2 mt-auto">
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              onClick={() => {
                console.log('🔥 Learn More clicked for product:', product.id);
                onLearnMore(product.id);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
