import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useProductsQuery } from "./useProductsQuery";
import { ProductCard } from "./ProductCard";
import { categoryIcons } from "./CategoryIcons";

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

  // Group featured products by category, handle empty categories
  const categorizedProducts = allProducts.reduce(
    (acc: Record<string, Product[]>, product: Product) => {
      let category = product.category;

      // Handle empty or null categories
      if (!category || category.trim() === "") {
        category = "General Medicines";
        console.log(
          "⚠️ Featured product without category, assigning to General Medicines:",
          product.name,
        );
      }

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {},
  );

  console.log("📂 Final categorized featured products:", categorizedProducts);
  console.log(
    "📂 Featured categories to render:",
    Object.keys(categorizedProducts),
  );

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

  if (Object.keys(categorizedProducts).length === 0) {
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
    <div className="space-y-12">
      {Object.entries(categorizedProducts).map(
        ([category, products], categoryIndex) => {
          console.log(
            `🎨 Rendering featured category section: ${category} with ${products.length} products`,
          );
          return (
            <div key={category} className="space-y-6">
              {/* Category Header */}
              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="text-blue-600 mr-3">
                    {categoryIcons[category as keyof typeof categoryIcons] || (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category}
                  </h3>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product: Product, index) => {
                  console.log(
                    `🎯 Rendering featured product ${index + 1} in ${category}:`,
                    product.name,
                  );
                  return (
                    <ProductCard
                      key={`${product.id}-${categoryIndex}-${index}`}
                      product={product}
                      index={index}
                      categoryIndex={categoryIndex}
                      onLearnMore={handleLearnMore}
                    />
                  );
                })}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
