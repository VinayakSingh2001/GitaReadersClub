import React, { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-zinc-300 text-white flex justify-center items-center">
      <div className="bg-black-lighter p-5 flex flex-wrap justify-between max-w-screen-lg w-full shadow-lg">
        <div className="bg-slate-50 p-5 rounded-lg shadow-md flex flex-col items-center justify-center w-full md:w-[30%] h-[70%] md:m-[3.5%]">
          <div className="mb-4 flex flex-col place-items-center">
            <img
              src={profileImage}
              alt="profile image"
              className="rounded-full"
            />
            {isEditing && (
              <div className="mt-2">
                <input className="" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            )}
          </div>
          <div className="text-lg font-semibold">Profile</div>
          {isEditing ? (
            <div className="flex justify-center">
              <button onClick={handleEditToggle} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
        <div className="bg-black-light p-5 rounded-lg shadow-md w-full md:w-[60%]">
          <div className="mb-4 text-lg font-semibold">
            <label className="mr-2">Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
            {isEditing ? <input className="text-black-darker" type="text" defaultValue="John Doe" /> : "John Doe"}
          </div>
          <div className="mb-4 text-lg font-semibold">
            <label className="mr-2">DOB:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            {isEditing ? <input className="text-black-darker" type="text" defaultValue="01/01/1990" /> : "01/01/1990"}
          </div>
          <div className="mb-4 text-lg font-semibold">
            <label className="mr-2">Gender:&nbsp;&nbsp;</label>
            {isEditing ? <input className="text-black-darker" type="text" defaultValue="Male" /> : "Male"}
          </div>
          <h4 className="mb-4 text-lg font-semibold">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;john@example.com</h4>
          <div className="mb-4 text-lg font-semibold">
            <label className="mr-2">Member:</label>
            {isEditing ? <input className="text-black-darker" type="text" defaultValue="Premium" /> : "Premium"}
          </div>
          <div className="mb-4 text-lg font-semibold">
            <label className="mr-2">Courses:&nbsp;</label>
            {isEditing ? <input className="text-black-darker" type="text" defaultValue="5" /> : "5"}
          </div>
        </div>
      </div>
    </div>
  );
}
