import React, { useState } from 'react'
import { BiMessageAdd } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineSearch } from 'react-icons/md';

function Chats({setTabs}) {
    const [dorpdown,setDropdown]=useState(false)
   
  return (
    <div>
      <div className='flex justify-between mt-3'>
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
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Log out</h1>
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
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500'>
            All
        </span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500'>
            Unread
        </span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500'>Favourites</span>
        <span className='pl-2 pr-2 p-1 bg-slate-200 rounded-xl text-gray-500'>Groups</span>

      </div>
    </div>
  )
}

export default Chats
