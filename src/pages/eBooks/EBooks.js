import React from "react";
import Wrapper from "../../components/Wrapper";

const course = [
  {
    title: "On the way to Krishna",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "After traveling the whole world, Bhagavad Gita comes at your doorstep! Let's deep dive upon how this science uncover profound insights that resonate deeply with our day-to-day struggles and triumphs.",
  },
  {
    title: "Gita Sutras for life",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "Dive into the timeless wisdom of the Gita with 'Gita Sutras for Life' – a transformative journey unlocking ancient secrets for modern living.",
  },
  {
    title: "Art of Smart Work",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "Discover the Art of Smart Work – an empowering exploration of ancient strategies for mastering productivity and achieving success effortlessly",
  },
  {
    title: "Converting stress to smile",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy.",
  },
];

const MegaCourse = [
  {
    title: "Art of Smart Work",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "Discover the Art of Smart Work – an empowering exploration of ancient strategies for mastering productivity and achieving success effortlessly",
  },
  {
    title: "Converting stress to smile",
    img: "https://sambadenglish.com/wp-content/uploads/2020/05/bhagavad-gita.jpg",
    text: "Embark on a journey to transform stress into smiles with our course, offering practical tools and timeless wisdom to cultivate resilience, inner peace, and radiant joy.",
  },
];

const EBooks = () => {
  return (
    <>
      <div className="px-5 py-20">
        <Wrapper>
          <h1 className="text-[50px] text-center font-semibold">E-Books</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-14 md:px-0 overflow-hidden">
            {course.map((item, index) => (
              <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
                <div className="flex justify-center ">
                  <img
                    className="w-[800px] h-60 object-cover "
                    src={item.img}
                    alt="Product Image"
                  />
                </div>

                <div className="p-4 text-black-[0.9] flex flex-col items-center">
                  <h2 className="text-2xl text-center font-medium">
                    {item.title}
                  </h2>
                  <div className="text-black-[0.5]">
                    <p className="mr-2 text-lg text-center text-slate-700 "></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="pl-4 text-[30px] font-semibold">Mega Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-14 pt-6 md:px-0 overflow-hidden">
              {MegaCourse.map((item, index) => (
                <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
                  <div className="flex justify-center ">
                    <img
                      className="overflow-hidden "
                      src={item.img}
                      alt="Product Image"
                    />
                  </div>

                  <div className="p-4 text-black-[0.9] flex flex-col items-center">
                    <h2 className="text-2xl text-center font-medium">
                      {item.title}
                    </h2>
                    <div className="text-black-[0.5]">
                      <p className="mr-2 text-lg text-center text-slate-700 "></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default EBooks;
