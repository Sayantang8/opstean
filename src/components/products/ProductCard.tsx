import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { productCategories } from "@/data/productCategories";

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

interface ProductCardProps {
  product: Product;
  index: number;
  categoryIndex: number;
  onLearnMore: (productId: number) => void;
}

export const ProductCard = ({
  product,
  index,
  categoryIndex,
  onLearnMore,
}: ProductCardProps) => {
  console.log("🎯 Rendering ProductCard for:", product.name);
  console.log("🎯 Product data:", product);

  // Handle both array and string categories for backward compatibility
  const categories = Array.isArray(product.category)
    ? product.category
    : product.category
      ? [product.category]
      : [];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden bg-gray-100">
          {product.image_url ? (
            <AspectRatio ratio={4 / 3} className="bg-gray-100">
              <img
                src={product.image_url}
                alt={product.name || "Product Image"}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                onError={(e) => {
                  console.log("❌ Image failed to load:", product.image_url);
                  e.currentTarget.style.display = "none";
                }}
              />
            </AspectRatio>
          ) : (
            <AspectRatio
              ratio={4 / 3}
              className="bg-gradient-to-br from-blue-50 to-indigo-100"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500 font-medium text-sm">
                  No Image
                </span>
              </div>
            </AspectRatio>
          )}

          {/* Categories in top right corner */}
          {categories.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 max-w-[140px] justify-end">
              {categories.slice(0, 3).map((categoryName, index) => {
                const categoryInfo = productCategories.find(
                  (cat) => cat.name === categoryName,
                );

                // Get proper styling based on category
                const getCategoryStyle = (category: any) => {
                  if (!category)
                    return "bg-gray-100 text-gray-700 border-gray-200";

                  switch (category.id) {
                    case "antibiotics":
                      return "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100";
                    case "eye-care":
                      return "bg-green-50 text-green-700 border-green-200 shadow-green-100";
                    case "child-care":
                      return "bg-pink-50 text-pink-700 border-pink-200 shadow-pink-100";
                    case "cardio-care":
                      return "bg-red-50 text-red-700 border-red-200 shadow-red-100";
                    case "gastro":
                      return "bg-orange-50 text-orange-700 border-orange-200 shadow-orange-100";
                    case "general-segment":
                      return "bg-purple-50 text-purple-700 border-purple-200 shadow-purple-100";
                    case "women-care":
                      return "bg-teal-50 text-teal-700 border-teal-200 shadow-teal-100";
                    default:
                      return "bg-gray-50 text-gray-700 border-gray-200 shadow-gray-100";
                  }
                };

                return (
                  <div
                    key={`${categoryName}-${index}`}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md ${getCategoryStyle(categoryInfo)}`}
                  >
                    {categoryInfo && (
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${categoryInfo.color}`}
                      />
                    )}
                    <span
                      className="truncate max-w-[60px]"
                      title={categoryName}
                    >
                      {categoryName.length > 8
                        ? `${categoryName.substring(0, 8)}...`
                        : categoryName}
                    </span>
                  </div>
                );
              })}
              {categories.length > 3 && (
                <div
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm backdrop-blur-sm"
                  title={`${categories.length - 3} more categories: ${categories.slice(3).join(", ")}`}
                >
                  +{categories.length - 3}
                </div>
              )}
            </div>
          )}

          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {product.name || "Unnamed Product"}
          </h3>

          {product.manufacturer && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Manufacturer:</span>{" "}
              {product.manufacturer}
            </p>
          )}

          <p className="text-sm text-gray-700 line-clamp-3 flex-1">
            {product.description && product.description.trim()
              ? product.description
              : "High-quality pharmaceutical product designed for your health needs."}
          </p>

          <div className="flex justify-end items-center pt-2 mt-auto">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              onClick={() => {
                console.log("🔥 Learn More clicked for product:", product.id);
                onLearnMore(product.id);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
