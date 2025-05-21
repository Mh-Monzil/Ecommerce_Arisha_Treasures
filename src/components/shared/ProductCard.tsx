import { Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

export type TProduct = {
  title: string;
  image: StaticImageData;
  price: string;
};

const ProductCard = ({ product }: { product: TProduct }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className=" border rounded-2xl overflow-hidden">
      <div className="relative group">
        <Image
          src={product.image}
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
      <div className="px-4 py-2">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-lg font-bold text-rose-600">{product.price}</p>
        <Button className="w-full mt-4 bg-white text-black border hover:bg-rose-900 hover:text-white duration-200 ease-in-out cursor-pointer">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
