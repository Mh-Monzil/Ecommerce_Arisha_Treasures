import React from "react";
import Marquee from "react-fast-marquee";

const productItems = [
  "saree",
  "salwar kameez",
  "lehenga",
  "kurti",
  "gown",
  "party saree",
  "bridal saree",
  "cotton saree",
  "saree",
  "salwar kameez",
  "lehenga",
  "kurti",
];

const ProductsMarquee = () => {
  return (
    <div className="w-full h-20 lg:h-24 bg-black/90 text-white flex items-center overflow-hidden">
      <Marquee className="overflow-y-hidden">
        {productItems.map((item, index) => (
          <span
            key={index}
            className="px-6 text-3xl lg:text-4xl lg:font-medium capitalize h-full"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default ProductsMarquee;
