import React from "react";
import Wrapper from "../components/Wrapper";
import { useState,useEffect } from "react";
import { getDatabase,get,ref } from "firebase/database";
import { app } from "../firebase.config";
// const course = [
//   {
//     title: "Gita in Action",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: "After traveling the whole world, Bhagavad Gita comes at your doorstep! Let's deep dive upon how this science uncover profound insights that resonate deeply with our day-to-day struggles and triumphs.",
//   },
//   {
//     title: "Gita Sutras for life",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: "Dive into the timeless wisdom of the Gita with 'Gita Sutras for Life' – a transformative journey unlocking ancient secrets for modern living.",
//   },
//   {
//     title: "Art of Smart Work",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: "Discover the Art of Smart Work – an empowering exploration of ancient strategies for mastering productivity and achieving success effortlessly",
//   },
//   {
//     title: "Converting stress to smile",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: "Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy.",
//   },
//   {
//     title: "Happiness Mantra",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: ' Delve into the secrets of eternal joy with "Happiness Mantra," a transformative course revealing ancient wisdom and practical strategies to cultivate lasting happiness and inner fulfillment',
//   },
//   {
//     title: "Art of Harnessing Mind Power",
//     img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
//     text: 'Unlock the limitless potential of your mind with "Art of Harnessing Mind Power," a transformative course guiding you to unleash inner strength, achieve clarity, and manifest your dreams with the power of your mind.',
//   },
// ];

const CoursePage = () => {

  
  const [course,setCourse]=useState([]);

  const fetchData=async()=>{
    const db =getDatabase(app);
    const dbRef = ref(db,'Courses');
      try {
        const snapshot =await get(dbRef);
        const val = snapshot.val();
        setCourse(val);
        console.log(course);
      } catch (error) {
        console.log(error.message);
      }
}

useEffect(()=>{
  fetchData();
  // setCourse()
  console.log(course)
},[])


  return (
    <div className="w-full md:py-20 relative" id="courses">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[55px] mb-5 font-semibold leading-tight">
            Courses
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 px-5 md:px-0">
          {course.map((item, index) => (
            <div
              href="/product/1"
              className="transform overflow-hidden bg-white duration-200 border hover:scale-105 cursor-pointer"
            >
              <img className="w-full" src={item.img} alt="Product Image" />
              <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg text-center font-semibold">
                  {item.title}
                </h2>
                <div className="flex item-center text-black/[0.5]">
                  <p className="mr-2 text-lg  font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default CoursePage;
