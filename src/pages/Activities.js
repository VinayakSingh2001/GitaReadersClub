import React from "react";
import Wrapper from "../components/Wrapper";

const Activities = () => {
  return (
    <>
      <div className="px-5 py-20">
        <Wrapper>
          <h1 className="text-[50px] text-center font-semibold">Activities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14 md:px-0 ">
            <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  className="w-60 h-60 object-cover rounded-full "
                  src="https://www.vedantausa.org/wp-content/uploads/2022/11/retreat_class.jpg"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">
                  Gita Weekly Course
                </h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    45 minutes session @ SAC
                  </p>
                </div>
              </div>
            </div>
            <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src="https://img.freepik.com/premium-photo/serene-meditation-session-rishikesh-ashrams_1057859-472.jpg"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">
                  Mantra Meditation
                </h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    30 minutes @ SAC
                  </p>
                </div>
              </div>
            </div>
            <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src="https://niranjanaswami.com/wp-content/uploads/2018/08/analogies-for-preaching-ebook-2-web.jpg"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">E-Books</h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Activities;
