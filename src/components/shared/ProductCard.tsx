import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product";

const ProductCard = ({ product }: { product: IProduct }) => {
  const [isWishlist, setIsWishlist] = useState(false);

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

  return (
    <div className=" border rounded-2xl overflow-hidden">
      <div className="relative group overflow-hidden">
        <Image
          src={product?.images ? product?.images[0] : "/placeholder.svg"}
          alt={product.title}
          width={500}
          height={500}
          className="rounded-t-2xl group-hover:scale-105 duration-200 ease-in-out"
        />
        <span className="absolute top-4 -right-8 group-hover:right-4 bg-rose-50 p-1 rounded-sm cursor-pointer transition-all duration-300 ease-in-out">
          {isWishlist ? (
            <Heart
              className=" fill-rose-700 text-rose-700"
              onClick={() => setIsWishlist(!isWishlist)}
            />
          ) : (
            <Heart className="" onClick={() => setIsWishlist(!isWishlist)} />
          )}
        </span>
      </div>
      <div className="px-4 my-3">
        <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
        <p>{renderStars(product.rating)}</p>
        <p className="text-lg font-bold text-rose-600 pt-1">৳{product.price}</p>
        <Button className="w-full mt-3 bg-white text-black border hover:bg-rose-900 hover:text-white duration-200 ease-in-out cursor-pointer">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
