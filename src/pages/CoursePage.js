import React, { createContext, useContext } from "react";
import Wrapper from "../components/Wrapper";
import { useState, useEffect } from "react";
import { getDatabase, get, ref } from "firebase/database";
import { app } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Courses");
    try {
      const snapshot = await get(dbRef);
      const val = snapshot.val();
      setCourse(val);
      console.log(course);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // setCourse()
    console.log(course);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
            <div className="">
              <p className="text-gray-700">Loading...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:py-20 relative" id="courses">
          <Wrapper>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[55px] mb-5 font-semibold leading-tight">
                Courses
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 px-5 md:px-0">
              {course.map((item, index) => (
                <div
                  // href={/check/${index}}
                  className="transform overflow-hidden bg-white duration-200 h-[500px] border hover:scale-105 cursor-pointer relative"
                  id={index}
                  onClick={() => {
                    localStorage.setItem("CourseId", index);
                    Navigate("/courseDetails");
                  }}
                  key={index}
                >
                  <img
                    className="w-full h-[60%] object-cover"
                    src={item.img}
                    alt="Product Image"
                  />
                  <div className="p-4 text-black/[0.9]">
                    <h2 className="text-lg text-center font-semibold">
                      {item.title}
                    </h2>
                    <div className="flex item-center text-black/[0.5] ">
                      <p className="mr-2 text-lg  font-medium overflow-hidden">
                        {item.shortdesc}
                      </p>
                    </div>
                    <div className="absolute right-0 bottom-0 mt-2">
                      {item.status ? (
                        <div className="rounded bg-blue-500 text-white px-3 py-1 hover:bg-blue-600">
                          Enroll Now
                        </div>
                      ) : (
                        <div className="rounded bg-blue-500 text-white px-3 py-1 hover:bg-blue-600">
                          Coming Soon ...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default CoursePage;
