import React from "react";

const CourseJoin = () => {
  return (
    <div className="py-10 px-12">
      <div className="bg-[#E0E4FE] border rounded-lg">
        <div className="py-5 flex justify-center ">
          <button className="border bg-[#fefae0] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer">
            Join as a member
          </button>
        </div>
        <div className="py-5 flex justify-center">
          <button className="border bg-[#fefae0] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer">
            Join for Gita Weekly Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseJoin;
