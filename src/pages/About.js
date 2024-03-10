import React from "react";
import Wrapper from "../components/Wrapper";

const About = () => {
  return (
    <div id="about" className="py-8 font-sans">
      <Wrapper>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">
          Versatile Integrations
        </h1>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto py-8">
          <p className="text-lg md:text-xl text-center">
            Elevate your workflow by seamlessly integrating our machine learning
            platform with your existing tools. We understand the importance of
            collaboration and compatibility, which is why our platform supports
            a wide array of integrations.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
