import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { axiosPrivate } from '../../../Axiosinstens'
import { FaRegStar } from 'react-icons/fa'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import background from "../../../Images/backgroun.png";



function Stardmessage({setTabs}) {
  const [message,setMessage] = useState([])

  const staredmessage = async ()=>{
    try{
      const res = await axiosPrivate.get("/allstardemessage")
    console.log("staredmessage res ", res.data.findemessages
    )
    setMessage(res.data.findemessages
    )
    }catch(error){
      console.log("stared messahge error",error)
    }
  }
  useEffect(()=>{
  staredmessage()

  },[])
  return (
    <div>
        <div className='flex gap-7 pl-3 mb-5 pt-3'>
        <button onClick={()=>setTabs('Chat')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>Stard Message</h1>
      </div>

      <div className=' overflow-x-auto bg-slate-300' style={{height:"600px", backgroundImage: `url(${background})` }}>
    {message?.map((item)=>(
      <div key={item._id} className='m-2 bg-white w-fit p-2 rounded-lg'>
       <div className='flex items-center gap-4'>
        <img 
        src={item?.reciverid?.profileimage}
        alt=""
        className='w-10 h-10 rounded-full'
        />
        {item?.reciverid?.name }
       </div>
       <div className='p-3'>
        {item.text}
       {item.image && <img controls src={item.image} />}
       {item.audio && <audio controls src={item.audio} className='w-full'></audio>}
       {item.video && <video controls src={item.video} className='w-full'></video>}
       </div>
       <h1 className="text-xs flex justify-end mt-2">
                   {item.star ? <FaRegStar /> : null}
                   <IoCheckmarkDoneOutline />
                   {new Date(item.date).toLocaleDateString()}
                 </h1>
      </div>
    ))}
      </div>
      
    </div>
  )
}

export default Stardmessage
