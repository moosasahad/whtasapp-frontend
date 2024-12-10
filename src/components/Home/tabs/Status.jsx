import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { HiDotsVertical } from 'react-icons/hi'
import profile from '../../../Images/profile image.png'
import { HiMiniPlusSmall } from "react-icons/hi2";

function Status({setTabs}) {
    const [dorpdown,setDropdown]=useState(false)

    const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  return (
    <div>
        <div className='flex justify-between mt-3'>
        <h1 className='text-2xl font-bold'>Status</h1>
       <div className='flex gap-5'>
       <button 
        // onClick={()=>setDropdown(!dorpdown)}
        className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group'>
          <AiOutlinePlus/>
          {/* {dorpdown ? ( */}
            <>
            <span className='bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100'>
        <h1
          className='p-2 text-base text-slate-600 hover:bg-gray-100'
          onClick={handleFileUploadClick}
        >
          Photos & Videos
        </h1>
        <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Text</h1>
      </span>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className=''
        style={{ display: 'none' }} 
        // onChange={(e) => console.log(e.target.files)} // Handle file selection
      />
            </>
        
          {/* ):(null)} */}
        </button>
        <button 
        onClick={()=>setDropdown(!dorpdown)}
        className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group'>
          <HiDotsVertical/>
          {dorpdown ? (
            <span className='bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100'>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Status Privacy</h1>
        </span>
          ):(null)}
        </button>
       </div>
      </div>

     <div className='flex items-center'>
     <div className='mr-2'>
        <img src={profile} alt=""  className='w-14 h-14 rounded-full'/>
        <p className=' bg-green-500 relative -top-6 left-8 rounded-full w-5 h-5 border text-3xl text-white border-white flex justify-center items-center'>
        <HiMiniPlusSmall />
        </p>
      </div>
      <div>
        <h3 className='text-gray-500'>My status</h3>
        <p className='text-gray-500 text-sm'>Clik to add status update</p>
      </div>
      
     </div>
     <h3 className='text-gray-500 ml-7'>RECENT</h3>
    </div>
  )
}

export default Status
