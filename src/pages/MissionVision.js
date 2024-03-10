import React from "react";
import Wrapper from "../components/Wrapper";

const MissionVision = () => {
  return (
    <Wrapper>
      <div className="flex flex-col items-center py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1 className="text-4xl md:text-6xl">Mission</h1>
              <p className="text-base md:text-lg">
                Track every detail of your ML pipeline automatically. Visualize
                results with relevant context. Drag & drop analysis to uncover
                insights – your next best model is just a few clicks away
                Transforming the Financial Industry with Data How AI is
                Revolutionizing Urban Planning AI's Impact on Medical
                Diagnostics and Treatment
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img
                src="https://media.licdn.com/dms/image/C4E12AQGodQsQFc69zA/article-cover_image-shrink_720_1280/0/1616866597415?e=2147483647&v=beta&t=8EnOrDHt-SiHE_V1ipZycE79O-Vey5Xi2SbUlzCuLWE"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-10">
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
              <h1 className="text-4xl md:text-6xl">Mission</h1>
              <p className="text-base md:text-lg">
                Track every detail of your ML pipeline automatically. Visualize
                results with relevant context. Drag & drop analysis to uncover
                insights – your next best model is just a few clicks away
                Transforming the Financial Industry with Data How AI is
                Revolutionizing Urban Planning AI's Impact on Medical
                Diagnostics and Treatment
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MissionVision;
