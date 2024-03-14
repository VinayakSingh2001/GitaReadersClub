import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const nav = useNavigate();
  const handleLogout = async () => {
    setShowConfirmation(false); // Close the confirmation modal
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      nav("/");
      toast.success('Successfully logged out!!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred while logging out');
    }
  };

  return (
    <div>
      <button
        className="bg-pink-500 text-white mx-3 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowConfirmation(true)}
      >
        Logout
      </button>

      {showConfirmation && (
        <>
                   <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                
                                <div className="flex justify-center items-center">
                                    <form method="POST" className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8 font semi-bold">
                                        <div className="mb-1">
                                            Do you really want to logout??
                                        </div>
                                        
                                    </form>
                                    
                                </div>
                                {/* <div className='flex items-center'></div> */}
                                
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b mt-2">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={handleLogout}
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
    </div>
  );
};

export default Logout;
