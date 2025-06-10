"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IProduct } from "@/interfaces/product";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface DeleteProductDialogProps {
  product: IProduct;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

const DeleteProduct = ({
  product,
  isOpen,
  onOpenChange,
  onDelete,
}: DeleteProductDialogProps) => {
  if (!product) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product &quot;{product.title}&quot; and remove all associated data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-muted p-4 rounded-lg my-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
              <Image
                src={
                  product.images
                    ? product.images[0]
                    : "/placeholder.svg?height=48&width=48"
                }
                alt={product.title}
                width={48}
                height={48}
                className="w-full h-full object-cover object-top rounded-lg"
              />
            </div>
            <div>
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-muted-foreground">
                Category: {product.category}
              </div>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onDelete(product._id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
