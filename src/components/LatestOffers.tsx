import React from "react";
import { Button } from "./ui/button";

const LatestOffers = () => {
  return (
    <div className="absolute w-full -top-40 pt-10 lg:pt-20 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-black text-white p-6 rounded-2xl">
        <h1 className="text-3xl lg:text-4xl font-bold max-w-xl">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>
        <div className="flex flex-col w-full lg:max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 mt-4 rounded-md bg-white text-black placeholder:text-black"
          />
          <Button className="bg-white hover:bg-gray-200 text-black text-base px-4 py-2 mt-4 rounded-md cursor-pointer">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LatestOffers;
