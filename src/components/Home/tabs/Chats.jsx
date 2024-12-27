import React, { useContext, useState } from 'react'
import { BiMessageAdd } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineSearch } from 'react-icons/md';
import { Product } from '../../Component/Productcontext';
import { useEffect } from 'react';
import profile from '../../../Images/profile image.png'
import { contactcontext } from '../../Component/Contact';

function Chats({setTabs}) {
    const [dorpdown,setDropdown]=useState(false)
    const {state,setusesrid,setlogin,login,settabs} = useContext(Product)
    const {state:contacts} = useContext(contactcontext)
    console.log("contacts==============contacts",contacts)
    const logutfunction = ()=>{
      setlogin(true)
      settabs('page-1')
      localStorage.removeItem("user")
    }
    console.log("state",state)
  return (
    <div>
      <div className='flex justify-between mt-3 '>
        <h1 className='text-2xl font-bold'>Chats</h1>
       <div className='flex gap-5'>
       <button 
       className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-2xl text-gray-500'
       onClick={()=>setTabs("contacts")}
       >
          <BiMessageAdd/>
        </button>
        <button 
        onClick={()=>setDropdown(!dorpdown)}
        className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group'>
          <HiDotsVertical/>
          {dorpdown ? (
            <span className='bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100'>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100' onClick={()=>setTabs("newgroup")}>New group</h1>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100' onClick={()=>setTabs("starede")}>Starred messages</h1>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Select chats</h1>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100' onClick={logutfunction}>Log out</h1>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Get Whatsapp for Windows</h1>
        </span>
          ):(null)}
        </button>
       </div>
       
      </div>
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
      <div className='flex gap-5 overflow-hidden mt-2'>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500 cursor-pointer'>
            All
        </span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500 cursor-pointer'>
            Unread
        </span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500 cursor-pointer'>Favourites</span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500 cursor-pointer'>Groups</span>

      </div>



      {/* ------display users in home ----- */}


      <div className='overflow-y-auto'
      style={{ scrollbarWidth: 'thin',height:'480px' }}
      >
        {state?.map((value)=>(
            <div key={value._id} className='flex items-center my-5 border-b-2 p-2 cursor-pointer' onClick={()=>setusesrid({id:value._id,page:"chat",number:value.number})}>
                <div className='w-14 h-14 rounded-full overflow-hidden  mr-3 '>
                    <img
                     src={value.profileimage ? value.profileimage:profile}
                     alt="user profile photo"
                     className="w-full h-full object-cover"
                     />
                    </div>
                <div>
                    <h1 className='text-xl'>{ contacts.find((item)=>item.profileimage._id == value._id)?.name || null}</h1>
                    <p className='text-gray-500 font-sans'>{value?.number}</p>
                </div>
            </div>
        ))}
      </div>

    </div>
  )
}

export default Chats
