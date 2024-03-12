import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { app, auth } from "../firebase.config";
import { toast } from "react-toastify";
const Feedback = () => {
  const [feed, setnewFeed] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [err, seterr] = useState("");

  const handleChange = (e) => {
    setnewFeed({ ...feed, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feed.name || !feed.email || !feed.message || !feed.mobile) {
      seterr("All fields are required");
      return;
    }
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!feed.email.match(emailRegex)) {
      seterr("Please enter a valid email address");
      return;
    }

    // Validation for mobile number format
    const mobileRegex = /^\d{10}$/;
    if (!feed.mobile.match(mobileRegex)) {
      seterr("Please enter a valid 10-digit mobile number");
      return;
    }
    let newErr = "";

    if (feed.name === "") {
      newErr = "Please enter a valid username";
      seterr(newErr);
      return;
    }

    if (
      feed.email === "" ||
      !feed.email.includes("@") ||
      !["gmail.com", "yahoo.com", "mnnit.ac.in"].includes(
        feed.email.split("@")[1]
      )
    ) {
      newErr += "\nInvalid email address";
      seterr(newErr);
      return;
    }

    if (feed.mobile.length !== 10) {
      newErr += "\nInvalid mobile no.";
      seterr(newErr);
      return;
    }

    // if (feed.password !== details.confirmPassword) {
    //   newErr += "\nPassword should match with confirm password";
    //   seterr(newErr);
    //   return;
    // }

    // if (newErr !== "") {
    //   // alert(details.password+"   "+details.confirmPassword);
    //   seterr(newErr);
    //   return;
    // }

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please log in first");
        seterr("");
        return;
      }
      seterr("");
      const db = getDatabase(app);
      const feedRef = ref(db, `feedback/${user.uid}`);
      const snapshot = await get(feedRef);
      if (snapshot.exists()) {
        seterr(
          "You have already filled out the form. Please wait for feedback."
        );
        setnewFeed({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
        return;
      } else {
        set(ref(db, `feedback/${user.uid}`), {
          name: feed.name,
          email: feed.email,
          mobile: feed.mobile,
          message: feed.message,
          Date:new Date().toLocaleDateString(),
          Time:new Date().toLocaleTimeString(),
        });
        setnewFeed({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
        toast.success("Thank you we recieved your feedback!!!");
      }
      // const user = auth.currentUser;

      // Your code for handling feedback submission after login
      seterr("");
      // Reset the error message after successful submission
    } catch (error) {
      seterr(error.message);
    }
  };

  return (
    <footer className="bg-black-darker text-white pt-10 pb-6" id="contact">
      <div className="text-[40px] font-bold text-center mb-8">Contact Us</div>
      <Wrapper className="flex flex-col md:flex-row gap-[50px] md:gap-0 items-center justify-evenly md:items-start">
        {/* LEFT START */}
        <form className="gap-6 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-5">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={feed.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={feed.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                name="mobile"
                type="tel"
                placeholder="Enter your phone number"
                value={feed.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
              rows="5"
              value={feed.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {err && (
            <div
              className="bg-red-50 border-l-4 border-red-400 text-red-700 p-2 mt-2 my-2"
              role="alert"
            >
              <p className="text-s">{err}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>

        {/* LEFT END */}

        {/* RIGHT START */}
      </Wrapper>
      <div className="flex gap-4 justify-center ">
        <div
          onClick={() =>
            window.open(
              "https://www.facebook.com/profile.php?id=61557231751695",
              "_blank"
            )
          }
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaFacebookF size={20} />
        </div>
        {/* <div
          onClick={() => {
            window.open("https://twitter.com");
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaTwitter size={20} />
        </div> */}
        <div
          onClick={() => {
            window.open(
              "https://youtube.com/@GitaReadersClub?si=mV-7u-8VNSCZ9vxT"
            );
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaYoutube size={20} />
        </div>
        <div
          onClick={() => {
            window.open("https://www.instagram.com/officialgitareadersclub/");
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaInstagram size={20} />
        </div>
      </div>
      {/* RIGHT END */}
    </footer>
  );
};

export default Feedback;
