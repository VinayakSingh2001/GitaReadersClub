import React, { useState } from 'react';
import { app } from '../firebase.config';
import { getDatabase, ref, set,get, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostToCommunity() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/EditCommunity");
  }
  const [val,setVal] = useState(0);

  let [inputValue1, setInputValue1] = useState('');

  const saveData = async () => {
    if (inputValue1 === "") {
      toast.error("Write Somethingpost to ");
      return;
    }
    const db = getDatabase(app);
  
    // Reference to the 'community' node
   
  
    try {
      const newDocRef = push(ref(db, "community"));
      const currentTime = new Date().toLocaleString(); // Get current time
      set(newDocRef, {
        message: inputValue1.trim(),
        time: currentTime // Store current time in database
      })
        .then(() => {
          toast.success("Data Saved");
          setInputValue1("");
        })
        .catch((error) => {
          toast.error(error.message);
        });
  
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  
  return (
    <div className="flex justify-center items-center  h-screen px-20 bg-gray-200">
      <div className="bg-white  px-20 py-12 rounded shadow-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Write Post</h1>
        <textarea
          className="w-full p-3 border rounded mb-8"
          rows="6"
         
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
          placeholder="Enter your message here"
        ></textarea>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            onClick={saveData}
          >
            Post
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            href='/registerPage' onClick={()=>{handleClick()}}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
