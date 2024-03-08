import React from "react";
import Marquee from "react-fast-marquee";
import QuoteBox from "../components/QuoteBox";

const Quotes = () => {
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

  return (
    <div className="bg-[#F0F3F6] h-max-[400px] mx-20 my-20 py-20 rounded-[10px] border">
      <div>
        <h1 className="text-[35px] text-center font-bold ">
          What do Eminent Personality say about Gita?
        </h1>
        <div className="pt-10">
          <Marquee speed={200} gradient={false} pauseOnHover={true}>
            {slides.map((slide, index) => (
              <div className="marquee-item" key={index}>
                <QuoteBox
                  img={slide.img}
                  quote={slide.text}
                  name={slide.name}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
