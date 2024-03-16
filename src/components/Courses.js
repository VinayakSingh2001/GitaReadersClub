import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { getDatabase,get,ref } from "firebase/database";
// import { app } from "../firebase.config";
import img1 from "../assets/course/Art of Smart Work.jpg";
import img2 from "../assets/course/Art of Harnessing Mind Power.jpg";
import img3 from "../assets/course/Converting Stress to Smile (1).jpg";
import img4 from "../assets/course/Gita Sutras of Life.jpg";
import img5 from "../assets/course/Gita in Action.jpg";
import img6 from "../assets/course/Happiness Mantra.jpg";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const Navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [courses, setCourses] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Courses");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setCourses(snapshot.val());
        }
      } catch (error) {
        toast.error("Unable to fetch Courses");
      } finally {
        setloading(false);
      }
    };
    return () => fetchData();
  }, []);

  return (
    <>
      {/* {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      ) : ( */}
        <div id="courses" className=" md:pb-40 z-0">
          <Wrapper>
            <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
              <div className="text-[50px] font-semibold font-sans mb-10 text-center">
                Upcoming Courses
              </div>
              <Carousel
                responsive={responsive}
                containerClass="-mx-[10px]"
                itemClass="px-[10px]"
                infinite={true} // Enable infinite scroll
              >
                {courses.map((item, index) => (
                  <div
                    key={index}
                    className="carousel-item border shadow-md h-[500px]  hover:cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("CourseId", index);
                      Navigate("/courseDetails");
                    }}
                  >
                    <img
                      className="w-full h-[60%] object-cover"
                      src={item.img}
                      alt={item.title}
                    />
                    <div className="carousel-content">
                      <h3 className="text-[22px] font-medium text-center py-3">
                        {item.title}
                      </h3>
                      <p className="text-center px-2 text-lg">
                        {item.shortdesc}
                      </p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </Wrapper>
        </div>
      {/* )} */}
    </>
  );
};

export default Courses;
