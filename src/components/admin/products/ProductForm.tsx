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
import { Loader2, Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MultiSelectCategories } from "@/components/ui/multi-select-categories";
import { Badge } from "@/components/ui/badge";
import { productCategories } from "@/data/productCategories";

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
  // Get category styling for each individual category
  const getCategoryStyle = (categoryName: string) => {
    const categoryInfo = productCategories.find(
      (cat) => cat.name === categoryName,
    );

    if (!categoryInfo) return "bg-slate-50 text-slate-700 border-slate-200";

    switch (categoryInfo.id) {
      case "antibiotics":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      case "eye-care":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case "child-care":
        return "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100";
      case "cardio-care":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      case "gastro":
        return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
      case "general-segment":
        return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
      case "urology-care":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      case "pain-care":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      case "gyno-care":
        return "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100";
      case "ortho-care":
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
      case "cold-care":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100";
      case "neuro-care":
        return "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100";
      case "derma-care":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    const updatedCategories = (product.category || []).filter(
      (cat: string) => cat !== categoryToRemove
    );
    setProduct({ ...product, category: updatedCategories });
  };

  const handleAddCategory = (categoryToAdd: string) => {
    const currentCategories = product.category || [];
    if (!currentCategories.includes(categoryToAdd)) {
      setProduct({ ...product, category: [...currentCategories, categoryToAdd] });
    }
  };

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
              {isEditing ? (
                <div className="mt-1 space-y-3">
                  {/* Display current categories as removable badges */}
                  {product.category && product.category.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Current Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.category.map((categoryName: string, idx: number) => {
                          const cleanCategoryName = categoryName.trim();
                          if (!cleanCategoryName) return null;
                          
                          return (
                            <Badge
                              key={`edit-category-${idx}-${cleanCategoryName}`}
                              variant="outline"
                              className={`${getCategoryStyle(cleanCategoryName)} text-sm font-medium px-3 py-1 rounded-full border transition-all duration-200 hover:shadow-sm flex items-center gap-2`}
                            >
                              {cleanCategoryName}
                              <button
                                type="button"
                                onClick={() => handleRemoveCategory(cleanCategoryName)}
                                className="ml-1 hover:bg-red-100 rounded-full p-0.5 transition-colors"
                                title={`Remove ${cleanCategoryName}`}
                              >
                                <X className="h-3 w-3 text-red-500 hover:text-red-700" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Add new categories dropdown */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Add Categories:</p>
                    <Select onValueChange={handleAddCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category to add..." />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories
                          .filter(cat => !(product.category || []).includes(cat.name))
                          .map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${category.color}`} />
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="mt-1">
                  <MultiSelectCategories
                    value={product.category || []}
                    onChange={(categories) =>
                      setProduct({ ...product, category: categories })
                    }
                    placeholder="Select categories..."
                  />
                </div>
              )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};