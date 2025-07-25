import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useProductsQuery } from "./useProductsQuery";
import { ProductCard } from "./ProductCard";

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

export const FeaturedProductsByCategory = () => {
  const navigate = useNavigate();
  const { allProducts, isLoading, error, refetch } = useProductsQuery();

  console.log(
    "🏠 FeaturedProductsByCategory - Rendering with featured products:",
    allProducts,
  );
  console.log("🏠 Total featured products received:", allProducts.length);

  const handleLearnMore = (productId: number) => {
    console.log(
      "🔥 handleLearnMore called for featured product ID:",
      productId,
    );
    navigate(`/products`);
    setTimeout(() => {
      const event = new CustomEvent("openProductDetails", {
        detail: { productId },
      });
      window.dispatchEvent(event);
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-700">Loading featured products...</span>
      </div>
    );
  }

  if (error) {
    console.error("❌ Featured products query error:", error);
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 font-semibold mb-2">
          Unable to load featured products
        </p>
        <p className="text-gray-600 mb-4">
          Please check your connection and try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Retry Loading
        </Button>
      </div>
    );
  }

  if (allProducts.length === 0) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Featured Products Available
        </h3>
        <p className="text-gray-600 mb-4">
          Featured products will appear here once they're marked as featured and
          active.
        </p>
        <Button
          onClick={() => refetch()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Refresh Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Single grid showing all featured products without category grouping */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product: Product, index) => {
          console.log(
            `🎯 Rendering featured product ${index + 1}:`,
            product.name,
          );
          return (
            <ProductCard
              key={`featured-product-${product.id}-${index}`}
              product={product}
              index={index}
              categoryIndex={0} // Not needed anymore since we're not grouping by category
              onLearnMore={handleLearnMore}
              showCategories={false}
            />
          );
        })}
      </div>
    </div>
  );
};
