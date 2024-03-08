import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const HeroBanner = () => {
  return (
    <div className="">
      <div className="relative text-white text-[20px] w-full  mx-auto">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
        >
          <div className="h-[100vh]">
            <img
              src="https://miro.medium.com/v2/resize:fit:1024/1*IkfzSJbxGhHsim8ZbDWFXg.jpeg"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </div>
          <div>
            <img
              src="https://learngitalivegita.com/blog/wp-content/uploads/2020/07/bg.jpg"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </div>

          <div>
            <img
              src="https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg"
              className="aspect-[16/10] md:aspect-auto object-cover"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBanner;
