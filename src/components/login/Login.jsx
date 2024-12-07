import React from 'react'
import whatsapplogo from "../../Images/whatsapp logo.jpg"
import { RiDownloadLine } from "react-icons/ri";

function Login() {
  return (
    <div className='m-2'>
    <div>
        <div className='flex justify-between'>
            <img
            className='w-36 ml-9'
            src={whatsapplogo} alt="whatsapp logo" />

<button className="bg-green-500 rounded-full border w-40 h-14 text-lg border-black mt-3 mr-10 flex items-center justify-center gap-2 px-4 py-2">
  Download <RiDownloadLine />
</button>
</div>
<div className='flex items-center justify-center'>
<div className='w-9/12 border border-black rounded-2xl h-96 p-14 '>
    <h1 className='text-3xl font-normal'>Log into WhatsApp Web</h1>
</div>
</div>

    </div>
    </div>
  )
}
 
export default Login
