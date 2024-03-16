import React from "react";
import Wrapper from "../components/Wrapper";
import { GoDotFill } from "react-icons/go";

const About = () => {
  return (
    <div className=" font-sans ">
      <Wrapper>
        <div className="py-20  rounded-md bg-slate-200 ">
          <h1 className="text-3xl md:text-4xl font-semibold lg:text-5xl text-center">
            Why should we read Gita ?
          </h1>
          <div className="w-full md:w-3/4  mx-auto py-8">
            <p className="text-lg md:text-xl text-left py-4">
              The Bhagavad-gita is an ancient philosophical classic that offers
              insights about life and love, about yoga and spirituality, soul
              and mind, God and eternity, hope and happiness.
            </p>
            <p className="text-lg md:text-xl text-left py-4">
              Bhagvad Gita teaches that true wisdom lies in understanding the
              temporary nature of the material world and recognizing the eternal
              nature of the soul.
            </p>
            <p className="text-lg md:text-xl text-center py-4">
              Bhagvad Gita directly links to the various important principles of
              management such as crisis handling, ethical conduct, best
              corporate governance, stress management, unity of command,
              division of labour etc.
            </p>
            <p className="text-lg font-semibold md:text-xl text-center py-1 flex">
              The key benefits of Reading Bhagvad Gita are -
            </p>
            <ul>
              <li className="text-lg md:text-xl text-center py-1 flex">
                <GoDotFill /> Clarity in decision making even in the delimmas
              </li>
              <li className="text-lg md:text-xl text-center py-1 flex">
                <GoDotFill /> Enhancement of knowledge and memory power
              </li>
              <li className="text-lg md:text-xl text-center py-1 flex">
                <GoDotFill /> Improvement of focus, concentration and analytical
                skills
              </li>
            </ul>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
