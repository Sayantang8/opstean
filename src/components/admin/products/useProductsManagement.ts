import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProductMutations } from "./useProductMutations";
import { useImageUpload } from "./useImageUpload";

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

export const useProductsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: [],
    is_prescription: false,
    status: "active",
    featured: false,
    image_url: "",
    composition: "",
    dosage: "",
    usage: "",
    precautions: "",
    manufacturer: "",
  });

  const { uploadingImage, handleImageUpload } = useImageUpload();
  const {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  } = useProductMutations();

  // Fetch products from Supabase - using consistent query key
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", searchQuery, selectedCategory],
    queryFn: async () => {
      console.log("🔧 Admin: Fetching products from Supabase...");
      let query = supabase.from("products").select("*");

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`,
        );
      }

      if (selectedCategory !== "all") {
        query = query.contains("category", [selectedCategory]);
      }

      // Sort alphabetically by name instead of by date
      const { data, error } = await query.order("name", { ascending: true });

      if (error) {
        console.error("❌ Admin: Error fetching products:", error);
        throw error;
      }

      console.log("✅ Admin: Products fetched:", data);
      console.log("📊 Admin: Total products in database:", data?.length || 0);

      return data as Product[];
    },
  });

  const handleCreateProduct = () => {
    if (!newProduct.name) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return;
    }
    console.log("🔧 Admin: About to create product with data:", newProduct);
    createProductMutation.mutate(newProduct, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          category: "",
          is_prescription: false,
          status: "active",
          featured: false,
          image_url: "",
          composition: "",
          dosage: "",
          usage: "",
          precautions: "",
          manufacturer: "",
        });
      },
    });
  };

  const handleEditProduct = (product: Product) => {
    console.log("🔧 Admin: Setting product for editing:", product);
    const productToEdit = {
      ...product,
      composition: product.composition || "",
      dosage: product.dosage || "",
      usage: product.usage || "",
      precautions: product.precautions || "",
      manufacturer: product.manufacturer || "",
    };
    setEditingProduct(productToEdit);

    // Fix: Ensure all properties match the newProduct state type
    const productForForm = {
      name: product.name,
      description: product.description || "",
      price: product.price || 0,
      category: product.category || "",
      is_prescription: product.is_prescription || false,
      status: product.status || "active",
      featured: product.featured || false,
      image_url: product.image_url || "",
      composition: product.composition || "",
      dosage: product.dosage || "",
      usage: product.usage || "",
      precautions: product.precautions || "",
      manufacturer: product.manufacturer || "",
    };
    setNewProduct(productForForm);
    setIsEditDialogOpen(true);
    console.log(
      "🔧 Admin: Edit dialog should open, editingProduct set to:",
      productToEdit,
    );
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !editingProduct.name) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return;
    }
    updateProductMutation.mutate(editingProduct, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setEditingProduct(null);
      },
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  const toggleFeatured = async (product: Product) => {
    console.log("🔧 Admin: Toggling featured status for product:", product.id);
    const { error } = await supabase
      .from("products")
      .update({ featured: !product.featured })
      .eq("id", product.id);

    if (error) {
      console.error("❌ Admin: Error updating featured status:", error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    } else {
      console.log("✅ Admin: Featured status updated, invalidating cache...");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: `Product ${!product.featured ? "added to" : "removed from"} featured section`,
      });
    }
  };

  const handleNewProductImageUpload = (file: File) => {
    handleImageUpload(file, (imageUrl) => {
      setNewProduct({ ...newProduct, image_url: imageUrl });
    });
  };

  const handleEditProductImageUpload = (file: File) => {
    if (editingProduct) {
      handleImageUpload(file, (imageUrl) => {
        setEditingProduct({ ...editingProduct, image_url: imageUrl });
      });
    }
  };

  return {
    // State
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
    setViewingProduct,
    newProduct,
    setNewProduct,

    // Data
    products,
    isLoading,
    error,

    // Actions
    handleCreateProduct,
    handleEditProduct,
    handleViewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    toggleFeatured,
    handleNewProductImageUpload,
    handleEditProductImageUpload,

    // Mutations and utils
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    uploadingImage,
    queryClient,
  };
};
