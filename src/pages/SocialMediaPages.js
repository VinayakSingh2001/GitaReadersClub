import React from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Wrapper from "../components/Wrapper";
import Testimonial from "../components/Testimonial";

const SocialMediaPages = () => {
  //   const responsive = {
  //     desktop: {
  //       breakpoint: { max: 3000, min: 1024 },
  //       items: 3,
  //     },
  //     tablet: {
  //       breakpoint: { max: 1024, min: 464 },
  //       items: 2,
  //     },
  //     mobile: {
  //       breakpoint: { max: 464, min: 0 },
  //       items: 1,
  //     },
  //   };
  return (
    <div>
      <Wrapper>
        <div className="mt-[50px] md:mt-[100px] mb-[100px] py-12 md:mb-0">
          <div className="text-2xl font-bold mb-5">Testimonials</div>
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

          <div className="flex items-center justify-center gap-5 my-14 px-5 md:px-0">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default SocialMediaPages;
