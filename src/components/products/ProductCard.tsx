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

          {/* Featured badge in top left */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              Featured
            </div>
          )}

          {/* Prescription badge in top right */}
          {product.is_prescription && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
              Rx
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {product.name || "Unnamed Product"}
          </h3>

          {/* Categories displayed as clean badges below the title */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.slice(0, 3).map((categoryName, index) => {
                const categoryInfo = productCategories.find(
                  (cat) => cat.name === categoryName,
                );

                // Get proper styling based on category with vibrant colors
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
                  return name.substring(0, 10) + "...";
                };

                return (
                  <Badge
                    key={`${categoryName}-${index}`}
                    className={`text-xs font-medium px-2 py-1 rounded-md shadow-sm ${getCategoryStyle(categoryInfo)}`}
                    title={categoryName}
                  >
                    {getDisplayName(categoryName)}
                  </Badge>
                );
              })}
              {categories.length > 3 && (
                <Badge
                  className="text-xs font-medium px-2 py-1 rounded-md bg-gray-500 text-white shadow-sm"
                  title={`${categories.length - 3} more: ${categories.slice(3).join(", ")}`}
                >
                  +{categories.length - 3}
                </Badge>
              )}
            </div>
          )}

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