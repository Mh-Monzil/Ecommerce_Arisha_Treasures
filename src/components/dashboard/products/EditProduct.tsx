"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { IProduct } from "@/interfaces/product";

interface EditProductModalProps {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: IProduct) => void;
  categories: string[];
}

const EditProduct = ({
  product,
  isOpen,
  onOpenChange,
  onSave,
  categories,
}: EditProductModalProps) => {
  const [editedProduct, setEditedProduct] = useState<IProduct>({} as IProduct);
  const [activeTab, setActiveTab] = useState("basic");
  // const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  if (!editedProduct) return null;

  const handleSave = () => {
    // editedProduct.images = images; TODO ->
    onSave(editedProduct);
    onOpenChange(false);
  };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);

  //     const uniqueFIles = filesArray.filter(
  //       (file) =>
  //         !images.some(
  //           (img) => img.name === file.name && img.size === file.size
  //         )
  //     );

  //     setImages((prevImages) => [...prevImages, ...uniqueFIles]);
  //     event.target.value = "";
  //   }
  // };

  // const handleRemoveImage = (index: number) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product information
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            {/* <TabsTrigger value="media">Media</TabsTrigger> */}
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select
                  value={editedProduct.category}
                  onValueChange={(value) =>
                    setEditedProduct({ ...editedProduct, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories?.map((category: string) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  value={editedProduct.stock}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      stock: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                rows={5}
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>

          {/* Media Tab */}
          {/* <TabsContent value="media" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 w-full">
                  
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(img)}
                            alt={`preview-${index}`}
                            width={200}
                            height={200}
                            className="rounded-md w-full object-cover object-top"
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
                  <Label
                    htmlFor="images"
                    className="flex flex-col items-center "
                  >
                    <div className="w-full">Product Images</div>
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
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
              </CardContent>
            </Card>
          </TabsContent> */}
          {/* <div className="h-20 flex items-center justify-center">
            Working On Progress
          </div> */}
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
