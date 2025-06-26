
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import { ProductForm } from './ProductForm';

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: any;
  setNewProduct: (product: any) => void;
  uploadingImage: boolean;
  onImageUpload: (file: File) => void;
  onCreateProduct: () => void;
  createProductMutation: any;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  isOpen,
  onOpenChange,
  newProduct,
  setNewProduct,
  uploadingImage,
  onImageUpload,
  onCreateProduct,
  createProductMutation
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          product={newProduct}
          setProduct={setNewProduct}
          uploadingImage={uploadingImage}
          onImageUpload={onImageUpload}
        />
        <Button 
          onClick={onCreateProduct}
          disabled={createProductMutation.isPending}
          className="w-full"
        >
          {createProductMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Product'
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
