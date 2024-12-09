import React from 'react'
import { MdOutlineMessage } from "react-icons/md";
import Statusicon from '../../Images/Statusicon.png'
import { LuMessageCircleMore } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi2";
import metai from "../../Images/metai.png"
import { IoSettingsOutline } from "react-icons/io5";
import profileimage from "../../Images/profile image.png";





function Sidebar() {
  return (
    <div className="w-16 h-screen bg-slate-400 flex flex-col justify-between items-center py-4">
  {/* Top Section */}
  <div className="flex flex-col items-center gap-4">
    <button className="text-xl hover:text-white">
      <MdOutlineMessage />
    </button>
    <button className="text-xl hover:text-white">
      <img src={Statusicon} alt="status icon" className="w-6 h-6" />
    </button>
    <button className="text-xl hover:text-white">
      <LuMessageCircleMore />
    </button>
    <button className="text-xl hover:text-white">
      <HiOutlineUserGroup />
    </button>
    <button className="text-xl hover:text-white">
      <img src={metai} alt="meta ai icon" className="w-6 h-6" />
    </button>
  </div>

  {/* Bottom Section */}
  <div className="flex flex-col items-center gap-4">
    <button className="text-xl hover:text-white">
      <IoSettingsOutline />
    </button>
    <button className="w-8 h-8 rounded-full overflow-hidden">
      <img src={profileimage} alt="profile image" className="w-full h-full object-cover" />
    </button>
  </div>
</div>

  )
}

export default Sidebar
