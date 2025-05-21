"use client";

import arrival1 from "@/assets/new_arrivals/new-arrival1.jpeg";
import arrival2 from "@/assets/new_arrivals/new-arrival2.jpeg";
import arrival3 from "@/assets/new_arrivals/new-arrival3.jpeg";
import arrival4 from "@/assets/new_arrivals/new-arrival4.jpeg";
import ProductCard, { TProduct } from "./shared/ProductCard";
import { CircleArrowRight } from "lucide-react";

const products: TProduct[] = [
  {
    title: "REPUBLIC KALANI D4-A-RHEA | EID LUXURY LAWN",
    price: "৳9,999.00",
    image: arrival1,
  },
  {
    title: "REPUBLIC KALANI D1-B-ZEHRA | EID LUXURY LAWN",
    price: "৳8,999.00",
    image: arrival2,
  },
  {
    title: "REPUBLIC KALANI D1-A - AYRA | EID LUXURY LAWN",
    price: "৳7,999.00",
    image: arrival3,
  },
  {
    title: "REPUBLIC KALANI D3-B-SITARA | EID LUXURY LAWN",
    price: "৳8,999.00",
    image: arrival4,
  },
];

const NewArrivals = () => {
  return (
    <div className="pt-10 lg:pt-20 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl lg:text-5xl font-bold">New Arrivals</h2>
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

export default NewArrivals;
