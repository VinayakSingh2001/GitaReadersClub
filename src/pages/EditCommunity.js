import React, { useState, useEffect } from 'react';
import { app,auth } from '../firebase.config';
import { getDatabase, ref, get,remove } from 'firebase/database';
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
          const dbRef = ref(db, 'community');
          const snapshot = await get(dbRef);
          let vec = [];
         console.log(snapshot.val())
           if(snapshot.exists()){
            console.log(snapshot.val());
            for(let key in snapshot.val()){
              console.log(snapshot.val()[key]);
              vec.push({
                id:key,
                message:snapshot.val()[key].message,
                time:snapshot.val()[key].time
              })
            }
            setPosts(vec.reverse());
           }
        }
         catch (error) {
          // console.error('Error fetching data:', error);
          // alert('Error fetching data');
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      return ()=>fetchData();
      
  }, []); // empty dependency array to run the effect only once when the component mounts

const handleDelete = async (index) => {
   console.log(index);
   const db = getDatabase(app);
   const dbRef = ref(db,`community/${index}`);
   try {
    await remove(dbRef).then(()=>{
        toast.success("Data removed Successfully");
        navigate("/PostToCommunity");
    })
    .catch((error)=>{
        toast.error(error.message);
    })
   } catch (error) {
       toast.error(error.message);
   }
  };
  
  

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
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-[40px] md:h-[50px] mr-4 rounded-full" />
        <span className="text-lg font-semibold max-w-full break-all">{item.message}</span>
      </div>
      <div className="flex">
        {/* <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button> */}
        <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
      </div>
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
