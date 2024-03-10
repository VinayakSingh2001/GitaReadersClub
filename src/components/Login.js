import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Register from "./Register";
import { app } from "../firebase.config";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../firebase.config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
// import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, seterr] = useState("");

  

  const signInwithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log('Success :', result.user);
        // alert("Logged In");
        localStorage.setItem("authToken", result.authToken);
        toast.success("login successful");
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("authToken", auth.authToken);
      
      toast.success("logged-in");
      localStorage.setItem("token", "loggedin");
      setShowModal(false);
    } catch (error) {
      seterr(error.message);
      toast.error("Invalid Credentials");
    }
  };
  useEffect(() => {
    if (showModal) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
      // Set screen height to 100vh
      document.body.style.height = "100vh";
    } else {
      // Enable scrolling
      document.body.style.overflow = "unset";
      // Reset screen height
      document.body.style.height = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <>
      <button
        className="bg-pink-500 text-white mx-3  font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      
      
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center justify-center">
                    Login
                  </h3>
                </div>
                {/*body*/}
                <div className="flex justify-center items-center">
                  <form
                    onSubmit={handleSubmit}
                    action=""
                    className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8"
                  >
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <a href="/forgotpassword">forgot password?</a>
                      <button
                        className="bg-emerald-500 my-5 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 block w-full"
                        type="submit"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                      
                    </div>
                    <div class="text-sm font-medium text-gray-500 pt-2 gap-1 dark:text-gray-300 flex justify-center">
                      <p>Don't have an account?</p>
                      <Register />
                    </div>
                    <div className="text-sm font-medium text-gray-500 text-center">
                      Or
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      <button
                        type="button"
                        className=" bg-blue-700 hover:bg-blue-800 my-5 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 block w-full"
                        onClick={signInwithGoogle}
                      >
                        Login with Google
                      </button>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        
          
        </>
      ) : null}
    </>
  );
}
