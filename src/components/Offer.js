import React from "react";
import Wrapper from "./Wrapper";

const Offer = () => {
  return (
    <div>
      <div
        className={`w-full h-[50px] md:h-[70px] bg-cyanlight flex items-center justify-between z-20 sticky top-0 transition-transform duration-300`}
      >
        <Wrapper>
          <div className="flex items-center justify-between">
            <div className="w-[40px] md:w-[60px] cursor-pointer"></div>
            <div className=""></div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Offer;
