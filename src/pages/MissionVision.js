import React from "react";
import Wrapper from "../components/Wrapper";

const MissionVision = () => {
  return (
    <div id="about" className="py-20  mx-12 border rounded-md shadow-md px-5">
      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl pb-5">Vision</h1>
              <p className="text-base md:text-lg">
                To make a community where the timeless wisdom of the Bhagavad
                Gita is embraced and lived through comprehensive study and
                understanding, leading to personal growth and societal harmony.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img
                src="https://static.tnn.in/thumb/msid-101474254,thumbsize-999696,width-1280,height-720,resizemode-75/101474254.jpg"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="w-full md:w-1/2 ">
              <img
                src="https://media.licdn.com/dms/image/C4E12AQGodQsQFc69zA/article-cover_image-shrink_720_1280/0/1616866597415?e=2147483647&v=beta&t=8EnOrDHt-SiHE_V1ipZycE79O-Vey5Xi2SbUlzCuLWE"
                alt=""
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl pb-5">Mission</h1>
              <p className="text-base md:text-lg">
                To reduce the stress and problems faced by youths in day to day
                life and implementing the teachings of scriptures in ourlife in
                order to enhance character and competence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
