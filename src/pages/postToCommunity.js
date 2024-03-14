import React, { useState } from 'react';
import { app } from '../firebase.config';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function postToCommunity() {
  // const navigate = useNavigate();

  let [inputValue1, setInputValue1] = useState('');

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, 'community/message'));
    const currentTime = new Date().toLocaleString(); // Get current time
    set(newDocRef, {
      message: inputValue1,
      time: currentTime // Store current time in database
    })
      .then(() => {
        alert('Data saved');
      })
      .catch((error) => {
        alert('Error:', error.message);
      });
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-8 text-center">Share your thoughts</h1>
        <textarea
          className="w-full p-3 border rounded mb-6"
          rows="6"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
          placeholder="Enter your message here"
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            onClick={saveData}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}



// import React,{useState} from 'react';
// import {app} from "../firebaseConfig";
// import {getDatabase,ref,set,push} from "firebase/database"
// import { useNavigate } from 'react-router-dom';

// export default function Write() {
    
//      const navigate = useNavigate();
    

//     let [inputValue1,setInputValue1] = useState("");
//     let [inputValue2,setInputValue2] = useState("");

//     const saveData = async ()=>{
//         const db = getDatabase(app);
//         const newDocRef = push(ref(db,"nature/fruits"));
//         set(newDocRef,{
//             fruitName : inputValue1,
//             fruitDefination : inputValue2
//         }).then(()=>{
//             alert("data saved");
//         }).catch((error)=>{
//             alert("error:",error.message)
//         })
//     }
//   return (
//     <div className="bg-slate-500">
//        <h1>WRITE/HOMEPAGE</h1>
//       <input className="bg-yellow-300" type="text" value={inputValue1}
//       onChange={(e)=>{setInputValue1(e.target.value)}}/>
//       <input className="bg-yellow-300" type="text" value={inputValue2}
//       onChange={(e)=>{setInputValue2(e.target.value)}}/><br/>

//       <button onClick={saveData}>Save Data</button>
//       <br/>
//       <br />
//       <br />
//       <button className="button1" onClick={()=> navigate("/")}>Go Update Read</button><br/>
//       <button className="button1" onClick={()=> navigate("/read")}>Go READ PAGE</button>
//     </div>
//   )
// }
 