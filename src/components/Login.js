import React from "react";
import { useState ,useRef} from "react";
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
  
export default function Login() {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, seterr] = useState("");

  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if the click target is not a descendant of the modal content
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  const signInwithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("authToken", result.authToken);
        toast.success("logged in successfully!!");
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
      toast.success("logged in successfully");
      localStorage.setItem("token", "loggedin");
      setShowModal(false);
    } catch (error) {
      seterr(error.message);

    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white mx-3 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      
      {showModal ? (
        <>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full" ref={modalRef}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center flex justify-center ml-auto mr-auto">
                    Login
                  </h3>
                  <div>
                  <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-red-500 hover:text-white rounded-lg 
                  text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={()=> setShowModal(false)}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                  </div>
                  
                </div>
                <div className="flex justify-center items-center">
                  <form
                    onSubmit={handleSubmit}
                    action=""
                    className="w-full max-w-md bg-white rounded px-8 pt-6 pb-8"
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
                    <div className="text-sm font-medium text-gray-500 pt-2 gap-1 dark:text-gray-300 flex justify-center">
                      <p>Don't have an account?</p>
                      <Register />
                    </div>
                    <div className="text-sm font-medium text-gray-500 text-center">
                      Or
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      <button
                        type="button"
                        className="bg-blue-700 hover:bg-blue-800 my-5 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 block w-full"
                        onClick={signInwithGoogle}
                      >
                        Login with Google
                      </button>
                    </div>
                  </form>
                </div>
          
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
         
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
