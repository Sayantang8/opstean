
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Package, Star } from 'lucide-react';
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
  // Parse categories properly
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
      case "Gastro Care": return "bg-orange-50 text-orange-700 border-orange-200";
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Product Details</DialogTitle>
        </DialogHeader>
        {product && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start gap-6">
              {product.image_url && (
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <AspectRatio ratio={1}>
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </AspectRatio>
                </div>
              )}
              {!product.image_url && (
                <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={getStatusBadgeColor(product.status)}>
                    {product.status}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                  {product.is_prescription && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Prescription Required
                    </Badge>
                  )}
                </div>
                {product.manufacturer && (
                  <p className="text-gray-600">
                    <span className="font-medium">Manufacturer:</span> {product.manufacturer}
                  </p>
                )}
              </div>
            </div>
            
            {/* Categories Section */}
            {parseCategories(product.category).length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {parseCategories(product.category).map((categoryName, idx) => {
                    const cleanCategoryName = categoryName.trim();
                    if (!cleanCategoryName) return null;
                    
                    return (
                      <Badge
                        key={`detail-${product.id}-category-${idx}-${cleanCategoryName}`}
                        variant="outline"
                        className={`${getCategoryStyle(cleanCategoryName)} text-sm font-medium px-3 py-2 rounded-lg border`}
                      >
                        {cleanCategoryName}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.dosage && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dosage</h4>
                  <p className="text-gray-700">{product.dosage}</p>
                </div>
              )}
            </div>
            
            {product.description && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
            
            {product.composition && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Composition</h4>
                <p className="text-gray-700 leading-relaxed">{product.composition}</p>
              </div>
            )}
            
            {product.usage && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Usage Instructions</h4>
                <p className="text-gray-700 leading-relaxed">{product.usage}</p>
              </div>
            )}
            
            {product.precautions && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Precautions</h4>
                <p className="text-gray-700 leading-relaxed">{product.precautions}</p>
              </div>
            )}

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Created:</span> {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
