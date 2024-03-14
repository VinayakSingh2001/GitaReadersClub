import React from 'react'
import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { app, auth } from '../firebase.config';
import { getDatabase,ref,set,get } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';

function Payment() {
    const [answer, setAnswer] = useState({
        name: "",
        email: "",
        mobile: "",
        amount: ""
    });
    const [err,seterr]=useState('');
    const handleChange = (e) => {
        setAnswer({ ...answer, [e.target.name]: e.target.value });
      };
    const [showModal,setShowModal]=useState(false);
  
    const addCourse=async(e)=>{
        e.preventDefault();
            // Check if any field is empty
    if (!answer.name || !answer.email || !answer.mobile ) {
        seterr("All fields are required");
        return;
    }
    const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
    if (!answer.email.match(emailRegex)) {
        seterr("Please enter a valid email address");
        return;
    }

    // Validation for mobile number format
    const mobileRegex = /^\d{10}$/;
    if (!answer.mobile.match(mobileRegex)) {
        seterr("Please enter a valid 10-digit mobile number");
        return;
    }


        
        const user = auth.currentUser;
        const db =getDatabase(app);
        const memberRef = ref(db,`Donors/${user.uid}`);
        console.log(user.uid.name);
        const snapshot = await get(memberRef);
        
            set(ref(db,`Donors/${user.uid}`),{
                name:answer.name,
                email:answer.email,
                mobile:answer.mobile,
                date: new Date().toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )
            });
        
        
            var options = {
      key: "rzp_test_F93o7BvEaB2Rp5",
      key_secret: "ogwOhP9aMjkpbHDqhZnopiqP",
      amount: parseInt(answer.amount * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' +answer.name,
      name: "Gita Readers Club",
      description: "for donation purpose",
      handler: function (response) {
        // console.log(response)
        toast.success('Payment Successful')
        const paymentId = response.razorpay_payment_id
        // store in firebase 
        
      },

      theme: {
        color: "#3399cc"
      }


    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
        setAnswer({
            name: "",
            email: "",
            
            mobile: "",
            
        });
        seterr("");
        setShowModal(false);
    }
    // const nav =useNavigate();
    useEffect(() => {
        if (showModal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [showModal]);

      const handleJoinButtonClick = () => {
        if (localStorage.getItem('authToken')) {
            setShowModal(true);
        } else {
            toast.error('You need to login first!!!');
            // nav('/login');
        }
    };
    

  return (
    <>
   
          <button type="button" class="text-white bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg 
          dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={handleJoinButtonClick} >DONATE</button>

            {showModal && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center justify-center">Thank You</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <form method="POST" className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8">
                                        <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Enter your name"
                                                name='name'
                                                value={answer.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Email
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Enter email address"
                                                name='email'
                                                value={answer.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Contact
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                name='mobile'
                                                placeholder="Enter you mobile number"
                                                value={answer.mobile}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Amount
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                name='amount'
                                                placeholder="Enter you mobile number"
                                                value={answer.amount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        
                                        {/* <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Hostel
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Your Answer"
                                                value={answer.hostel}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div> */}
                                                                                 {/* {err !== "" && <div>{err}</div>} */}
                                        {err !== "" && (
    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-2 mt-2" role="alert">
        
        <p className="text-s">{err}</p>
    </div>
)}
                                    </form>
                                    
                                </div>
                                {/* <div className='flex items-center'></div> */}
                                
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-2">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            seterr('');setAnswer({
                                            name: "",
                                            email: "",
                                            regno: "",
                                            mobile: "",
                                            hostel:"",
                                            previousexp:""
                                        }); 
                                        setShowModal(false)}}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={addCourse}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
     </>
  )
}

export default Payment;