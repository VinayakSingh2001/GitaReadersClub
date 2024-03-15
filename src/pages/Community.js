import React, { useState, useEffect } from 'react';
import { app } from '../firebase.config';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo22@3x-8.png';
import { toast } from 'react-toastify';

export default function Community() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // const [currentTime, setCurrentTime] = useState("");

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, 'community/message');
        const snapshot = await get(dbRef);
        // alert("try")
        console.log(snapshot.exists())
        if (snapshot.exists()) {
          // alert("snapshot exist")
          setPosts(Object.values(snapshot.val()).reverse()); // Reverse the order of posts
          console.log("snapshot existed")
        } else {
          // toast.success("No data available")
          console.log("no data");
        }
      }
       catch (error) {
        toast.error("Error fetching data");
      } 
      finally {
        // alert("finally");
        console.log("done")
        setLoading(false);
       
      }
    };

    return () => fetchData();
    
  }, []); // empty dependency array to run the effect only once when the component mounts

  return (
     <div className="bg-blue-200">
        <div className="max-w-5xl mx-auto py-8  rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h1 className="text-gray-1000 text-3xl font-bold mb-6">Notifications</h1>

      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className=" w-full py-4">
        <ul className="space-y-4">
          
          {posts.map((item, index) => (
            <li key={index} className="bg-white rounded-lg p-6 w-full relative shadow-md">
              <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" className="h-[40px] md:h-[50px] mr-4 rounded-full" />

                <span className="text-lg font-semibold max-w-full break-all">{item.message}</span>
              </div>
              <p className="text-sm text-gray-500 absolute bottom-2 right-2">{item.time}</p>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
     </div>
  );
}
