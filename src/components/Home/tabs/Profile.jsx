import React, { useContext, useState } from 'react'
import profileimage from "../../../Images/profile image.png"
import { FaPen } from "react-icons/fa";
import { FiCheck } from 'react-icons/fi';
import { IoCamera } from "react-icons/io5";
import { Product } from '../../Component/Productcontext';



function Profile() {
    const [edit,setEdit]=useState(true)
    const [abouedit,setaboutEdit]=useState(true)
    const {owner} =useContext(Product)
    console.log("sdfghjk profile",owner);
    

    const[inpu,setInput]=useState(owner.name)
  return (
    <div>
        <div className="relative">
  <h1 className="text-2xl font-bold mb-4">Profile</h1>
  <div className="w-64 h-64 flex justify-center items-center relative mx-auto">
 
  <div className="w-64 h-64 rounded-full overflow-hidden">
    <img
      className="w-full h-full object-cover"
      src={owner ? owner.profileimage : profileimage}
      alt="Profile"
    />
  </div>

  
  <label className="absolute top-0 left-0 w-64 h-64 rounded-full bg-slate-400 bg-opacity-50 flex flex-col justify-center items-center text-white text-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
    {/* Camera Icon and Text */}
    <div className="flex flex-col items-center">
      <IoCamera className="text-3xl m-2" />
      <h6 className="text-xs">CHANGE<br />PROFILE PHOTO</h6>
    </div>
  
    <input
      type="file"
      className="hidden"
      onChange={(e) => {
        // Handle file upload logic here
        const file = e.target.files[0];
        console.log("Selected file:", file);
      }}
    />
  </label>
</div>

</div>
        <div className='text-gray-500 p-5'>
            <p className='text-gray-500 text-sm'>Your name</p>
            {edit?(
                <div className='flex justify-between py-6'>
                <h1>{owner.name}</h1>
                <span className='cursor-pointer w-5 h-5' onClick={()=>setEdit(!edit)}>
                    <FaPen className='text-gray-500'/>
                </span>
                </div>
                
            ):(
                <div className='flex justify-between py-6'>
                    <input type="text"
                    onChange={(e)=>setInput(e.target.value)}
                    value={owner.name}
                    className='outline-none border-b-2 border-gray-500 w-full'
                    />
                <span className='cursor-pointer'  onClick={()=>setEdit(!edit)}>
                    <FiCheck className='text-gray-500 text-2xl'/>
                </span>
                </div>
            )}
        </div>
        <div>
            <p className='p-3 text-xs text-gray-500 bg-slate-200 my-5'>
            This is not your username or PIN. This name will be visible to your WhatsApp contacts.
            </p>
        </div>
        <div>
        <p className='text-gray-500 text-sm'>About</p>
        {abouedit?(
            
                <div className='flex justify-between py-6'>
                <h1>{owner.about}</h1>
                <span className='cursor-pointer w-5 h-5' onClick={()=>setaboutEdit(!edit)}>
                    <FaPen className='text-gray-500'/>
                </span>
                </div>
                
            ):(
                <div className='flex justify-between py-6'>
                    <input type="text"
                    onChange={(e)=>setInput(e.target.value)}
                    value={owner.about}
                    className='outline-none border-b-2 border-gray-500 w-full'
                    />
                <span className='cursor-pointer'  onClick={()=>setaboutEdit(!edit)}>
                    <FiCheck className='text-gray-500 text-2xl'/>
                </span>
                </div>
            )}
        </div>

    </div>
  )
}

export default Profile
