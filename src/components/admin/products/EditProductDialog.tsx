
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { ProductForm } from './ProductForm';

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: any;
  setEditingProduct: (product: any) => void;
  uploadingImage: boolean;
  onImageUpload: (file: File) => void;
  onUpdateProduct: () => void;
  updateProductMutation: any;
}

export const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onOpenChange,
  editingProduct,
  setEditingProduct,
  uploadingImage,
  onImageUpload,
  onUpdateProduct,
  updateProductMutation
}) => {
  console.log('🔧 EditProductDialog: Rendering with editingProduct:', editingProduct);
  console.log('🔧 EditProductDialog: Dialog isOpen:', isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {editingProduct && (
          <>
            <ProductForm
              product={editingProduct}
              setProduct={setEditingProduct}
              isEditing={true}
              uploadingImage={uploadingImage}
              onImageUpload={onImageUpload}
            />
            <Button 
              onClick={onUpdateProduct}
              disabled={updateProductMutation.isPending}
              className="w-full"
            >
              {updateProductMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
