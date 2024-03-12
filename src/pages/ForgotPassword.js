import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {auth,app} from '../firebase.config';
import { ToastContainer,toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    
    const history = useNavigate();
const handleChange = (e)=>{
      setEmail(e.target.value);
}
    const handleSubmit =  (e) => {
       e.preventDefault();

        // const emailVal = e.target.value;
        const database = getDatabase(app);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent successfully");
                history("/");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.code);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-md p-8 bg-white border rounded shadow-md">
                <h1 className="text-4xl font-semibold mb-8 text-center text-blue-500">
                    Forgot Password
                </h1>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Email:
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={email}
                            required
                            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Your Email"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                    onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default ForgotPassword;