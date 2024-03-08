import React from "react";
import Wrapper from "../components/Wrapper";
import Testimonial from "../components/Testimonial";
const Speakers = () => {
  return (
    <div>
      <Wrapper>
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
          <div className="text-[50px] font-semibold font-sans mb-5 text-center">
            Our Prominant Speakers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Speakers;
