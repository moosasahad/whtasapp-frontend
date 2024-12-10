import React from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";





function Contacts({setTabs}) {
  return (
    <div className=''>
      <div className='flex gap-7 pl-3'>
        <button onClick={()=>setTabs('Chat')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>New Chat</h1>
      </div>
      <div>
        <button className='text-gray-600 text-2xl relative top-9 left-3'>
            {/* <IoMdSearch/> */}
            <FiArrowLeft/>
        </button>
        <input 
        type="text" 
        placeholder='Searc name or number'
        className='w-full bg-slate-200 p-1 pl-16 rounded-md'
        />
      </div>
      <div className='flex items-center gap-5 my-4'>
        <span className=' h-12 w-12 bg-green-500 rounded-full flex justify-center items-center text-2xl text-white'>
            <FaUser/>
        </span>
        <h1>New contact</h1>
      </div>
      <div className='flex items-center gap-5 my-4 cursor-pointer' onClick={()=>setTabs('newgroup')}>
        <span 
       
        className=' h-12 w-12 bg-green-500 rounded-full flex justify-center items-center text-3xl text-white '>
            <MdGroup/>
        </span>
        <h1>New group</h1>
      </div>
      <div className='flex items-center gap-5 my-4 cursor-pointer' onClick={()=>setTabs('community')}>
        <span className=' h-12 w-12 bg-green-500 rounded-full flex justify-center items-center text-3xl text-white'>
            <MdGroups2/>
        </span>
        <h1>New community</h1>
      </div>
      <div className='ml-4 my-8 '>
       <h1> CONTACTS ON WHATSAPP</h1>
      </div>
    </div>
  )
}

export default Contacts
