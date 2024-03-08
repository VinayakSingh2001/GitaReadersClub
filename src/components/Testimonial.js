import React from "react";

const Testimonial = () => {
  return (
    <div>
      <div className="transform overflow-hidden bg-white cursor-pointer">
        <img
          className="w-100 h-200  rounded-lg"
          src="https://img.freepik.com/free-photo/black-headphones-digital-device_53876-96805.jpg?t=st=1708545636~exp=1708549236~hmac=d07219c1f7d846b36debf6c5b1411bceb62ee6fc3636ae489b6d621471684cee&w=1380"
          alt="Product Image"
        />

        <div className="p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">Product Name</h2>
          <div className="flex item-center text-black/[0.5]">
            <p className="mr-2 text-lg font-semibold">$20.00</p>
            <p className="text-base  font-medium line-through">$25.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
