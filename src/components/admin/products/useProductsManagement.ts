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
    show_manufacturer: true,
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
    queryKey: ["products"],
    queryFn: async () => {
      console.log("🔧 Admin: Fetching products from Supabase...");
      const query = supabase.from("products").select("*");

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
  // Parse categories properly for filtering
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

  // Filter products on frontend based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => {
        const categories = parseCategories(product.category || []);
        return categories.some(cat => cat.trim() === selectedCategory);
      });
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

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
          show_manufacturer: true,
        });
      },
    });
  };

  const handleEditProduct = (product: Product) => {
    console.log("🔧 Admin: Setting product for editing:", product);
    // Handle both array and string categories for backward compatibility
    const categories = Array.isArray(product.category)
      ? product.category
      : product.category
        ? [product.category]
        : [];

    const productToEdit = {
      ...product,
      composition: product.composition || "",
      dosage: product.dosage || "",
      usage: product.usage || "",
      precautions: product.precautions || "",
      manufacturer: product.manufacturer || "",
      show_manufacturer: product.show_manufacturer !== false,
      category: categories,
    };
    setEditingProduct(productToEdit);

    // Fix: Ensure all properties match the newProduct state type
    const productForForm = {
      name: product.name,
      description: product.description || "",
      price: product.price || 0,
      category: categories,
      is_prescription: product.is_prescription || false,
      status: product.status || "active",
      featured: product.featured || false,
      image_url: product.image_url || "",
      composition: product.composition || "",
      dosage: product.dosage || "",
      usage: product.usage || "",
      precautions: product.precautions || "",
      manufacturer: product.manufacturer || "",
      show_manufacturer: product.show_manufacturer !== false,
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
    products: filteredProducts,
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
