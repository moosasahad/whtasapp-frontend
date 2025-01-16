import React, { useContext } from 'react'
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
import { usercontext } from '../../Component/Usercontext';
import { Product } from '../../Component/Productcontext';
import { axiosPrivate } from '../../../Axiosinstens';





function Settings({setTabs}) {
    const {state}= useContext(usercontext)
    const {settabs,setlogin}= useContext(Product)

    const logoutfunction =async ()=>{
      
       try{
            const res = await axiosPrivate.post("/logout")
            setlogin(true)
            settabs('page-1')
            localStorage.removeItem("user")
            // console.log("logout res",res.data)
            toast.warning("logout", {
              style: {
                  width: "150px",
                  height: "10px",
                 
                },
            });
           }catch(error){
            console.log("logut error",error)
           }
    }


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
      <div className="w-24 h-24 rounded-full overflow-hidden m-3">
    <img
      className="w-full h-full object-cover"
      src={state ? state?.profileimage : profileimage}
      alt="Profile"
    />
  </div>
        <div>
            <h1>{state?.name}</h1>
            <p className='text-sm text-gray-500'>{state.about}</p>
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
        <h2 className='ml-7 text-xl text-red-500 font-thin cursor-pointer'onClick={logoutfunction}>Log out</h2>
      </div>
      
    </div>
  )
}

export default Settings
