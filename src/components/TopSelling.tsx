"use client";

import topSelling1 from "@/assets/top_selling/top-selling1.jpg";
import topSelling2 from "@/assets/top_selling/top-selling2.jpg";
import topSelling3 from "@/assets/top_selling/top-selling3.jpg";
import topSelling4 from "@/assets/top_selling/top-selling4.jpg";
import ProductCard, { TProduct } from "./shared/ProductCard";
import { CircleArrowRight } from "lucide-react";

const products: TProduct[] = [
  {
    title: "Xenia Formals Unstitched Exclusive Collection | CRIMSON",
    price: "৳4,999.00",
    image: topSelling1,
  },
  {
    title: "Xenia Formals Unstitched Exclusive Collection | SABLE - A",
    price: "৳4,899.00",
    image: topSelling2,
  },
  {
    title: "Afrozeh Endless Summer Unstitched Exclusive Collection | GILDED",
    price: "৳5,999.00",
    image: topSelling3,
  },
  {
    title: "Afrozeh Endless Summer Unstitched Exclusive Collection | NOA",
    price: "৳5,999.00",
    image: topSelling4,
  },
];

const TopSelling = () => {
  return (
    <div className="pt-10 lg:pt-20 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl lg:text-5xl font-bold">Top Selling</h2>
        <p className="font-medium flex items-center hover:text-rose-600 cursor-pointer">
          <span>See All</span>
          <CircleArrowRight className="inline-block ml-2 h-5" />
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
