import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'
// import profile from '../../../Images/'
import profileimage from "../../../Images/profile image.png"
import { MdAccountCircle } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { MdChat } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { MdBrightnessAuto } from "react-icons/md";
import { BiSolidHelpCircle } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { TbLogout } from "react-icons/tb";




function Settings({setTabs}) {
  return (
    <div>
       <h1 className='text-2xl font-bold'>Settings</h1>
       <div>
        <button className='text-gray-600 text-2xl relative top-9 left-3 '>
            {/* <IoMdSearch/> */}
            <MdOutlineSearch className='text-xl'/>
        </button>
        <input 
        type="text" 
        placeholder='Search'
        className='w-full bg-slate-200 p-1 pl-14 rounded-md'
        />
      </div>
      <div className='flex items-center cursor-pointer' onClick={()=>setTabs('profile')}>
        <div className='w-28 h-28'>
            <img src={profileimage} alt="" />
        </div>
        <div>
            <h1>User Full Name</h1>
            <p className='text-sm text-gray-500'>Hey there! i am using WhatsApp.</p>
        </div>
      </div>

      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <MdAccountCircle className='text-2xl text-gray-600 '/>
        </span>
        <h2 className='ml-7 '>Account</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <IoMdLock className='text-2xl text-gray-600'/>
        </span>
        <h2 className='ml-7 '>Privacy</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <MdChat className='text-2xl text-gray-600'/>
        </span>
        <h2 className='ml-7 '>Chats</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <MdNotifications className='text-2xl text-gray-600'/>
        </span>
        <h2 className='ml-7 '>Notifications</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <MdBrightnessAuto className='text-2xl text-gray-600'/>
        </span>
        <h2 className='ml-7 '>Keyboard shortcuts</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <BiSolidHelpCircle className='text-2xl text-gray-600'/>
        </span>
        <h2 className='ml-7 '>Help</h2>
      </div>
      <div className='flex items-center p-4 hover:bg-slate-200 border-b-2'>
        <span >
            <TbLogout className='text-2xl text-red-500 '/>
        </span>
        <h2 className='ml-7 text-xl text-red-500 font-thin '>Log out</h2>
      </div>
      
    </div>
  )
}

export default Settings
