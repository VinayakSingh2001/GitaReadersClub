import React from "react";
import Wrapper from "./Wrapper";

const Features = () => {
  return (
    <>
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[40px] md:my-[60px]">
          <h1 className="text-[34px] font-semibold mb-2 ">
            Discover Your Sound Sanctuary
          </h1>
          <div className="cursor-pointer">
            <div className="transition-transform transform hover:scale-110">
              Immersive Sound, Unrivaled Comfort <br />
            </div>
            <div className="transition-transform transform hover:scale-110">
              Wireless Freedom, Seamless Connectivity <br />
            </div>
            <div className="transition-transform transform hover:scale-110">
              Built to Last, Built for Style <br />
            </div>
            <div className="transition-transform transform hover:scale-110">
              Find Your Perfect Pair
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Features;
