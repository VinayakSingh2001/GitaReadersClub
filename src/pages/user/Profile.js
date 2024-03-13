import React, { useState } from "react";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/PageMenu";
import Wrapper from "../../components/Wrapper";
import { useEffect } from "react";
import { auth,app } from "../../firebase.config";
import { getDatabase,getAuth,ref,get,set, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import Logout from "../../components/Logout";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    //email: "",
    mobile: "",
    message: "",
    image: "",
  });
  const [err,seterr] = useState("");
  
  
  // const [isEditing, setIsEditing] = useState(false);
  // const [profileImage, setProfileImage] = useState(
  //   "https://via.placeholder.com/150"
  // );

  // const handleEditToggle = () => {
  //   setIsEditing(!isEditing);
  // };

  // const handleCancelEdit = () => {
  //   setIsEditing(false);
  // };

  // const handleImageChange = (event) => {
  //   setProfileImage(URL.createObjectURL(event.target.files[0]));
  // };
  // const handleChange = () => {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data,setData]=useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (event) => {
    const imageData = event.target.result; // Base64 string of the image data

    const db = getDatabase();
    
    const uid = auth.currentUser.uid;

    try {
      // Store the image data in the Realtime Database under the user's node
      await set(ref(db, `user/${uid}/image`), imageData);
      console.log('Image data stored successfully');
    } catch (error) {
      console.error('Error storing image data:', error);
    }
  };

  if (file) {
    reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
  }

  };

  const handleChange = async(e)=>{
    setProfile({...profile, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (
      !profile.name ||
      !profile.mobile ||
      !profile.message
    ) {
      // seterr("All fields are required");
      toast.error("all field requiered");
      return;
    }
    console.log("i am out");
    const user = auth.currentUser;
    const db = getDatabase(app);
    const userRef = ref(db, `user/${user.uid}`);
    console.log("database connected");
    
    try {
      await update(userRef, profile); // Update user profile in database
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  // }
  setProfile({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });
  setIsEditing(false);
  }
  useEffect(() => {
    // Authentication state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        fetchData(user.uid); // Fetch user data
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    // Cleanup function
    return () => {setData('');unsubscribe();};
  }, []);

  const fetchData = async (userId) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `user/${userId}`);
    try {
      const snapshot = await get(dbRef);
      const val = snapshot.val();

      Object.keys(val).forEach(key => {
        if (val[key] === null || val[key] === undefined) {
          val[key] = '';
        }
      });
      
      if(val && val.image){
        console.log(val.image);
        setProfileImage(val.image);
      }
      
      setData(val);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className="pb-12">
      <PageMenu />
      <Wrapper>
        <section>
          <div className="container border flex justify-center">
            <div className="--flex-start profile">
              <div>
                <div className="profile-photo flex justify-center pt-10">
                  <div className="w-60 h-60 rounded-full overflow-hidden flex justify-center items-center rounded-full">
                    <img src={profileImage} alt="Profileimg" className="w-full h-full object-cover" />

                    

                  </div>
                  
                </div>
                <div className="flex justify-center items-center">
                {isEditing ? (
            <div className="flex justify-center mt-2">
              <button onClick={handleCancelEdit} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
              <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEditToggle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          )}
                  
                </div>
                <div className="flex justify-center items-center mt-2 ml-auto mr-auto">
                {isEditing && (
              <div className="mt-2">
                <input className=" flex justify-center items-center bg-blue-500" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            )}
                </div>
                
                <Wrapper className="flex flex-col md:flex-row gap-[50px] md:gap-0 items-center justify-evenly md:items-start">
                  <form className="gap-6  rounded px-8 pt-6 pb-8 mb-4" method="POST">
                    <div className=" gap-4 md:flex-row md:gap-5">
                      <div className="mb-4">
                        {!isEditing? <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name {data.name}
                        </label>:<label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>}
                        {isEditing?<input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          defaultValue={data.name}
                          value={profile.name}
                          onChange={handleChange}
                          required
                        />:""}
                      </div>
                      {/* <div className="mb-4">
                        {!isEditing ? <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email {data.email}
                        </label>: <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>}
                        {isEditing?<input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          defaultValue={data.email}
                          onChange={handleChange}
                          required
                        />:""}
                      </div> */}
                      <div className="mb-4">
                       {!isEditing? <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone Number {data.mobile}
                        </label>: <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="mobile"
                        >
                          Phone Number
                        </label>} 
                        {isEditing?<input
                          className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="mobile"
                          name="mobile"
                          type="text"
                          placeholder="Enter your phone number"
                          defaultValue={data.mobile}
                          onChange={handleChange}
                          required
                        />:""}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        className="block text-blue text-sm font-bold mb-2"
                        htmlFor="message"
                      >
                        Bio
                      </label>
                      {isEditing?<textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        placeholder="Bio"
                        rows="5"
                        value={profile.message}
                        onChange={handleChange}
                        required
                      ></textarea>:""}
                    </div>

                    <div className="flex items-center justify-between">
                      {isEditing?<button
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Update Profile
                      </button>:""}
                    </div>
                    {!isEditing?<div className="flex justify-center items-center">
            <Logout/>
                    </div>:null}
                  </form>
                  

                  {/* LEFT END */}

                  {/* RIGHT START */}
                </Wrapper>
                {/* <form className="py-5">
                  <p className="">
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>
                  <p>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>
                  <p>
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Bio:</label>
                    <textarea
                      name="bio"
                      value={profile?.bio}
                      onChange={handleInputChange}
                      cols="30"
                      rows="10"
                    ></textarea>
                  </p>
                  <button className="bg-blue-500">Update Profile</button>
                </form> */}
              </div>
            </div>
            
            
          </div>
          
        </section>
        
      </Wrapper>
    </div>
  );
};

export default Profile;