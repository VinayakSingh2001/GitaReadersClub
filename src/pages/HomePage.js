import React from "react";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import About from "./About";
import MissionVision from "./MissionVision";
import SocialMediaPages from "./SocialMediaPages";
import Quotes from "./Quotes";
import Courses from "./Courses";
import Speakers from "./Speakers";
import Feedback from "./Feedback";
import CourseJoin from "./CourseJoin";
import { ToastContainer } from "react-toastify";
import CarouselComponent from "./CarouselComponent";
import Activities from "./Activities";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Test from "./Test";

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <CourseJoin />
      <MissionVision />
      <Activities/>
      {/* <SocialMediaPages /> */}
      <About />
      <CarouselComponent/>
      <Courses />
      <Speakers />
      {/* <Test /> */}
      <Feedback />
      
    </div>
  );
};

export default HomePage;
