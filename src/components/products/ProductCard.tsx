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
            <div className="absolute top-2 right-2 flex flex-col gap-1 max-w-[50%] z-10">
              {categories.slice(0, 2).map((categoryName, index) => {
                const categoryInfo = productCategories.find(
                  (cat) => cat.name === categoryName,
                );

                // Get proper styling based on category with more vibrant colors
                const getCategoryStyle = (category: any) => {
                  if (!category) return "bg-gray-500 text-white";

                  switch (category.id) {
                    case "antibiotics":
                      return "bg-blue-600 text-white";
                    case "eye-care":
                      return "bg-emerald-600 text-white";
                    case "child-care":
                      return "bg-rose-500 text-white";
                    case "cardio-care":
                      return "bg-red-600 text-white";
                    case "gastro":
                      return "bg-orange-600 text-white";
                    case "general-segment":
                      return "bg-violet-600 text-white";
                    case "women-care":
                      return "bg-teal-600 text-white";
                    default:
                      return "bg-slate-600 text-white";
                  }
                };

                // Smart truncation for category names
                const getDisplayName = (name: string) => {
                  if (name.length <= 12) return name;

                  // Smart truncation for common words
                  const smartTruncate = (text: string) => {
                    if (text.includes(" ")) {
                      const words = text.split(" ");
                      if (words.length === 2) {
                        return words
                          .map((word) => word.substring(0, 4))
                          .join(" ");
                      }
                    }
                    return text.substring(0, 10);
                  };

                  return smartTruncate(name);
                };

                return (
                  <div
                    key={`${categoryName}-${index}`}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl hover:scale-105 ml-auto ${getCategoryStyle(categoryInfo)}`}
                    title={categoryName}
                  >
                    <span className="w-2 h-2 rounded-full bg-white/80 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {getDisplayName(categoryName)}
                    </span>
                  </div>
                );
              })}
              {categories.length > 2 && (
                <div
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-indigo-600 text-white shadow-lg backdrop-blur-sm ml-auto"
                  title={`${categories.length - 2} more: ${categories.slice(2).join(", ")}`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80 mr-1.5" />+
                  {categories.length - 2} more
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
