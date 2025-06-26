import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { productCategories } from "@/data/productCategories";

interface MultiSelectCategoriesProps {
  value: string[];
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

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

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
              {value.length === 0
                ? placeholder
                : `${value.length} categories selected`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {productCategories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => handleSelect(category.name)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(category.name)
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
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected categories */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((categoryName) => {
            const category = productCategories.find(
              (cat) => cat.name === categoryName,
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
          {value.length > 1 && (
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
