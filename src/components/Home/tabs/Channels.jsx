import React, { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineSearch } from "react-icons/md";
import { groupcontextsender } from '../../Component/groupcontext';
import { Product } from '../../Component/Productcontext';


function Channels({setTabs}) {
    const [dorpdown,setDropdown]=useState(false)
    const {setgroupuserid,setusesrid} = useContext(Product)
    const {groups} = useContext(groupcontextsender)
    console.log("groups",groups)
  return (
    <div>
       <div className='flex justify-between mt-3'>
       <h1 className='text-2xl font-bold'>Groups</h1>
      <button 
        onClick={()=>setDropdown(!dorpdown)}
        className='w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group'>
          <AiOutlinePlus/>
          {dorpdown ? (
            <span className='bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100'>
            <h1 className='p-2 text-base text-slate-600 hover:bg-gray-100' onClick={()=>setTabs('channelbaner')}>Create a channel</h1>
        </span>
          ):(null)}
        </button>
       </div>
       <div>
        <button className='text-gray-600 text-2xl relative top-9 left-3 '>
            {/* <IoMdSearch/> */}
            <MdOutlineSearch className='text-xl'/>
        </button>
        <input 
        type="text" 
        placeholder='Search name or number'
        className='w-full bg-slate-200 p-1 pl-16 rounded-md'
        />
      </div>
      {/* ////////////////// display groups //////////////////////// */}
      <div>
          {
            groups?.map((item)=>(
              <div className='flex items-center gap-4 border-b-2 cursor-pointer mt-3 pb-3' onClick={()=>setusesrid({id:item._id,page:"group"})}>
                <img 
                src={item.groupImage} 
                alt="" 
                className='w-14 h-14 rounded-full'
                />
                <h1 className='text-xl'>{item.groupName}</h1>
              </div>
            ))
          }
      </div>
    </div>
  )
}

export default Channels
