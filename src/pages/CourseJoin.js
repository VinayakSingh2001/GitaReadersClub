import React from "react";
import Memberform from "../components/Memberform";
import { useNavigate } from "react-router-dom";
import { getDatabase,set,ref,get} from "firebase/database";
import { app,auth } from "../firebase.config";


const CourseJoin = () => {
  // const nav = useNavigate();
  const addCourse=async(e)=>{
  
    e.preventDefault();
    const user = auth.currentUser;
    if(user){
    const courseId = "ABC123";
    if(window.confirm('Do you want to enroll in this course')){
  
    const db = getDatabase(app);
    const userCourseRef = ref(db,`course/${user.uid}`);
  
    const userCourseSnapshot = await get(userCourseRef);
    let userCourseData = userCourseSnapshot.val();
    if(!userCourseData) userCourseData=[];
  
    if(!userCourseData.includes(courseId)){
        userCourseData.push(courseId);
        set(userCourseRef, userCourseData);
        alert("Enrolled");
    }else{
      alert('You are already enrolled in this course');
    }
  }
  }else{
    alert('Please login to enroll in this course');
    // nav('/login');
  }
  }

  return (
    <div className="py-10 px-12">
      <div className="bg-[#E0E4FE] border rounded-lg">
        <div className="py-5 flex justify-center ">
          {/* <button className="border bg-[#fefae0] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer">
            Join as a member
          </button> */}
          <Memberform/>
        </div>
        <div className="py-5 flex justify-center">
          <button className="border bg-[#fefae0] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer" onClick={addCourse}>
            Join for Gita Weekly Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseJoin;
