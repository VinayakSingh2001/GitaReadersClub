import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Login from "./Login";
import Logout from "./Logout";
import logo from "../assets/logo22@3x-8.png";
import { auth,app } from "../firebase.config";
import { getDatabase,ref,set,get } from "firebase/database";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState("translate-y-200");
  const [lastScrolly, setLastScrolly] = useState(0);
  const [loggedin, setLoggedin] = useState("");
  const [data,setData] = useState("");
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
///changes

useEffect(()=>{
  const fetchData = async()=>{
   const userId = auth.currentUser.uid;
  //  alert(userId);
    const db = getDatabase(app);
    const dbRef = ref(db,`user/${userId}`);
    try {
      const snapshot = await get(dbRef);
     const val = snapshot.val();
     setData(val.name);
    } catch (error) {
      // alert(error.message);
    }
    
  }
  const unsubscribe = auth.onAuthStateChanged(user => {
    
    if (user) {
      console.log(auth);
        setLoggedin(true);
        console.log(user.displayName);
    setData(user.displayName); // User is authenticated
    fetchData();
        
    } else {
      setData([]);
        setLoggedin(false); // User is not authenticated
    }
});
return unsubscribe; // Cleanup function
},[]);



//
  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrolly]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`w-full h-[50px] md:h-[70px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white text-xl cursor-pointer flex items-center gap-1">
            <img src={logo} alt="" className="h-[40px] md:h-[50px] " />
          </div>
          <div className="md:hidden">
            <button
              className="block text-gray-500 hover:text-blue-400 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <ul
              className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto left-0 w-full md:w-auto md:pl-0 pl-7 transition-all duration-500 ease-in ${
                showMenu ? "" : "hidden"
              }`}
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
          {!loggedin ? <Login />:<>
            <div>{data}</div>
            <div><Logout/></div>
            </>
            }
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
