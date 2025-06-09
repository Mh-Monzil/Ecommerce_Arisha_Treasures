"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { IProduct } from "@/interfaces/interface";
import Image from "next/image";

interface ProductDetailsModalProps {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}

const ProductDetails = ({
  product,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
}: ProductDetailsModalProps) => {
  if (!product) return null;

  const getStockStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock < 20) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Product Details</span>
            {getStockStatusBadge(product.stock)}
          </DialogTitle>
          <DialogDescription>
            View and manage product information
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <Image
                src={
                  Array.isArray(product?.images)
                    ? product.images[0]
                    : "/placeholder.svg?height=300&width=300"
                }
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md overflow-hidden border"
                >
                  <Image
                    src={
                      Array.isArray(product?.images)
                        ? product.images[i]
                        : "/placeholder.svg?height=300&width=300"
                    }
                    alt={`${product.title} thumbnail ${i}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm">{"Rating TODO"}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.sales} sold)
              </span>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-bold">${product.price}</div>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="mr-2">
                  {product.category}
                </Badge>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    In stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-sm text-red-600 flex items-center">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Out of stock
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => onEdit(product)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductDetails;
