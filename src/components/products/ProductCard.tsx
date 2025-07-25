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
  showCategories?: boolean;
}

export const ProductCard = ({
  product,
  index,
  categoryIndex,
  onLearnMore,
  showCategories = true,
}: ProductCardProps) => {
  console.log("🎯 Rendering ProductCard for:", product.name);
  console.log("🎯 Product category raw data:", product.category);

  // Parse categories properly - handle string that looks like array format
  const parseCategories = (categoryData: string[] | string): string[] => {
    console.log('🔧 ProductCard - Parsing category data:', categoryData, typeof categoryData);

    if (Array.isArray(categoryData)) {
      // Handle array that might contain stringified JSON
      const flatCategories: string[] = [];
      categoryData.forEach(item => {
        if (typeof item === 'string') {
          // Check if this item is a stringified JSON array
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
              // If parsing fails, treat as regular string
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

      // Handle nested JSON strings like "[\"Women Care\",\"General Segment\"]"
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          // Parse the JSON-like string
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            // Handle nested arrays or strings within the parsed array
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
          console.log("Failed to parse category string as JSON:", trimmed);
          // If JSON parsing fails, try manual parsing
          const manualParsed = trimmed
            .slice(1, -1) // Remove [ and ]
            .split(',')
            .map(item => item.trim().replace(/^["']|["']$/g, '')) // Remove quotes
            .filter(item => item.length > 0);
          return manualParsed;
        }
      }

      // If it's just a regular string, return as single item array
      if (trimmed) {
        return [trimmed];
      }
    }

    return [];
  };

  const categories = parseCategories(product.category);
  console.log("🎯 Parsed categories:", categories);

  // Get category styling for each individual category
  const getCategoryStyle = (categoryName: string) => {
    const categoryInfo = productCategories.find(
      (cat) => cat.name === categoryName,
    );

    if (!categoryInfo) return "bg-slate-50 text-slate-700 border-slate-200";

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
      case "urology-care":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";
      case "pain-care":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      case "gyno-care":
        return "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100";
      case "ortho-care":
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
      case "cold-care":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100";
      case "neuro-care":
        return "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100";
      case "derma-care":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
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

          {/* Display each category as a completely separate individual badge */}
          {showCategories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((categoryName, idx) => {
                const cleanCategoryName = categoryName.trim();

                if (!cleanCategoryName) return null;

                return (
                  <Badge
                    key={`${product.id}-category-${idx}-${cleanCategoryName}`}
                    variant="outline"
                    className={`${getCategoryStyle(cleanCategoryName)} text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200 hover:shadow-sm`}
                  >
                    {cleanCategoryName}
                  </Badge>
                );
              })}
            </div>
          )}

          {product.manufacturer && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Marketed by:</span>{" "}
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
