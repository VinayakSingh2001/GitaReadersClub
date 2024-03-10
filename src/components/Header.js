import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Login from "./Login";
import Logout from "./Logout";

const Header = () => {
  const [show, setShow] = useState("translate-y-200");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [loggedin, setLoggedin] = useState("");

  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "about" },
    { name: "Courses", link: "courses" },
    { name: "Contact", link: "contact" },
    { name: "Speakers", link: "speakers" },
    { name: "Donate", link: "/donate" },
  ];

  const controlNavBar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrolly) {
        setShow("-translate-y-[80px]");
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

  return (
    <div
      className={`w-full h-[50px] md:h-[70px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          <div className="w-[40px] md:w-[60px] cursor-pointer">
            <h2>LOGO</h2>
          </div>
          <div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-7 transition-all duration-500 ease-in `}
            >
              {Links.map((link) => (
                <li className="md:ml-8 md:my-0 my-7 font-sans" key={link.name}>
                  {link.link.startsWith("/") ? (
                    <Link
                      to={link.link}
                      className="text-gray-500 cursor-pointer hover:text-blue-400 duration-500"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <ScrollLink
                      to={link.link}
                      spy={true}
                      smooth={true}
                      duration={1000}
                      className="text-gray-500 cursor-pointer hover:text-blue-400 duration-500"
                    >
                      {link.name}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex gap-4">
            {!loggedin ? <Login /> : <Logout />}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
