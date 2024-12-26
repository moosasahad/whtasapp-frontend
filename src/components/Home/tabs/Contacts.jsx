import React, { useContext, useEffect, useState } from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { contactcontext } from '../../Component/Contact';





function Contacts({setTabs}) {
  const {state,input,setinput,sercheddata} = useContext(contactcontext)
  const handilChange = (e)=>{
    setinput(e.target.value)
    console.log("shdjkahd",input)
  }
  console.log("asdasd",sercheddata)  


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
        placeholder='Search name or number'
        className='w-full bg-slate-200 p-1 pl-16 rounded-md'
        onChange={handilChange}
        />
      </div>
      <div className='flex items-center gap-5 my-4 cursor-pointer'onClick={()=>setTabs('newcontacts')}>
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

       <div>
        {input ? (
          <div>
            {
            sercheddata.data?.map((value)=>(
              <div className='h-auto m-2 bg-slate-100 border-b-2 border-gray-300 cursor-pointer flex items-center' onClick={()=>setusesrid(value._id)} >
               <div className='w-20 h-20 rounded-full overflow-hidden mr-5'>
               <img src={value?.profileimage.profileimage} alt="user profile"
                className='w-20 h-20 object-cover rounded-full'
                />
               </div>
               <div>
               <h1 className='text-gray-500 text-xl'>{value.name}</h1>
               <h5 className='text-gray-400 text-sm'>{value.number}</h5>
               </div>
              </div>
            ))
          }
  kdsjjkhfjkshf
          </div>
        ):(
          <div className='overflow-y-auto h-96'>
          {
            state?.map((value)=>(
              <div className='h-auto m-2 bg-slate-100 border-b-2 border-gray-300 cursor-pointer flex items-center' onClick={()=>setusesrid(value._id)} >
               <div className='w-20 h-20 overflow-hidden mr-5'>
               <img src={value?.profileimage.profileimage} alt=""
                className='w-20 h-20 object-cover'
                />
               </div>
               <div>
               <h1 className='text-gray-500 text-xl'>{value.name}</h1>
               <h5 className='text-gray-400 text-sm'>{value.number}</h5>
               </div>
              </div>
            ))
          }
        </div>
        )}
       </div>
      </div>
    </div>
  )
}

export default Contacts
