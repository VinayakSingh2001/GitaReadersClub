import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Wrapper from "./Wrapper";

const Notification = () => {
  return (
    <div className="pt-5">
      <Wrapper>
        <div className="text-[20px] flex items-center justify-center gap-4 font-bold text-center py-3 bg-black-darker rounded-2xl ">
          <h1 className="text-cyan ">Register for our Gita Weekly Course.</h1>
          <FaArrowRight className="text-white" />
          <button className="text-white blink "> Register</button>
        </div>
      </Wrapper>
    </div>
  );
};

export default Notification;
