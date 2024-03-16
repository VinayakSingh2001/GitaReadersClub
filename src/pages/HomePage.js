import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import About from "./About";
import MissionVision from "./MissionVision";
import SocialMediaPages from "./SocialMediaPages";
import Quotes from "./Quotes";
import Courses from "../components/Courses";
import Speakers from "./Speakers";
import Feedback from "./Feedback";
import CourseJoin from "./CourseJoin";
import { ToastContainer } from "react-toastify";
import CarouselComponent from "./CarouselComponent";
import Activities from "./Activities";
import Header2 from "../components/Header2";
import YouTubePlaylist from "../components/YouTubePlaylist";
import Profile from "./user/Profile";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/logo22@3x-8.png";
import { auth, app } from "../firebase.config";
import { getDatabase, ref, set, get } from "firebase/database";
import { Dialog } from "@headlessui/react";
// import Footer from "../components/Footer";
// import Test from "./Test";

const HomePage = () => {
  // const [profileimg,setProfileimg] =useState("https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png");
  //   useEffect(() => {
  //       const fetchData = async () => {
  //         const userId = auth.currentUser.uid;
  //         //  alert(userId);
  //         const db = getDatabase(app);
  //         const dbRef = ref(db, `user/${userId}`);
  //         try {
  //           const snapshot = await get(dbRef);
  //           const val = snapshot.val();
  //           console.log(val);
  //           if(val && val.image){
  //             setProfileimg(val.image);
  //             console.log(profileimg)
  //           } else {
  //             setProfileimg("https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png");
  //           }
            
  //         } catch (error) {
  //           // alert(error.message);
  //         }
          
  //       };
  //       const unsubscribe = auth.onAuthStateChanged((user) => {
  //         if (user) {
  //           // console.log(auth);
            
  //           // console.log(user.displayName);
  //           // console.log(user.displayName);
  //           console.log(user.email);
  //           // setProfileimg(user.email); // User is authenticated
  //           fetchData();
  //         } else {
  //           setProfileimg("https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png");
  //            // User is not authenticated
  //         }
  //       });
  //       return unsubscribe; // Cleanup function
  //     }, []);

  return (
    <div>

      <HeroBanner />
      <CourseJoin />
      <MissionVision />
      <Activities />
      {/* <SocialMediaPages /> */}
      <About />
      <CarouselComponent />
      <YouTubePlaylist/>
      <Courses />
      <Speakers />
      {/* <Test /> */}
      <Feedback />
      
    </div>
  );
};

export default HomePage;
