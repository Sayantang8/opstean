
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useProductMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      console.log('🔧 Admin: Creating product:', productData);
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Admin: Error creating product:', error);
        throw error;
      }
      
      console.log('✅ Admin: Product created successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('🔧 Admin: Product created, invalidating cache...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: `Product "${data.name}" created successfully and will now appear on the homepage and products page!`,
      });
    },
    onError: (error: any) => {
      console.error('Create product error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Product> & { id: number }) => {
      console.log('🔧 Admin: Updating product:', id, updates);
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);
      
      if (error) {
        console.error('❌ Admin: Error updating product:', error);
        throw error;
      }
      
      console.log('✅ Admin: Product updated successfully');
    },
    onSuccess: () => {
      console.log('🔧 Admin: Product updated, invalidating cache...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('Update product error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log('🔧 Admin: Deleting product:', id);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('❌ Admin: Error deleting product:', error);
        throw error;
      }
      
      console.log('✅ Admin: Product deleted successfully');
    },
    onSuccess: () => {
      console.log('🔧 Admin: Product deleted, invalidating cache...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: any) => {
      console.error('Delete product error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    }
  });

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation
  };
};
