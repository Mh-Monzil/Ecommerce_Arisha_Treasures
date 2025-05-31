import React from "react";
import arrival1 from "@/assets/new_arrivals/new-arrival1.jpeg";
import arrival2 from "@/assets/new_arrivals/new-arrival2.jpeg";
import arrival3 from "@/assets/new_arrivals/new-arrival3.jpeg";
import topSelling1 from "@/assets/top_selling/top-selling1.jpg";
import topSelling2 from "@/assets/top_selling/top-selling2.jpg";
import Image from "next/image";

const images = [arrival1, arrival2, arrival3, topSelling1, topSelling2];

const OurGallery = () => {
  return (
    <div className="py-10 lg:py-20 px-4">
      <h2 className="text-4xl lg:text-5xl font-bold">Our gallery</h2>
      <div className="lg:max-h-[600px] grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              className={`w-full ${
                index === 0 ? "max-h-[615px]" : "max-h-[300px]"
              } object-cover object-top rounded-xl`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurGallery;
