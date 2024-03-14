import React, {useState,useEffect } from "react";
import Wrapper from "./Wrapper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { getDatabase,get,ref } from "firebase/database";
// import { app } from "../firebase.config";
import img1 from "../assets/course/Art of Smart Work.jpg";
import img2 from "../assets/course/Art of Harnessing Mind Power.jpg";
import img3 from "../assets/course/Converting Stress to Smile (1).jpg";
import img4 from "../assets/course/Gita Sutras of Life.jpg";
import img5 from "../assets/course/Gita in Action.jpg";
import img6 from "../assets/course/Happiness Mantra.jpg";



const Courses = () => {
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

  
//   const [course,setCourse]=useState([]);

//   const fetchData=async()=>{
//     const db =getDatabase(app);
//     const dbRef = ref(db,'Courses');
//       try {
//         const snapshot =await get(dbRef);
//         const val = snapshot.val();
//         setCourse(val);
//         console.log(course);
//       } catch (error) {
//         console.log(error.message);
//       }
// }

// useEffect(()=>{
//   fetchData();
//   // setCourse()
//   console.log(course)
// },[])
  
  
  const course = [
    {
      title: "Gita in Action",
      img: img5,
      text: "After traveling the whole world, Bhagavad Gita comes at your doorstep! Let's deep dive upon how this science uncover profound insights that resonate deeply with our day-to-day struggles and triumphs.",
    },
    {
      title: "Gita Sutras for life",
      img: img4,
      text: "Dive into the timeless wisdom of the Gita with 'Gita Sutras for Life' – a transformative journey unlocking ancient secrets for modern living.",
    },
    {
      title: "Art of Smart Work",
      img: img1,
      text: "Discover the Art of Smart Work – an empowering exploration of ancient strategies for mastering productivity and achieving success effortlessly",
    },
    {
      title: "Converting stress to smile",
      img: img3,
      text: "Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy.",
    },
    {
      title: "Happiness Mantra",
      img: img6,
      text: ' Delve into the secrets of eternal joy with "Happiness Mantra," a transformative course revealing ancient wisdom and practical strategies to cultivate lasting happiness and inner fulfillment',
    },
    {
      title: "Art of Harnessing Mind Power",
      img: img2,
      text: 'Unlock the limitless potential of your mind with "Art of Harnessing Mind Power," a transformative course guiding you to unleash inner strength, achieve clarity, and manifest your dreams with the power of your mind.',
    },
  ];

  return (
    <div id="courses" className=" md:pb-40 z-0">
      <Wrapper>
        <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
          <div className="text-[50px] font-semibold font-sans mb-5 text-center">
            Upcoming Courses
          </div>
          <Carousel
            responsive={responsive}
            containerClass="-mx-[10px]"
            itemClass="px-[10px]"
            infinite={true} // Enable infinite scroll
          >
            {course.map((item, index) => (
              <div key={index} className="carousel-item border h-[430px]">
                <img src={item.img} alt={item.title} />
                <div className="carousel-content">
                  <h3 className="text-[22px] font-medium text-center py-3">
                    {item.title}
                  </h3>
                  <p className="text-center px-2 text-lg">{item.text}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Wrapper>
    </div>
  );
};

export default Courses;