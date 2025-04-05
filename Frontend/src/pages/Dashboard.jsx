import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider.jsx';

const Dashboard = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {category, subCategory}= useParams();

  const handleClick = () => {
    navigate(-1);
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("https://incrobytes-assignment.onrender.com/auth/user/logout", {
        method: "POST",
        credentials: "include", 
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAuth({ isAuthenticated: false, user: null });
        navigate("/auth");
      } else {
        console.error("Logout failed:", json.message || "Unknown error");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  return (
    <div className="flex flex-col min-h-screen relative pb-6">
      {/* Navbar */}
      <nav className="w-full px-16 py-5 bg-blue-600 text-white  flex justify-between items-center fixed top-0 z-40 ">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-x-10 hidden sm:flex ">
          <a className="hover:underline">Home</a>
          <a  className="hover:underline">About</a>
          <a  className="hover:underline">Contact</a>
          <div  className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</div>
        </div>
        
      </nav>
      <div className='mt-16 '>

        {category || subCategory ? <div className='text-blue-400 font-medium px-2 py-1 rounded ml-12 mt-3  w-fit cursor-pointer border-2 border-gray-200' onClick={handleClick}>
          Back
        </div> : <div className='text-blue-400 font-medium p-5  rounded ml-12'></div>}
        <Outlet />
      </div>
    </div>
  )

};

export default Dashboard;