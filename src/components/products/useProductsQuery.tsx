import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: number;
  name: string;
  category: string[] | string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  sku: string;
  manufacturer?: string;
  dosage?: string;
  image_url?: string;
  is_prescription: boolean;
  featured?: boolean;
}

export const useProductsQuery = () => {
  const {
    data: allProducts = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["featured-products"], // Different key from admin to avoid cache conflicts
    queryFn: async () => {
      console.log("🔍 Fetching featured products for homepage...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .eq("featured", true)
        .order("name", { ascending: true }); // Sort alphabetically by name

      if (error) {
        console.error("❌ Error fetching featured products:", error);
        throw error;
      }

      console.log("✅ Featured products fetched for homepage:", data);
      console.log("📊 Featured products count:", data?.length || 0);

      return data as Product[];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
  });

  // Add effect to refetch when component mounts
  useEffect(() => {
    console.log(
      "🔄 Homepage component mounted, refetching featured products...",
    );
    refetch();
  }, [refetch]);

  console.log("🏠 Homepage - Current featured products state:", allProducts);
  console.log("🏠 Homepage - Featured products count:", allProducts.length);

  return { allProducts, isLoading, error, refetch };
};
