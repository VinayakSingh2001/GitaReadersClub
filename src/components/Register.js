import { getDatabase, ref, set } from "firebase/database";
import React, { useState, useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { app, auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
// import { getDatabase,ref,set } from "firebase/database";
export default function Register() {
  const [showModal, setShowModal] = React.useState(false);
  // const navigate = useNavigate();
  const modalRef = useRef(null);
  const [details, setnewUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    confirmPassword: "",
  });
  const [err, seterr] = useState("");

  const handleChange = (e) => {
    setnewUser({ ...details, [e.target.name]: e.target.value });
  };

  const encodeEmail = (email) => {
    return email.replace(/\./g, ",").replace(/#/g, "%23");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enco = encodeEmail(details.email);
    e.preventDefault();
    let newErr = "";

    if (details.name === "") {
      newErr = "Please enter a valid username";
      seterr(newErr);
      return;
    }

    if (
      details.email === "" ||
      !details.email.includes("@") ||
      !["gmail.com", "yahoo.com", "mnnit.ac.in"].includes(
        details.email.split("@")[1]
      )
    ) {
      newErr += "\nInvalid email address";
      seterr(newErr);
      return;
    }

    if (details.mobile.length !== 10) {
      newErr += "\nInvalid mobile no.";
      seterr(newErr);
      return;
    }

    if (details.password !== details.confirmPassword) {
      newErr += "\nPassword should match with confirm password";
      seterr(newErr);
      return;
    }

    if (newErr !== "") {
      // alert(details.password+"   "+details.confirmPassword);
      seterr(newErr);
      return;
    }

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     details.email,
    //     details.password
    //   );
    //   const res = await fetch(
    //     `https://abcd-5eaff-default-rtdb.firebaseio.com//user.json`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         name: details.name,
    //         mobile: details.mobile,
    //         email: details.email,
    //         password: details.password,
    //         // confirmPassword:details.confirmPassword
    //       }),
    //     }
    //   );
    //   alert("signed-up");
    //   // setnewUser({
    //   //     name: "",
    //   //     email: "",
    //   //     mobile: "",
    //   //     password: "",
    //   //     confirmPassword: ""
    //   // });
    //   seterr("");
    //   setnewUser({
    //     name: "",
    //     email: "",
    //     password: "",
    //     mobile: "",
    //     confirmPassword: "",
    //   });
    //   setShowModal(false);
    // } catch (error) {
    //   seterr(error.message);
    // }

    //updated data setting

    try {
      const userCredential = await createUserWithEmailAndPassword(auth,details.email,details.password);
        const user = userCredential.user;
        const db =getDatabase(app);
        set(ref(db,`user/${user.uid}`),{
          name:details.name,
          email:details.email,
          // password:details.password,
          mobile:details.mobile
        });
        seterr("");
        localStorage.setItem("authToken",auth.authToken);
        // navigate('/');
        window.location.reload();
        
          toast.success("Registered successfully!!!");
         // Delay the toast by 5000 milliseconds (5 seconds)
    } catch (error) {
   
        seterr(error.message);
    }
  };
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     console.log(e.target.closest("max-w-md"));
  //     if (!e.target.closest("max-w-md")) {
        
  //       setShowModal(false);
  //     }
  //   };

  //   if (showModal) {
  //     document.body.style.overflow = "hidden";
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.body.style.overflow = "unset";
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [showModal]);
  // eslint-disable-next-line no-undef
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (!e.target.closest(".max-w-md")) {
  //       setShowModal(false);
  //     }
  //   };

  //   if (showModal) {
  //     document.body.style.overflow = "hidden";
  //     document.addEventListener("mousedown", handleOutsideClick);
  //   } else {
  //     document.body.style.overflow = "unset";
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [showModal]);
  return (
    <>
      <button
        className=" text-blue-500 px-1 font-semibold  text-sm rounded  mr-1 mb-1 ease-linear transition-all duration-150 mb-4"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Signup
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold text-center justify-center">
                    Signup
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
                {/*body*/}
                <div className="flex justify-center items-center">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8"
                    // ref={modalRef}
                  >
                    <div className="mb-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your Username"
                        value={details.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={details.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mobile block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="mobile"
                      >
                        Phone Number
                      </label>
                      <input
                        className="mobile shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                        id="mobile"
                        name="mobile"
                        type="text"
                        placeholder="Enter your Contact number"
                        value={details.mobile}
                        onChange={handleChange}
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
                        name="password"
                        placeholder="Enter your password"
                        value={details.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter your password"
                        value={details.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                       {err !== "" && (
    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-2 mt-2" role="alert">
        <p className="text-s">{err}</p>
    </div>
)}
                    </div>
                    <button
                      className="bg-emerald-500 my-5 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 block w-full"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Signup
                    </button>
                    {/* {err !== "" && <div>{err}</div>} */}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{seterr(''); setShowModal(false)}}
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
