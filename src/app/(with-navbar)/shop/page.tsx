"use client";

import { useCart } from "@/components/cart/CartProvider";
import Container from "@/components/shared/Container";
import FilterProducts from "@/components/shop/FilterProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetAllProductsQuery } from "@/features/productApi";
import { IProduct } from "@/interfaces/product";
import {
  Grid3X3,
  Heart,
  List,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ShopPage = () => {
  const { addToCart } = useCart();
  const { data: products } = useGetAllProductsQuery({});

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlySale, setShowOnlySale] = useState(false);

  // Applied filters (what's actually filtering the products)
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 10000],
    ratings: [] as number[],
    colors: [] as string[],
    sizes: [] as string[],
    inStock: false,
    sale: false,
  });

  const filterCategories: string[] = products?.data?.map(
    (p: IProduct) => p.category
  );
  const categories: string[] = [...new Set(filterCategories)];

  // Filter products based on applied filters
  const filteredProducts: IProduct[] = products?.data?.filter(
    (product: IProduct) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.includes(product.category);
      const matchesPrice =
        product.price >= appliedFilters.priceRange[0] &&
        product.price <= appliedFilters.priceRange[1];
      const matchesRating =
        appliedFilters.ratings.length === 0 ||
        appliedFilters.ratings.some((rating) => product.rating >= rating);
      // const matchesColor =
      //   appliedFilters.colors.length === 0 ||
      //   appliedFilters.colors.some((color) => product.colors.includes(color));
      // const matchesSize =
      //   appliedFilters.sizes.length === 0 ||
      //   appliedFilters.sizes.some((size) => product.sizes.includes(size));
      const matchesStock = !appliedFilters.inStock || product.stock > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        // matchesColor &&
        // matchesSize &&
        matchesStock
      );
    }
  );

  console.log(filteredProducts);

  if (!filteredProducts) {
    return <div>Loading...</div>;
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  const applyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories,
      priceRange: priceRange,
      ratings: selectedRatings,
      colors: selectedColors,
      sizes: selectedSizes,
      inStock: showOnlyInStock,
      sale: showOnlySale,
    });
    setIsFilterOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSelectedRatings([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setShowOnlyInStock(false);
    setShowOnlySale(false);
    setAppliedFilters({
      categories: [],
      priceRange: [0, 10000],
      ratings: [],
      colors: [],
      sizes: [],
      inStock: false,
      sale: false,
    });
  };

  const getActiveFilterCount = () => {
    return (
      appliedFilters.categories.length +
      appliedFilters.colors.length +
      appliedFilters.sizes.length +
      appliedFilters.ratings.length +
      (appliedFilters.inStock ? 1 : 0) +
      (appliedFilters.sale ? 1 : 0) +
      (appliedFilters.priceRange[0] !== 0 ||
      appliedFilters.priceRange[1] !== 500
        ? 1
        : 0)
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  console.log(products);
  console.log(categories);

  return (
    <Container className="">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary">{getActiveFilterCount()}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterProducts
                  categories={categories}
                  selectedCategories={selectedCategories}
                  handleCategoryChange={handleCategoryChange}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedRatings={selectedRatings}
                  renderStars={renderStars}
                  handleRatingChange={handleRatingChange}
                  showOnlyInStock={showOnlyInStock}
                  setShowOnlyInStock={setShowOnlyInStock}
                  applyFilters={applyFilters}
                  clearAllFilters={clearAllFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {getActiveFilterCount() > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {getActiveFilterCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect items
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterProducts
                        categories={categories}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedRatings={selectedRatings}
                        renderStars={renderStars}
                        handleRatingChange={handleRatingChange}
                        showOnlyInStock={showOnlyInStock}
                        setShowOnlyInStock={setShowOnlyInStock}
                        applyFilters={applyFilters}
                        clearAllFilters={clearAllFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Active Filters:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{category}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newCategories =
                            appliedFilters.categories.filter(
                              (c) => c !== category
                            );
                          setSelectedCategories(newCategories);
                          setAppliedFilters({
                            ...appliedFilters,
                            categories: newCategories,
                          });
                        }}
                      />
                    </Badge>
                  ))}
                  {appliedFilters.colors.map((color) => (
                    <Badge
                      key={color}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{color}</span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newColors = appliedFilters.colors.filter(
                            (c) => c !== color
                          );
                          setSelectedColors(newColors);
                          setAppliedFilters({
                            ...appliedFilters,
                            colors: newColors,
                          });
                        }}
                      />
                    </Badge>
                  ))}
                  {(appliedFilters.priceRange[0] !== 0 ||
                    appliedFilters.priceRange[1] !== 500) && (
                    <Badge
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>
                        ${appliedFilters.priceRange[0]} - $
                        {appliedFilters.priceRange[1]}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          setPriceRange([0, 500]);
                          setAppliedFilters({
                            ...appliedFilters,
                            priceRange: [0, 500],
                          });
                        }}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card
                    key={product._id}
                    className="group overflow-hidden hover:shadow-lg transition-shadow py-0"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Link href={`/shop/${product._id}`}>
                        <Image
                          src={
                            product.images
                              ? product.images[0]
                              : "/placeholder.svg"
                          }
                          alt={product.title}
                          fill
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={product.stock <= 0}
                          onClick={() => addToCart(product)}
                          className="bg-white/80 hover:bg-white cursor-pointer"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="pb-5 px-4">
                      <Link href={`/shop/${product._id}`}>
                        <h3 className="font-semibold truncate mb-1 hover:text-rose-700">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.category}
                        </p>
                      </Link>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(product.rating)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold">
                            $
                            {(
                              product.price -
                              (product.price * product.discount) / 100
                            ).toFixed(2)}
                          </span>
                          {product.price && (
                            <span className="text-lg text-muted-foreground line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        {/* <Button
                          size="sm"
                          disabled={product.stock <= 0}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card key={product._id} className="overflow-hidden py-0">
                    <div className="flex">
                      <div className="relative w-48 h-48 flex-shrink-0">
                        <Image
                          src={
                            product.images
                              ? product.images[0]
                              : "/placeholder.svg"
                          }
                          alt={product.title}
                          fill
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">
                              {product.title}
                            </h3>
                            <p className="text-muted-foreground mb-3">
                              {product.description}
                            </p>
                            <div className="flex items-center space-x-1 mb-3">
                              {renderStars(product.rating)}
                            </div>
                            {/* <div className="flex items-center space-x-4 mb-3">
                              <div>
                                <span className="text-sm font-medium">Colors: </span>
                                <span className="text-sm text-muted-foreground">{product.colors.join(", ")}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Sizes: </span>
                                <span className="text-sm text-muted-foreground">{product.sizes.join(", ")}</span>
                              </div>
                            </div> */}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-2xl font-bold">
                                $
                                {(
                                  product.price *
                                  (product.discount / 100)
                                ).toFixed(2)}
                              </span>
                              {product.price && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ${product.price}
                                </span>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Button
                                className="w-full"
                                disabled={product.stock <= 0}
                                onClick={() => addToCart(product)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {product.stock > 0
                                  ? "Add to Cart"
                                  : "Out of Stock"}
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Heart className="h-4 w-4 mr-2" />
                                Wishlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No products found
                  </h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShopPage;
