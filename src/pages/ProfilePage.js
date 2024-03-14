import React, { useState } from "react";
import profileImg from "../assets/avatarr.png";
import PageMenu from "../components/PageMenu";
import Wrapper from "../components/Wrapper";
import { useEffect } from "react";
import { auth,app } from "../firebase.config";
import { getDatabase,ref,get } from "firebase/database";
const initialState = {
  name: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  role: "",
  isVarified: false,
};

const Profile = () => {
  const [profile, setProfile] = useState(initialState);

  const handleImageChange = () => {};
  const handleInputChange = () => {};
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
                  <div>
                    <img src={profileImg} alt="Profileimg" />
                    
                  </div>
                </div>
                <Wrapper className="flex flex-col md:flex-row gap-[50px] md:gap-0 items-center justify-evenly md:items-start">
                  <form className="gap-6  rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex flex-col gap-4 md:flex-row md:gap-5">
                      <div className="mb-4">
                        <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name: {data.name || ""}
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email: {data.email || ""}
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-blue text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone Number : {data.mobile || ""}
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          name="mobile"
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        className="block text-blue text-sm font-bold mb-2"
                        htmlFor="message"
                      >
                        Bio
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        name="message"
                        placeholder="Bio"
                        rows="5"
                        required
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update Profile
                      </button>
                    </div>
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