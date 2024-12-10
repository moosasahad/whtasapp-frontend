import React, { useState } from 'react'
import { BiMessageAdd } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";

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
       {/* {dorpdown ? ( */}
        
       {/* ):(null)} */}
       </div>
      </div>
    </div>
  )
}

export default Chats
