import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useParams } from "react-router-dom";
import { getDatabase, get, set, ref } from "firebase/database";
import { app, auth } from "../firebase.config";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  console.log(course, localStorage.getItem("CourseId"));

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Courses");
    try {
      const snapshot = await get(dbRef);
      const val = snapshot.val();
      setCourse(val[localStorage.getItem("CourseId")]);
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

  // Generic blob image URL
  const blobImage = "blob_placeholder.jpg";
  const handleClick = async (index) => {
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase(app);
      const dbRef = ref(db, `EnrolledCourse/${user.uid}`);
      try {
        const snapshot = await get(dbRef);
        const EnrolledCourses = snapshot.val() || {};
        if (EnrolledCourses[localStorage.getItem("CourseId")])
          toast.error("Already Enrolled");
        else {
          EnrolledCourses[localStorage.getItem("CourseId")] = true;
          await set(dbRef, EnrolledCourses);
          toast.success("Enrolled successfully");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Login first to enroll course");
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
          <Wrapper className=" py-20">
            <div className="flex gap-20 ">
              <div className="w-[60%] py-10">
                <img src={course.img} alt="Course" className=" rounded-lg " />
              </div>

              {/* Course Details */}
              <div className="w-[60%]">
                <h1 className="text-4xl font-extrabold mb-4 text-yellow-300 transition duration-300">
                  {course.title}
                </h1>

                <p className="text-base mb-4">
                  <div dangerouslySetInnerHTML={{ __html: course.desc }} />
                </p>

                {/* Topics */}
                {/* <div className="mb-4">
              <p className="text-2xl font-extrabold mb-4 text-yellow-300 transition duration-300">Topics:</p>
              <ul className="list-disc  "> */}
                {/* {courseData.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))} */}

                {/* <div dangerouslySetInnerHTML={{ __html: course.topics }} /> */}
                {/* </ul>
            </div> */}
              </div>
            </div>

            <div className="sm:text mt-10">
              {/* Outcomes */}
              <div className="mb-4 border p-10">
                <p className="text-2xl font-extrabold mb-4 text-yellow-300 transition duration-300">
                  Outcomes:
                </p>

                <div >
                  <div className="flex ">
                  <ul className="list-disc ml-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10  md:px-0 justify-center" dangerouslySetInnerHTML={{ __html: course.outcome }} />
                  </ul>
                  </div>
                </div>
              </div>

              {/* Speaker Section */}
              <div className="mb-4">
                <p className="text-2xl font-extrabold mb-4 text-yellow-300 transition duration-300">Speaker:</p>
                <div className="flex items-center">
                  <div dangerouslySetInnerHTML={{ __html: course.speakers }} />
                </div>
              </div>

              {/* Enroll Button */}
              <div>
                {course.status ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={handleClick}
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Coming Soon...
                  </button>
                )}
              </div>
            </div>
          </Wrapper>
          {/* Course Image */}
        </div>
      )}
    </>
  );
};

export default CourseDetails;
