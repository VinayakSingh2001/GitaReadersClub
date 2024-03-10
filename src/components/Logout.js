import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  // const navigate = useNavigate();
 
    const handleLogout = async() => {
      if(!window.confirm("are you sure think twice")){
        return ;
      }
        await signOut(auth);
       
        localStorage.removeItem('authToken');
        
    }
    // useEffect(()=>{
    //   const unsubscribe = auth.onAuthStateChanged(user => {
    //     // console.log(user);
    //     console.log(user);
    // });
    // return unsubscribe; // Cleanup function
    // },[]);
  return (
    <div>
        <button
        className="bg-pink-500 text-white mx-3  font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
      
    </div>
  )
}

export default Logout
