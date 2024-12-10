import React from 'react'
import { FiArrowLeft } from "react-icons/fi";


function Newgroup({setTabs}) {
  return (
    <div>
      <div className='flex gap-7 pl-3'>
        <button onClick={()=>setTabs('contacts')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>New group</h1>
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
    </div>
  )
}

export default Newgroup
