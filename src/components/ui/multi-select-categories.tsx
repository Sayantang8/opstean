import React, { useState } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { productCategories } from "@/data/productCategories";

interface MultiSelectCategoriesProps {
  value: string[] | undefined | null;
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelectCategories: React.FC<MultiSelectCategoriesProps> = ({
  value,
  onChange,
  placeholder = "Select categories...",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  // Don't render if productCategories is not available
  if (
    !productCategories ||
    !Array.isArray(productCategories) ||
    productCategories.length === 0
  ) {
    return (
      <div className={cn("space-y-2", className)}>
        <Button
          variant="outline"
          disabled
          className="w-full justify-between text-left font-normal"
        >
          <span className="truncate text-gray-500">Loading categories...</span>
        </Button>
      </div>
    );
  }

  const handleSelect = (categoryName: string) => {
    const newValue = safeValue.includes(categoryName)
      ? safeValue.filter((item) => item !== categoryName)
      : [...safeValue, categoryName];
    onChange(newValue);
  };

  const handleRemove = (categoryName: string) => {
    onChange(safeValue.filter((item) => item !== categoryName));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  // Filter categories based on search term
  const filteredCategories = productCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">
              {safeValue.length === 0
                ? placeholder
                : `${safeValue.length} categories selected`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="border-b border-gray-200">
            <div className="flex items-center px-3 py-2">
              <Search className="mr-2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-1">
            {filteredCategories.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No categories found.
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelect(category.name)}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      safeValue.includes(category.name)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${category.color}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500">
                      {category.description}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected categories */}
      {safeValue.length > 0 && productCategories && (
        <div className="flex flex-wrap gap-2">
          {safeValue.map((categoryName) => {
            if (!categoryName) return null;
            const category = productCategories.find(
              (cat) => cat && cat.name === categoryName,
            );
            return (
              <Badge
                key={categoryName}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {category && (
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                )}
                <span className="text-xs">{categoryName}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(categoryName)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {safeValue.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
