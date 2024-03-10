import React from "react";
import Memberform from "../components/Memberform";
import { useNavigate } from "react-router-dom";
import { getDatabase,set,ref,get} from "firebase/database";
import { app,auth } from "../firebase.config";
import { ToastContainer,toast } from "react-toastify";


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
        toast.success("Enrolled");
    }else{
      toast.error('You are already enrolled in this course');
    }
  }
}else{
  if (!localStorage.getItem("notLoggedInToastShown")) {
    toast.error("Please login to enroll in this course");
    // Set a flag indicating that the toast has been shown
    localStorage.setItem("notLoggedInToastShown", "true");
    // Redirect to login page
    
  }
  }
  }

  return (
    <div className="py-10 px-12">
      <div className="bg-[#edf6f9] border rounded-lg">
        <div className="py-5 flex justify-center ">
          {/* <button className="border bg-[#fefae0] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer">
            Join as a member
          </button> */}
          <Memberform/>
        </div>
        <div className="py-5 flex justify-center">
          <button className="border bg-[#F9F0ED] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer" onClick={addCourse}>
            Join for Gita Weekly Courses
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CourseJoin;
