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

  // Get category styling for each individual category
  const getCategoryStyle = (categoryName: string) => {
    const categoryInfo = productCategories.find(
      (cat) => cat.name === categoryName,
    );

    if (!categoryInfo) return "bg-slate-100 text-slate-700 border-slate-300";

    switch (categoryInfo.id) {
      case "antibiotics":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      case "eye-care":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case "child-care":
        return "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100";
      case "cardio-care":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      case "gastro":
        return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
      case "general-segment":
        return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
      case "women-care":
        return "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

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

          {/* Display each category as a separate, individual badge */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((categoryName, categoryIndex) => (
                <span
                  key={`category-${product.id}-${categoryIndex}`}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 ${getCategoryStyle(categoryName)}`}
                  title={`Category: ${categoryName}`}
                >
                  {categoryName}
                </span>
              ))}
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