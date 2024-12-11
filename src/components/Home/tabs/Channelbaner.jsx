import React from 'react'
import channelban from '../../../Images/channelbanner.png'

function Channelbaner({setTabs}) {
  return (
    <div className="bg-opacity-70 w-screen h-screen bg-white flex justify-center items-center ">
      <div className='bg-white drop-shadow-2xl'>
        <img src={channelban} alt="" />
        <div className='flex justify-end items-center mr-10 m-5'>
        <button onClick={()=>setTabs("Channels")}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Channelbaner
