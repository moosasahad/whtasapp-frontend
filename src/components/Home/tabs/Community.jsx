import React from 'react'
import { MdGroups2 } from 'react-icons/md'

function Community({setTabs}) {
  return (
    <div>
    <div>
    <h1 className='text-2xl font-bold'>Communities</h1>
    </div>
    <div className='flex  items-center mt-7 cursor-pointer' onClick={()=>setTabs("community")}>
        <span className='bg-green-500 w-12 h-12 flex justify-center items-center rounded-xl mr-5'>
        <MdGroups2 className='text-white text-3xl'/>
        </span>
        <h3>
            New community
        </h3>
    </div>
    </div>
  )
}

export default Community
