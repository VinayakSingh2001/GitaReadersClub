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
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">Titile</h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    cdcsd
                  </p>
                </div>
              </div>
            </div>
            <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">Title</h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    cdcsd
                  </p>
                </div>
              </div>
            </div>
            <div className="transform overflow-hidden duration-200 p-4 hover:scale-105 cursor-pointer">
              <div className="flex justify-center ">
                <img
                  className="w-60 h-60 object-cover rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                  alt="Product Image"
                />
              </div>

              <div className="p-4 text-black-[0.9] flex flex-col items-center">
                <h2 className="text-2xl text-center font-medium">Title</h2>
                <div className="text-black-[0.5]">
                  <p className="mr-2 text-lg text-center text-slate-700">
                    cdcsd
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