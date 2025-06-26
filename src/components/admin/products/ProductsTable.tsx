
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Eye, Star } from 'lucide-react';

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

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (id: number) => void;
  onToggleFeatured: (product: Product) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onView,
  onDelete,
  onToggleFeatured
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded object-cover" />
                )}
                <div>
                  <div className="font-medium">{product.name}</div>
                  {product.is_prescription && (
                    <Badge variant="outline" className="text-xs">Rx</Badge>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>{product.category || 'N/A'}</TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeColor(product.status)}>
                {product.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFeatured(product)}
                className={product.featured ? 'text-yellow-600' : 'text-gray-400'}
              >
                <Star className={`h-4 w-4 ${product.featured ? 'fill-current' : ''}`} />
              </Button>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
