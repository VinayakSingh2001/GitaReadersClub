import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Courses = () => {
  return (
    <div className="">
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
      <section ref={targetRef} className="relative h-[300vh] ">
        <div className="sticky top-0 flex-cols h-screen items-center overflow-hidden">
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
    </>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
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
          <p className=" text-2xl font-black uppercase">{card.title}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ab
            soluta labore. Tenetur, ducimus consectetur amet alias, vero natus
            quod, quae modi deleniti eos blanditiis in accusantium itaque facere
            consequuntur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const cards = [
  {
    url: "https://english.madhyamam.com/h-upload/2021/01/11/836651-happiness.webp",
    title: "Gita in Action",
    id: 1,
    about: "",
  },
  {
    url: "https://th-thumbnailer.cdn-si-edu.com/Xdw02FpJQQnGbp0PEQiXc5lbBG8=/800x450/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/Smile_hero.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "https://m.media-amazon.com/images/I/611eFCrix2L._AC_UF1000,1000_QL80_.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "https://miro.medium.com/v2/resize:fit:1024/1*QPkBOZ1uwfGl2nhqXy7Ubg.jpeg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "https://www.iskconbangalore.org/wp-content/uploads/2019/11/bhagavad-gita.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "https://rgyanshop.com/cdn/shop/products/About-Talking-Bhagavad-Gita.jpg?v=1651060383",
    title: "Title 7",
    id: 7,
  },
];
