import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { LoaderCircle, Plus, Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { useCreateProductMutation } from "@/features/productApi";
import toast from "react-hot-toast";

const AddProduct = ({
  categories,
  refetch,
}: {
  categories: string[];
  refetch: () => void;
}) => {
  const [createProduct] = useCreateProductMutation();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[1] || ""
  );
  const [isProductSubmitting, setIsProductSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      const uniqueFIles = filesArray.filter(
        (file) =>
          !images.some(
            (img) => img.name === file.name && img.size === file.size
          )
      );

      setImages((prevImages) => [...prevImages, ...uniqueFIles]);
      event.target.value = "";
    }
  };
  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProductSubmitting(true);
    const formData = new FormData(e.currentTarget);

    formData.append("category", selectedCategory);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await createProduct(formData).unwrap();
      console.log(res);
      setImages([]);
      setIsProductSubmitting(false);
      refetch();
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
    setIsAddProductOpen(false);
  };
  console.log(categories);

  return (
    <div className="flex items-center space-x-2">
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>

        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product listing for your store
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter product title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={categories[0]}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: string, index: number) => (
                        <SelectItem
                          key={index}
                          value={category}
                          className="capitalize"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    placeholder="0.00"
                    min={0}
                    max={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales">Sales</Label>
                  <Input
                    id="sales"
                    name="sales"
                    type="number"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Product description"
                />
              </div>
              <div className="space-y-2 w-full">
                {/* Preview Section */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(img)}
                          alt={`preview-${index}`}
                          width={100}
                          height={100}
                          className="rounded-md w-full h-32 object-cover"
                        />
                        <span>
                          <X
                            className="absolute top-1 right-1 h-4 w-4 text-white
                                  hover:text-red-400 cursor-pointer bg-gray-50/50 rounded-sm"
                            onClick={() => handleRemoveImage(index)}
                          />
                        </span>
                        <p className="text-xs text-center mt-1 truncate">
                          {img.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <Label htmlFor="images" className="flex flex-col items-center ">
                  <div className="w-full">Product Images</div>
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                </Label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  className="hidden absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                  id="images"
                  multiple
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddProductOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${isProductSubmitting ? "cursor-not-allowed" : ""}`}
              >
                {isProductSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Add Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
