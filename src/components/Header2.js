import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Login from "./Login";
import Logout from "./Logout";
import { HiMenu, HiX } from "react-icons/hi"; // Importing hamburger and close icons
import logo from "../assets/logo22@3x-8.png";
import { Dialog } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import {
  BookOpenIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Header2 = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState("translate-y-200");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [loggedin, setLoggedin] = useState("");
  const [data, setData] = useState("");
  let [open, setOpen] = useState(false);

  const Links = [
    { name: "Home", link: "hero" },
    { name: "About Us", link: "about" },
    { name: "Courses", link: "courses" },
    { name: "Contact", link: "contact" },
    { name: "Speakers", link: "speakers" },
  ];

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrolly) {
        setShow("-translate-y-full");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-200");
    }
    setLastScrolly(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrolly]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    if (window.innerWidth > 768) {
      setShowMenu(false);
    }
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <img src={logo} alt="" className="h-[40px] md:h-[50px] " />
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <a
                href={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header2;
