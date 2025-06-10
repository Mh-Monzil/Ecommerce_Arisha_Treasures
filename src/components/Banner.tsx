"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import bannerImg from "@/assets/treasure-banner3.png";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 pt-8 lg:h-[720px]">
      <div className="w-full lg:w-1/2">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="py-3 text-lg">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button className="w-full lg:w-fit cursor-pointer rounded-sm text-lg p-6 mt-4">
          Shop Now
        </Button>
        <div className="flex flex-wrap items-center lg:items-start justify-center lg:justify-start gap-y-4 mt-5 lg:mt-12">
          <div className="text-center lg:text-left border-r lg:pr-4 pr-2">
            <p className="text-2xl lg:text-4xl font-bold">200+</p>
            <p className="text-gray-700 font-medium text-base  lg:text-lg">
              International Brands
            </p>
          </div>
          <div className="text-center lg:text-left lg:border-r px-2 lg:px-4">
            <p className="text-2xl lg:text-4xl font-bold">2,000+</p>
            <p className="text-gray-700 font-medium text-base  lg:text-lg">
              High Quality Products
            </p>
          </div>
          <div className="text-center lg:text-left px-4">
            <p className="text-2xl lg:text-4xl font-bold">30,000+</p>
            <p className="text-gray-700 font-medium text-base  lg:text-lg">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-full lg:w-1/2">
        <Image
          src={bannerImg}
          alt="banner"
          width={500}
          height={10}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
