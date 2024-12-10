import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function Channels() {
    const [dorpdown,setDropdown]=useState(false)
  return (
    <div>
       <div className='flex justify-between mt-3'>
       <h1 className='text-2xl font-bold'>Status</h1>
      <button 
        onClick={()=>setDropdown(!dorpdown)}
        className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group'>
          <AiOutlinePlus/>
          {dorpdown ? (
            <span className='bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100'>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100'>Create a channel</h1>
        </span>
          ):(null)}
        </button>
       </div>
    </div>
  )
}

export default Channels
