import React from "react";
import { NavLink } from "react-router-dom";
import Wrapper from "./Wrapper";

const PageMenu = () => {
  return (
    <div>
      <Wrapper>
        <nav className="my-12">
          <ul className="home-links py-3 text-white font-medium rounded-md flex justify-center gap-10 bg-gradient-to-r from-indigo-500 to-blue-500">
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/usercourse">Courses</NavLink>
            </li>
          </ul>
        </nav>
      </Wrapper>
    </div>
  );
};

export default PageMenu;
