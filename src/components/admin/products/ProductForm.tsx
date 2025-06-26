import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
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
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label>Product Name *</Label>
          <Input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Product name"
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select
            value={product.category}
            onValueChange={(value) =>
              setProduct({ ...product, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Manufacturer</Label>
          <Input
            value={product.manufacturer}
            onChange={(e) =>
              setProduct({ ...product, manufacturer: e.target.value })
            }
            placeholder="Manufacturer name"
          />
        </div>
      </div>

      <div>
        <Label>Status</Label>
        <Select
          value={product.status}
          onValueChange={(value) => setProduct({ ...product, status: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="discontinued">Discontinued</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Product Image</Label>
        <div className="space-y-2">
          {product.image_url && (
            <img
              src={product.image_url}
              alt="Product preview"
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div className="flex items-center gap-2">
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
            />
            {uploadingImage && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </div>
      </div>

      <div>
        <Label>Composition</Label>
        <Textarea
          value={product.composition}
          onChange={(e) =>
            setProduct({ ...product, composition: e.target.value })
          }
          placeholder="Product composition"
          rows={2}
        />
      </div>

      <div>
        <Label>Dosage</Label>
        <Input
          value={product.dosage}
          onChange={(e) => setProduct({ ...product, dosage: e.target.value })}
          placeholder="e.g., 250mg, 1 tablet twice daily"
        />
      </div>

      <div>
        <Label>Usage Instructions</Label>
        <Textarea
          value={product.usage}
          onChange={(e) => setProduct({ ...product, usage: e.target.value })}
          placeholder="How to use this product"
          rows={2}
        />
      </div>

      <div>
        <Label>Precautions</Label>
        <Textarea
          value={product.precautions}
          onChange={(e) =>
            setProduct({ ...product, precautions: e.target.value })
          }
          placeholder="Precautions and warnings"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={product.is_prescription}
            onCheckedChange={(checked) =>
              setProduct({ ...product, is_prescription: checked })
            }
          />
          <Label>Prescription Required</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={product.featured}
            onCheckedChange={(checked) =>
              setProduct({ ...product, featured: checked })
            }
          />
          <Label>Featured Product</Label>
        </div>
      </div>
    </div>
  );
};
