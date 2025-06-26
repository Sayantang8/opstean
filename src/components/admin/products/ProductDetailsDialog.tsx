
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

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

interface ProductDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  isOpen,
  onOpenChange,
  product
}) => {
  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'discontinued': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        {product && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="w-24 h-24 rounded object-cover" />
              )}
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant={getStatusBadgeColor(product.status)}>
                    {product.status}
                  </Badge>
                  {product.featured && <Badge variant="default">Featured</Badge>}
                  {product.is_prescription && <Badge variant="outline">Prescription Required</Badge>}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Category:</strong> {product.category}</div>
              <div><strong>Dosage:</strong> {product.dosage}</div>
              <div><strong>Manufacturer:</strong> {product.manufacturer}</div>
            </div>
            
            {product.description && (
              <div>
                <strong>Description:</strong>
                <p className="mt-1">{product.description}</p>
              </div>
            )}
            
            {product.composition && (
              <div>
                <strong>Composition:</strong>
                <p className="mt-1">{product.composition}</p>
              </div>
            )}
            
            {product.usage && (
              <div>
                <strong>Usage:</strong>
                <p className="mt-1">{product.usage}</p>
              </div>
            )}
            
            {product.sideEffects && (
              <div>
                <strong>Side Effects:</strong>
                <p className="mt-1">{product.sideEffects}</p>
              </div>
            )}
            
            {product.precautions && (
              <div>
                <strong>Precautions:</strong>
                <p className="mt-1">{product.precautions}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
