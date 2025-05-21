import React from "react";
import { Star } from "lucide-react";

const review = [
  {
    name: "Dure Fishan",
    review:
      "Stylish & Comfortable! I recently ordered a few dresses from this website, and I’m so impressed! The fabric is soft, the fit is perfect, and I received so many compliments. It’s now my go-to place for stylish yet comfy outfits. Highly recommended!",
    rating: 4,
  },
  {
    name: "Kinza Hashmi",
    review:
      "Great Collection, Fast Delivery. The variety of styles they offer is amazing — from casual wear to party outfits. My order arrived quickly and was neatly packaged. Only reason I’m giving 4 stars is I wish they had more size options for petite women.",
    rating: 4.5,
  },
  {
    name: "Sahar Hashmi",
    review:
      "Excellent Quality & Customer Service! Absolutely love this brand! The quality of the clothes is top-notch, and they look exactly like the pictures. I had a sizing issue, and their customer support handled it professionally and quickly. Will definitely shop again!",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="pt-10 lg:pt-20 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl lg:text-5xl font-bold">Our Happy Customers</h2>
        <div className="font-medium flex items-center hover:text-rose-600 cursor-pointer"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 mt-6">
        {review.map((item, index) => (
          <div
            key={index}
            className=" flex flex-col items-center gap-2 border p-4 rounded-md"
          >
            <div className="flex items-center gap-1">
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
              <Star className="text-amber-400 fill-amber-400 h-5 w-5" />
            </div>
            <p className="font-semibold text-lg">{item.name}</p>
            <p className="text-gray-500">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
