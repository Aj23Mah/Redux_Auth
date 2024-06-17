import UserProfile from "./UserProfile";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import Avatar from "./Avatar";
import logo from '../assets/images/logo.png'

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleLogOut = () => {
    dispatch(logout())
    navigate("/login")
    localStorage.clear()
  }

  return (
    <div className="flex h-screen w-full">
      {/* side bar */}
      <div className="h-full w-28 flex flex-col justify-between items-center py-8 bg-gray-300 rounded-r-xl">
        
        <div className="text-3xl mb-4">
          <img src={logo} alt="logo" title="logo" />
        </div>

        <div className="flex flex-col gap-4">
          <div title={user?.name} onClick={toggleProfile} className="p-2 cursor-pointer lg:text-4xl md:text-3xl text-xl">
            
            <Avatar
              name={user?.name}
              profile_pic={`http://localhost:3333/uploads/${user?.profile_pic}`}
              // profile_pic={user?.profile_pic}
              // userId={user?._id}
            />
          </div>
          <button title="logout" onClick={handleLogOut} className="p-2 pl-4 cursor-pointer lg:text-4xl md:text-3xl text-xl">
            <BiLogOut />
          </button>
        </div>

        {isProfileOpen && (
          <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-gray-400 bg-opacity-50">
            <div className="relative">
              <button title="close" onClick={toggleProfile} className="absolute top-2 right-2 bg-white p-1 rounded-full font-bold text-md">
                ✕
              </button>
              <UserProfile />
            </div>
          </div>
        )}

      </div>

      {/* details */}
      <div className="w-full h-full bg-white grid place-items-center">
        <h2 className="text-4xl font-semibold">Hello, this is an Redux Authentication</h2>
      </div>
    </div>
  );
};

export default Sidebar;
