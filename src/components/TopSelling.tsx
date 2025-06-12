"use client";

import ProductCard from "./shared/ProductCard";
import { CircleArrowRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/features/productApi";
import { IProduct } from "@/interfaces/product";
import Link from "next/link";

const TopSelling = () => {
  const { data: products } = useGetAllProductsQuery({});

  const topProducts: IProduct[] | undefined = products?.data
    ? [...products.data]
        .sort((a, b) =>
          a.sales !== undefined && b.sales !== undefined ? b.sales - a.sales : 0
        )
        .slice(0, 4)
    : undefined;

  return (
    <div className="pt-10 lg:pt-20 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl lg:text-5xl font-bold">Top Selling</h2>
        <p className="font-medium flex items-center hover:text-rose-600 cursor-pointer">
          <Link href="/shop">See All</Link>
          <CircleArrowRight className="inline-block ml-2 h-5" />
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {topProducts?.map((product: IProduct, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
