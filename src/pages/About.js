import React from "react";
import Wrapper from "../components/Wrapper";

const About = () => {
  return (
    <div>
      <Wrapper className="py-2 font-sans">
        <h1 className="text-[55px] text-center">Versatile Integrations</h1>
        <div className="w-[70%] mx-auto flex items-center">
          <div>
            <p className="text-[22px] py-10 text-center">
              Elevate your workflow by seamlessly integrating our machine
              learning platform with your existing tools. We understand the
              importance of collaboration and compatibility, which is why our
              platform supports a wide array of integrations.
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
