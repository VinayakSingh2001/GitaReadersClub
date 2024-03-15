import React,{useState, useEffect} from "react";
import PageMenu from "../../components/PageMenu";
import Wrapper from "../../components/Wrapper";
import { getDatabase,ref,get } from "firebase/database";
import { app,auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const UserCourse = () => {

const [encourse, setEnCourse] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isloading,setisloading] = useState(true);
const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase(app);
        const dbRef = ref(db, `EnrolledCourse/${user.uid}`);
        try {
          const snapshot = await get(dbRef);
          const val = snapshot.val();
          if (val) {
            const crs = Object.keys(val);
            setEnCourse(crs);
          }
        } catch (error) {
          console.log(error.message);
        } finally{
          setisloading(false);
        }
      } else {
        alert('Login first');
      }
    };

    const getData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'Courses');
      try {
        const snapshot = await get(dbRef);
        const val = snapshot.val();
        setCourse(val);
      } catch (error) {
        console.log(error.message);
      }
    };

    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    getData();

    return () => unsubscribe();
  }, []);


  return (
    <div>
      
      <PageMenu />
      {isloading?(<div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
          <p className="text-gray-700">Loading...</p>
        </div>):
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14 px-5 md:px-0">
          {encourse.map((item, index) => (
            <div
              
              key={index}
              className="transform overflow-hidden bg-white duration-200 border hover:scale-105 cursor-pointer"
              onClick={()=>{
                alert(item);
                localStorage.setItem("CourseId",item)
                Navigate("/courseDetails");
              }}
            >
              <img className="w-full" src={course[item].img} alt="Product Image" />
              <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg text-center font-semibold">
                  {course[item].title}
                </h2>
                <div className="flex item-center text-black/[0.5]">
                  <p className="mr-2 text-lg  font-medium">{course[item].shortdesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
}
    </div>
  );
          
};

export default UserCourse;