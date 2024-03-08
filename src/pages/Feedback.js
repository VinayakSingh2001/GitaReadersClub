import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "../components/Wrapper";
import UpScroller from "../components/UpScroller";
const Feedback = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6" id="contact">
      <div className="text-[40px] font-bold text-center mb-8">Feedback</div>
      <Wrapper className="flex flex-col md:flex-row gap-[50px] md:gap-0 items-center justify-evenly md:items-start">
        {/* LEFT START */}
        <form className="gap-6 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              rows="5"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
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
          onClick={() => window.open("https://facebook.com", "_blank")}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaFacebookF size={20} />
        </div>
        <div
          onClick={() => {
            window.open("https://twitter.com");
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaTwitter size={20} />
        </div>
        <div
          onClick={() => {
            window.open("https://youtube.com");
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaYoutube size={20} />
        </div>
        <div
          onClick={() => {
            window.open("https://instagram.com");
          }}
          className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
        >
          <FaInstagram size={20} />
        </div>

        {/* <UpScroller /> */}
      </div>
      {/* RIGHT END */}
    </footer>
  );
};

export default Feedback;
