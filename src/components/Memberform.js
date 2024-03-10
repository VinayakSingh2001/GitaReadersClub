import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { app, auth } from '../firebase.config';
import { getDatabase,ref,set,get } from 'firebase/database';
import { toast } from 'react-toastify';

function Memberform() {
    const [answer, setAnswer] = useState('');
    const [showModal,setShowModal]=useState(false);
    const [err,seterr]=useState("");
    const addMember=async(e)=>{

        if(answer.trim().length <30){
            toast.error("atleast 30 characters!!");
            return;
        }
        e.preventDefault();
        const user = auth.currentUser;
        const db =getDatabase(app);
        const memberRef = ref(db,`member/${user.uid}`);
        console.log(user.uid.name);
        const snapshot = await get(memberRef);
        if(snapshot.exists()) alert("You have already filled out the form. Please wait for feedback.");
        else{
            set(ref(db,`member/${user.uid}`),{
                answer:answer,
                status:false
            });
        toast.success("We got your answer!!!");
        }
        setShowModal(false);
    }
    const nav =useNavigate();
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
            
            toast.error("You are not logged in !!");
            // nav('/login');
        }
    };
  return (
    <>
   <button className="border bg-[#F9F0ED] rounded-lg py-5 px-10 transition-transform shadow-sm hover:scale-105 cursor-pointer" onClick={handleJoinButtonClick}>
            Join as a member
          </button>
            {showModal && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center text-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-center justify-center">Member Application</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <form method="POST" className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8">
                                        <div className="mb-1">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                How can you serve as a member?
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Your Answer"
                                                onChange={(e) => setAnswer(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {err !== "" && <div>{err}</div>}
                                    </form>
                                    
                                </div>
                                {/* <div className='flex items-center'></div> */}
                                
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-2">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={addMember}
                                    >
                                        Submit
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

export default Memberform