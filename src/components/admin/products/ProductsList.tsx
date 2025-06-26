
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProductsTable } from './ProductsTable';

interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  is_prescription?: boolean;
  status?: string;
  featured?: boolean;
  image_url?: string;
  composition?: string;
  dosage?: string;
  usage?: string;
  sideEffects?: string;
  precautions?: string;
  manufacturer?: string;
  created_at?: string;
}

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (id: number) => void;
  onToggleFeatured: (product: Product) => void;
  onAddProduct: () => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEdit,
  onView,
  onDelete,
  onToggleFeatured,
  onAddProduct
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products ({products.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {products.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-4">No products found. Create your first product!</p>
            <Button onClick={onAddProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        ) : (
          <ProductsTable
            products={products}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
            onToggleFeatured={onToggleFeatured}
          />
        )}
      </CardContent>
    </Card>
  );
};
