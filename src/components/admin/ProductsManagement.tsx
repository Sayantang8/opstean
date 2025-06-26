
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProductSearchFilter } from './products/ProductSearchFilter';
import { ProductDetailsDialog } from './products/ProductDetailsDialog';
import { AddProductDialog } from './products/AddProductDialog';
import { EditProductDialog } from './products/EditProductDialog';
import { ProductsList } from './products/ProductsList';
import { useProductsManagement } from './products/useProductsManagement';

export const ProductsManagement = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    editingProduct,
    setEditingProduct,
    viewingProduct,
    newProduct,
    setNewProduct,
    products,
    isLoading,
    error,
    handleCreateProduct,
    handleEditProduct,
    handleViewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    toggleFeatured,
    handleNewProductImageUpload,
    handleEditProductImageUpload,
    createProductMutation,
    updateProductMutation,
    uploadingImage,
    queryClient
  } = useProductsManagement();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    console.error('Products query error:', error);
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading products: {error.message}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <AddProductDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          uploadingImage={uploadingImage}
          onImageUpload={handleNewProductImageUpload}
          onCreateProduct={handleCreateProduct}
          createProductMutation={createProductMutation}
        />
      </div>

      <ProductSearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        productsCount={products.length}
      />

      <ProductsList
        products={products}
        onEdit={handleEditProduct}
        onView={handleViewProduct}
        onDelete={handleDeleteProduct}
        onToggleFeatured={toggleFeatured}
        onAddProduct={() => setIsAddDialogOpen(true)}
      />

      <EditProductDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        uploadingImage={uploadingImage}
        onImageUpload={handleEditProductImageUpload}
        onUpdateProduct={handleUpdateProduct}
        updateProductMutation={updateProductMutation}
      />

      <ProductDetailsDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        product={viewingProduct}
      />
    </div>
  );
};
