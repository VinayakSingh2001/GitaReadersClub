import React from 'react'

const Logout = () => {
    const handleLogout = () => {
        localStorage.clear();
    }
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
