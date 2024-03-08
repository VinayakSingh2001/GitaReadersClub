import React from "react";
import Wrapper from "./Wrapper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Wrapper>
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
          <div className="text-[50px] font-semibold font-sans mb-5 text-center">
            Our Prominant Speakers
          </div>
          {/* <Carousel
            responsive={responsive}
            containerClass="-mx-[10px]"
            itemClass="px-[10px]"
          >
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </Carousel>
          ; */}

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

export default Testimonials;
