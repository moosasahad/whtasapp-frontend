import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

function Stardmessage({setTabs}) {
  return (
    <div>
        <div className='flex gap-7 pl-3'>
        <button onClick={()=>setTabs('Chat')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>New group</h1>
      </div>
      started
    </div>
  )
}

export default Stardmessage
