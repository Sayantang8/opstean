import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MultiSelectCategories } from "@/components/ui/multi-select-categories";

interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: string[];
  is_prescription?: boolean;
  status?: string;
  featured?: boolean;
  image_url?: string;
  composition?: string;
  dosage?: string;
  usage?: string;
  precautions?: string;
  manufacturer?: string;
  show_manufacturer?: boolean;
  created_at?: string;
}

interface ProductFormProps {
  product: any;
  setProduct: (product: any) => void;
  isEditing?: boolean;
  uploadingImage: boolean;
  onImageUpload: (file: File, isEditing?: boolean) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  setProduct,
  isEditing = false,
  uploadingImage,
  onImageUpload,
}) => {
  // Parse categories properly for display in edit form
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

  // Get parsed categories for the form
  const currentCategories = parseCategories(product.category || []);
  return (
    <div className="space-y-6 py-4">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Product Name *</Label>
            <Input
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Enter product name"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Enter product description"
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Categories</Label>
              <div className="mt-1">
                <MultiSelectCategories
                  value={currentCategories}
                  onChange={(categories) =>
                    setProduct({ ...product, category: categories })
                  }
                  placeholder="Select categories..."
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Manufacturer</Label>
              <Input
                value={product.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product, manufacturer: e.target.value })
                }
                placeholder="Manufacturer name"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Product Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product.image_url && (
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                  <AspectRatio ratio={1}>
                    <img
                      src={product.image_url}
                      alt="Product preview"
                      className="w-full h-full object-contain p-1"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Current Image</p>
                  <p className="text-xs text-gray-500">Upload a new image to replace</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImageUpload(file, isEditing);
                    }
                  }}
                  disabled={uploadingImage}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {uploadingImage && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </div>
              )}
            </div>
            {!product.image_url && (
              <p className="text-xs text-gray-500">Recommended: 400x400px, PNG or JPG format</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Composition</Label>
            <Textarea
              value={product.composition}
              onChange={(e) =>
                setProduct({ ...product, composition: e.target.value })
              }
              placeholder="Active ingredients and composition"
              rows={2}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Dosage</Label>
              <Input
                value={product.dosage}
                onChange={(e) => setProduct({ ...product, dosage: e.target.value })}
                placeholder="e.g., 250mg, 1 tablet twice daily"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <Select
                value={product.status}
                onValueChange={(value) => setProduct({ ...product, status: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Usage Instructions</Label>
            <Textarea
              value={product.usage}
              onChange={(e) => setProduct({ ...product, usage: e.target.value })}
              placeholder="How to use this product"
              rows={2}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Precautions</Label>
            <Textarea
              value={product.precautions}
              onChange={(e) =>
                setProduct({ ...product, precautions: e.target.value })
              }
              placeholder="Precautions and warnings"
              rows={2}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Product Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-900">Prescription Required</Label>
                <p className="text-xs text-gray-500 mt-1">Requires prescription to purchase</p>
              </div>
              <Switch
                checked={product.is_prescription}
                onCheckedChange={(checked) =>
                  setProduct({ ...product, is_prescription: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-900">Featured Product</Label>
                <p className="text-xs text-gray-500 mt-1">Show on homepage featured section</p>
              </div>
              <Switch
                checked={product.featured}
                onCheckedChange={(checked) =>
                  setProduct({ ...product, featured: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-900">Show Manufacturer</Label>
                <p className="text-xs text-gray-500 mt-1">Display manufacturer on product cards</p>
              </div>
              <Switch
                checked={product.show_manufacturer !== false}
                onCheckedChange={(checked) =>
                  setProduct({ ...product, show_manufacturer: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};