import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";

const HeroBanner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <div className="z-0  inset-0">
      <Slider {...settings}>
        <div>
          <img
            src="https://miro.medium.com/v2/resize:fit:1024/1*IkfzSJbxGhHsim8ZbDWFXg.jpeg"
            alt="First Slide"
            className="w-full md:aspect-auto object-cover"
          />
        </div>
        <div>
          <img
            src="https://learngitalivegita.com/blog/wp-content/uploads/2020/07/bg.jpg"
            alt="Second Slide"
            className="w-full md:aspect-auto object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default HeroBanner;
