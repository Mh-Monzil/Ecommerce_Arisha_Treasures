import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

const FilterProducts = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  priceRange,
  setPriceRange,
  selectedRatings,
  renderStars,
  handleRatingChange,
  showOnlyInStock,
  setShowOnlyInStock,
  applyFilters,
  clearAllFilters,
}: {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string, checked: boolean) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedRatings: number[];
  renderStars: (rating: number) => ReactNode;
  handleRatingChange: (rating: number, checked: boolean) => void;
  showOnlyInStock: boolean;
  setShowOnlyInStock: (showOnlyInStock: boolean) => void;
  applyFilters: () => void;
  clearAllFilters: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: string) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="font-semibold mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) =>
                  handleRatingChange(rating, checked as boolean)
                }
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-2 text-sm"
              >
                {renderStars(rating)}
                <span>& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      {/* <div>
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <Label htmlFor={color} className="text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Sizes */}
      {/* <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <Label htmlFor={size} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Additional Filters */}
      <div>
        <h3 className="font-semibold mb-3">Additional Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={showOnlyInStock}
              onCheckedChange={setShowOnlyInStock}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="space-y-2 pt-4 border-t">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={clearAllFilters} variant="outline" className="w-full">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterProducts;
