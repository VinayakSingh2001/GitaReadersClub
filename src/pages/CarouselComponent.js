import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Wrapper from "../components/Wrapper";

const CarouselComponent = () => {
  const slides = [
    {
      img: "https://cdn.britannica.com/77/142177-050-4E8010A9/Albert-Einstein-1947.jpg",
      text: "“When I read the Bhagavad-Gita and reflect about how God created this universe everything else seems so superfluous.”",
      name: "-Albert Einstein",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Jay_Shetty_Headshot_2021.jpg",
      text: "“The Bhagavad Gita refers to the austerity of speech, saying that we should only speak words that are truthful, beneficial to all, pleasing, and that don’t agitate the minds of others.”",
      name: "-Jay Shetty",
    },
    {
      img: "https://www.crossword.in/cdn/shop/collections/Gaur_Gopal_Das_Photo_1200x1200.jpg?v=1682671249",
      text: '"The Bhagavad Gita is not a religious book, but a guide to living and making choices in life."',
      name: "-Gaur Gopal Das",
    },
    {
      img: "https://cdn.narendramodi.in/cmsuploads/0.89801200_1639141921_1.jpg",
      text: '"I don\'t think that I have anything more to give and the world and the world also does not have anything more to get than this(Gita)."',
      name: "-Narendra Modi",
    },
    {
      img: "https://www.nobelprize.org/images/schrodinger-12988-portrait-medium.jpg",
      text: '"The Bhagavad Gita… is the most beautiful philosophical song existing in any known tongue.”',
      name: "-Erwin Schrödinger",
    },
  ];

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="py-5 md:pt-10  ">
      <Wrapper>
        <div className="relative bg-black text-white rounded-lg text-[20px] py-5  max-w-[1360px]">
          <div className="text-[40px] font-bold text-center mb-20 text-cyan">
            What do Eminent Personality say about Gita?
          </div>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div className="flex flex-col lg:flex-row  gap-[50px] lg:gap-[50px] lg:pb-0">
                  <div className="left pt-3 w-full md:w-auto lg:w-[50%] xl:w-[35%] mx-auto lg:mx-0 flex justify-center">
                    <img
                      className="rounded-[10px] max-w-[60%] h-auto"
                      src={slide.img}
                      alt=""
                    />
                  </div>
                  <div className="right w-full lg:w-[50%] xl:w-[65%] flex-[1]">
                    <div className="text-[25px] lg:text-[34px] font-semibold mb-2 px-6">
                      {slide.text}
                    </div>
                    <div className="text-[17px] lg:text-[18px] pt-5 px-6">
                      {slide.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Wrapper>
    </div>
  );
};

export default CarouselComponent;
