import React from "react";
import Wrapper from "./Wrapper";

const QuoteBox = ({ name, quote, img }) => {
  return (
    <div className="flex w-[50%] items-center p-10 my-10 gap-10 bg-white rounded-lg">
      <img className="w-auto h-[300px] rounded-md" src={img} alt="" />
      <div className="w-[90%]">
        <h2 className="text-[30px] font-semibold text-left">{quote}</h2>
        <h2 className="py-8 text-[16px] text-left font-semibold">{name}</h2>
      </div>
    </div>
  );
};

export default QuoteBox;
