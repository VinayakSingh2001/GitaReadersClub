import React from "react";
import Wrapper from "./Wrapper";

const QuoteBox = ({ name, quote, img }) => {
  return (
    <div className="flex w-[40%] md:w-[50%] items-center p-10 my-10 gap-10 bg-white rounded-lg">
      <img
        className="w-auto h-[200px] md:h-[300px] rounded-md"
        src={img}
        alt=""
      />
      <div className=" w-[50%] md:w-[90%]">
        <h2 className=" text-[20px] md:text-[30px] font-semibold text-left">
          {quote}
        </h2>
        <h2 className="py-8 text-[16px] text-left font-semibold">{name}</h2>
      </div>
    </div>
  );
};

export default QuoteBox;
