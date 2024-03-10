import React from "react";
import Wrapper from "../components/Wrapper";
import Service from "../components/Service";
import img1 from "../assets/speakers/SANDEEP PR.jpg";
import img2 from "../assets/speakers/DEEPAK PR.jpg";
import img3 from "../assets/speakers/shivam.jpeg";
import img4 from "../assets/speakers/parteek.jpeg";
import img5 from "../assets/speakers/apoorv.jpeg";
import img6 from "../assets/speakers/avinash.jpg";
import img7 from "../assets/speakers/abhishek.jpg";

const Speakers = () => {
  const speakers = [
    {
      name: "B Sandeep Kumar",
      img: img1,
      about1: "M.Tech. , IIT BHU",
      about2: "GATE AIR 44",
      about3: "Youth Mentor and Chairperson at Umeed Foundation",
    },
    {
      name: "Dr. Deepak K",
      img: img2,
      about1: "Assistant Professor, IIT BHU",
      about2: "PhD Materials Science and Engineering from NTU Singapore",
    },
    {
      name: "Shivam Kumar",
      img: img3,
      about1: "B.Tech., IIT BHU",
      about2: "Director of Umeed Foundation",
      about3:
        "Head of Communications at ICFDR(Indian Centre for Development and Rights)",
    },
    {
      name: "Prateek Bhardwaj",
      img: img4,
      about1: "B.Tech., MNNIT Prayagraj",
      about2: "Software Engineer at Oracle",
    },
    {
      name: "Apoorv Rastogi",
      img: img5,
      about1: "B.Tech. CSE, IIT BHU",
      about2: "MTS-2 at VMware",
    },
    {
      name: "Avinash Jha",
      img: img6,
      about1: "B.Tech., MNNIT Prayagraj",
      about2: "Coordinator at Umeed Foundation",
    },
    {
      name: "Abhishek Pradhan",
      img: img7,
      about1: "B.Tech., IIT BHU",
      about2: "Software Engineer at Shipsy",
      about3: "Associate Software Engineer at MathWorks",
    },
  ];
  return (
    <div className="pb-10 F9FAFA" id="speakers">
      <Wrapper>
        <div className="text-center max-w-full mx-auto my-[50px]  md:my-[80px]">
          <div className="text-[28px] md:text-[40px] font-bold leading-tight ">
            Our Prominent Speakers
          </div>
        </div>
        <div className="mb-[100px] md:mb-0">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-10 px-5 md:px-0 justify-center">
              {speakers.map((item, index) => (
                <div key={index}>
                  <Service
                    name={item.name}
                    img={item.img}
                    about1={item.about1}
                    about2={item.about2}
                    about3={item.about3}
                    desc={item.desc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Speakers;
