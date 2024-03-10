import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { app, auth } from '../firebase.config';
import { getDatabase,ref,set,get } from 'firebase/database';

function Memberform() {
    const [answer, setAnswer] = useState('');
    const [showModal,setShowModal]=useState(false);
    const [err,seterr]=useState("");

    const [details,setDetails] = useState({
        name:"",
        regNo:"",
        email:"",
        contact:"",
        hostel:"",
        reason:"",
        experience:"",
        hobbies:""
    });
    const handleChange = async(e)=>{
        setDetails({...details,[e.target.name] : e.target.value})
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (!details.name || !details.regNo || !details.hostel || !details.contact ) {
            seterr("All fields are required");
            return;
        }
        const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
        if (!details.email.match(emailRegex)) {
            seterr("Please enter a valid email address");
            return;
        }
    
        // Validation for mobile number format
        const mobileRegex = /^\d{10}$/;
        if (!details.contact.match(mobileRegex)) {
            seterr("Please enter a valid 10-digit mobile number");

            return;
        }
        const user = auth.currentUser;
        const db = getDatabase(app);
        const memberRef = ref(db,`member/${user.uid}`);
        console.log(user.uid.name);
        const snapshot = await get(memberRef);
        if(snapshot.exists()) alert("You have already filled out the form. Please wait for feedback.");
        else{
            set(ref(db,`member/${user.uid}`),{
                name:details.name,
                regNo:details.regNo,
                email:details.email,
                contact:details.contact,
                experience:details.experience,
                reason:details.reason,
                hostel:details.hostel,
                hobbies:details.hobbies
            });
        alert("Answer Stored");
        

        }
        setDetails({
            name:"",
           regNo:"",
           email:"",
           contact:"",
           hostel:"",
           reason:"",
           experience:""
   
           });
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
                                                Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value = {details.name}
                                                onChange={handleChange}                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Reg. No
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Reg. No"
                                                name = "regNo"
                                                value = {details.regNo}
                                                onChange={handleChange}                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Email
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Email"
                                                name = "email"
                                                value = {details.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Contact
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Contact"
                                                name="contact"
                                                value = {details.contact}
                                                onChange={handleChange}
                                                required
                                            />
                                            
                                            {/* <hr /> */}
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Why do you want to join this club<a href="/team" target="_blank"> know about courses</a>
                                                
                                            </label>
                                            
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Your Answer"
                                                name = "reason"
                                                value = {details.reason}
                                                onChange={handleChange}                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                mention you special talents dropdown
                                            </label>
                                            <select onChange={handleChange} name = "hobbies" value = {details.hobbies}>
                                                <option value="selet any....">select any.....</option>
                                                <option value ="Music/Instrumental">Music/Instumental</option>
                                                <option value = "Dramatics">Dramatics</option>
                                                <option value = "Literary skills">Literary skills</option>
                                                <option value = "Orations">Oration</option>
                                                <option value = "Dance">Dance</option>
                                                <option value = "Designing">Designing </option>
                                                <option value = "Technical Team(Development)">Technical Team(Development)</option>

                                                <option value = "Management/leadership skills">Management/leadership skills</option>
                                            </select>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Any previous/current experience in any club or in organisation(if any mention role/give details)
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
                                                id="answer"
                                                type="text"
                                                placeholder="Your Answer"
                                                name = "experience"
                                                value = {details.experience}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
                                                Hostel Name
                                            </label>
                                            <select onChange={handleChange} name = "hostel" value={details.hostel}>
                                                <option >select any.....</option>
                                                <option>Tondon</option>
                                                <option>Malivya</option>
                                                <option>Patel</option>
                                                <option>Tilak</option>
                                                <option >Svbh</option>
                                                <option>Raman</option>
                                                <option>New Boys Hostel</option>
                                                <option >others</option>
                                            </select>
                                            
                                             
                                        </div>
                                        {err !== "" && <div>{err}</div>}
                                    </form>
                                    
                                </div>
                                {/* <div className='flex items-center'></div> */}
                                
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-2">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setDetails({
                                                name:"",
                                               regNo:"",
                                               email:"",
                                               contact:"",
                                               hostel:"",
                                               reason:"",
                                               experience:""
                                       
                                               });
                                            setShowModal(false)}}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={handleSubmit}
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