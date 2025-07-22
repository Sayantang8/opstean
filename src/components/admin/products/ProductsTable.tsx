
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Eye, Star, Package } from 'lucide-react';
import { productCategories } from '@/data/productCategories';

interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: string[] | string;
  is_prescription?: boolean;
  status?: string;
  featured?: boolean;
  image_url?: string;
  composition?: string;
  dosage?: string;
  usage?: string;
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
  // Parse categories properly - handle string that looks like array format
  const parseCategories = (categoryData: string[] | string): string[] => {
    if (Array.isArray(categoryData)) {
      const flatCategories: string[] = [];
      categoryData.forEach(item => {
        if (typeof item === 'string') {
          const trimmed = item.trim();
          if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
              const parsed = JSON.parse(trimmed);
              if (Array.isArray(parsed)) {
                flatCategories.push(...parsed.filter(cat => cat && typeof cat === 'string' && cat.trim()));
              } else {
                flatCategories.push(trimmed);
              }
            } catch (e) {
              flatCategories.push(trimmed);
            }
          } else if (trimmed) {
            flatCategories.push(trimmed);
          }
        }
      });
      return flatCategories.filter(cat => cat && cat.trim());
    }
    
    if (typeof categoryData === 'string') {
      const trimmed = categoryData.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            const flatCategories: string[] = [];
            parsed.forEach(item => {
              if (typeof item === 'string') {
                const itemTrimmed = item.trim();
                if (itemTrimmed.startsWith('[') && itemTrimmed.endsWith(']')) {
                  try {
                    const nestedParsed = JSON.parse(itemTrimmed);
                    if (Array.isArray(nestedParsed)) {
                      flatCategories.push(...nestedParsed.filter(cat => cat && typeof cat === 'string' && cat.trim()));
                    } else {
                      flatCategories.push(itemTrimmed);
                    }
                  } catch (e) {
                    flatCategories.push(itemTrimmed);
                  }
                } else if (itemTrimmed) {
                  flatCategories.push(itemTrimmed);
                }
              }
            });
            return flatCategories.filter(cat => cat && cat.trim());
          }
        } catch (e) {
          const manualParsed = trimmed
            .slice(1, -1)
            .split(',')
            .map(item => item.trim().replace(/^["']|["']$/g, ''))
            .filter(item => item.length > 0);
          return manualParsed;
        }
      }
      if (trimmed) {
        return [trimmed];
      }
    }
    return [];
  };

  // Get category styling
  const getCategoryStyle = (categoryName: string) => {
    const categoryInfo = productCategories.find(cat => cat.name === categoryName);
    if (!categoryInfo) return "bg-slate-50 text-slate-700 border-slate-200";

    switch (categoryInfo.id) {
      case "antibiotics": return "bg-blue-50 text-blue-700 border-blue-200";
      case "eye-care": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "child-care": return "bg-pink-50 text-pink-700 border-pink-200";
      case "cardio-care": return "bg-red-50 text-red-700 border-red-200";
      case "gastro": return "bg-orange-50 text-orange-700 border-orange-200";
      case "general-segment": return "bg-purple-50 text-purple-700 border-purple-200";
      case "urology-care": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "pain-care": return "bg-red-50 text-red-700 border-red-200";
      case "gyno-care": return "bg-pink-50 text-pink-700 border-pink-200";
      case "ortho-care": return "bg-gray-50 text-gray-700 border-gray-200";
      case "cold-care": return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "nuro-care": return "bg-violet-50 text-violet-700 border-violet-200";
      case "derma-care": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'discontinued': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="font-semibold text-gray-900">Product</TableHead>
          <TableHead className="font-semibold text-gray-900">Categories</TableHead>
          <TableHead className="font-semibold text-gray-900">Details</TableHead>
          <TableHead className="font-semibold text-gray-900">Status</TableHead>
          <TableHead className="font-semibold text-gray-900 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
            <TableCell>
              <div className="flex items-center gap-4">
                {product.image_url && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <AspectRatio ratio={1}>
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </AspectRatio>
                  </div>
                )}
                {!product.image_url && (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
                  <div className="flex items-center gap-2">
                    {product.manufacturer && (
                      <span className="text-sm text-gray-600">{product.manufacturer}</span>
                    )}
                    {product.is_prescription && (
                      <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                        Prescription Required
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1 max-w-xs">
                {parseCategories(product.category).length > 0 ? (
                  parseCategories(product.category).map((categoryName, idx) => {
                    const cleanCategoryName = categoryName.trim();
                    if (!cleanCategoryName) return null;
                    
                    return (
                      <Badge
                        key={`${product.id}-category-${idx}-${cleanCategoryName}`}
                        variant="outline"
                        className={`${getCategoryStyle(cleanCategoryName)} text-xs font-medium px-2 py-1 rounded-md border`}
                      >
                        {cleanCategoryName}
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-500 italic">No categories</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {product.dosage && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Dosage:</span>
                    <span className="text-gray-600 ml-1">{product.dosage}</span>
                  </div>
                )}
                {product.description && (
                  <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                    {product.description}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <Badge variant={getStatusBadgeColor(product.status)} className="w-fit">
                  {product.status}
                </Badge>
                {product.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 w-fit">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFeatured(product)}
                  className={`${product.featured ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'} transition-colors`}
                  title={product.featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star className={`h-4 w-4 ${product.featured ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(product)}
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  title="Edit product"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  className="hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                  title="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>
  );
};
