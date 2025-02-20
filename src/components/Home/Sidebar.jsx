import React, { useContext } from "react";
import { MdOutlineMessage } from "react-icons/md";
import Statusicon from "../../Images/status-2.svg";
import { LuMessageCircleMore } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi2";
import metai from "../../Images/metai.png";
import { IoSettingsOutline } from "react-icons/io5";
import profileimage from "../../Images/profile image.png";
import { Product } from "../Component/Productcontext";
import { usercontext } from "../Component/Usercontext";

function Sidebar({setTabs}) {
  const {setusesrid} = useContext(Product)
  const {state} = useContext(usercontext)
  return (
    <div className="w-16 h-screen flex flex-col justify-between items-center py-4 bg-slate-100">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-2 ">
        <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setTabs("Chat")}
        >
          <MdOutlineMessage className="text-2xl text-gray-700" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-linear pointer-events-none">
            chat
          </span>
        </button>

        <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setTabs("Status")}
        >
          <img src={Statusicon} alt="status icon" className="w-6 h-6" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-linear pointer-events-none">
            Status
          </span>
        </button>
        <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setTabs("Channels")}
        
        >
          <LuMessageCircleMore className="text-2xl text-gray-700" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out pointer-events-none">
            Groups
          </span>
        </button>
        <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setTabs("Communities")}
        >
          <HiOutlineUserGroup className="text-2xl  text-gray-700" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out pointer-events-none">
            Communities
          </span>
        </button>
        <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setusesrid({page:"Meta"})}
        >
          <img src={metai} alt="meta ai icon" className="w-6 h-6" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out pointer-events-none">
            Meta Ai
          </span>
        </button>
      </div>

      {/* Bottom Section */}
      
      <div className="flex flex-col items-center gap-4">
      <button className="w-10 h-10 flex justify-center items-center rounded-full relative focus:bg-gray-300 group"
        onClick={()=>setTabs("settings")}
        >
           <IoSettingsOutline className="text-2xl text-gray-700" />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-linear pointer-events-none">
            Settings
          </span>
        </button>
        <button className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden relative focus:bg-gray-300 group"
        onClick={()=>setTabs("profile")}
        >
          <img
            src={state?state?.profileimage:profileimage}
            alt="profile image"
            className="w-full h-full object-cover"
          />
          <span className="absolute text-sm font-extralight pt-1 pb-1 bg-slate-800 text-white left-12 rounded-xl pl-4 pr-4 text-center opacity-0 group-hover:opacity-100 transition duration-300 ease-linear pointer-events-none">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
