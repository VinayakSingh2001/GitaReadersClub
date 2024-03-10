import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

import img1 from "../assets/course/Art of Smart Work.jpg";
import img2 from "../assets/course/Art of Harnessing Mind Power.jpg";
import img3 from "../assets/course/Converting Stress to Smile (1).jpg";
import img4 from "../assets/course/Gita Sutras of Life.jpg";
import img5 from "../assets/course/Gita in Action.jpg";
import img6 from "../assets/course/Happiness Mantra.jpg";
import img7 from "../assets/course/The Science of Self-Realization.jpg";

const Courses = () => {
  return (
    <div className="" id="course">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <>
      <div id="courses">
        <section ref={targetRef} className="relative h-[300vh] ">
          <div className="sticky top-0 flex-cols h-50 md:h-screen items-center overflow-hidden">
            <h1 className="text-[40px] font-semibold text-center py-20">
              Courses
            </h1>
            <div className="flex">
              <motion.div style={{ x }} className="flex gap-4">
                {cards.map((card) => {
                  return <Card card={card} key={card.id} />;
                })}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[250px] w-[250px] md:h-[450px] md:w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <div className="bg-gradient-to-br from-white/20 to-white/0 p-8  text-white backdrop-blur-lg">
          <p className="text-md md:text-2xl font-black uppercase">
            {card.title}
          </p>
          <p className="text-[13px] md:text-[16px]">{card.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const cards = [
  {
    url: "https://krishnastore.com/images/print_images/preview-cache/1614-100.jpg",
    title: "Gita Sutras for Life",
    id: 1,
    about:
      "Dive into the timeless wisdom of the Gita with 'Gita Sutras for Life' – a transformative journey unlocking ancient secrets for modern living.",
  },
  {
    url: "https://images.news18.com/ibnlive/uploads/2022/09/ants-1-16621772553x2.png",
    title: "Art of Smart Work",
    id: 2,
    about:
      "Discover the Art of Smart Work – an empowering exploration of ancient strategies for mastering productivity and achieving success effortlessly.",
  },
  {
    url: "https://vid.alarabiya.net/images/2016/09/09/37a99e72-b649-4572-92f8-b7abab3b265e/37a99e72-b649-4572-92f8-b7abab3b265e_16x9_1200x676.jpg",
    title: "Converting Stress to Smile",
    id: 3,
    about:
      "Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy.",
  },
  {
    url: "https://www.mckinsey.com/~/media/mckinsey/industries/aerospace%20and%20defense/future%20air%20mobility%20blog/another%20opportunity%20from%20advanced%20air%20mobility%20a%20more%20diverse%20pilot%20workforce/thumb-gettyimages-1362311403.jpg?cq=50&mw=767&car=8:5&cpy=Center",
    title: "Happiness Mantra",
    id: 4,
    about:
      " Delve into the secrets of eternal joy with Happiness Mantra, a transformative course revealing ancient wisdom and practical strategies to cultivate lasting happiness and inner fulfillment.",
  },
  {
    url: "https://miro.medium.com/v2/resize:fit:1080/1*uiYllExtf1T_uHxXLv5ZTQ.png",
    title: "Art of Harnessing Mind Power",
    id: 5,
    about:
      " Unlock the limitless potential of your mind with Art of Harnessing Mind Power, a transformative course guiding you to unleash inner strength, achieve clarity, and manifest your dreams with the power of your mind.",
  },
  {
    url: "https://images.bhaskarassets.com/web2images/521/2019/09/18/0521_krishna.jpg",
    title: "Gita in Action",
    id: 6,
    about:
      "After traveling the whole world, Bhagavad Gita comes at your doorstep! Let's deep dive upon how this science uncover profound insights that resonate deeply with our day-to-day struggles and triumphs.",
  },
  {
    url: "https://www.cas.org/sites/default/files/styles/promo_hero/public/images/optimizing-ai-blog-hero960x540.jpg?itok=dxEbfnAe",
    title: "The Science of Self-Realization",
    id: 7,
    about:
      "Embark on a transformative journey of self-discovery as we delve into the profound teachings of the Science of Self-Realization. Rooted in ancient wisdom, this science offers a pathway to understanding the depths of our own being and unlocking the secrets of existence.",
  },
];
