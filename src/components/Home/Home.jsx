import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Chats from './tabs/Chats'
import Status from './tabs/Status'
import Channels from './tabs/Channels'
import Communitie from './tabs/NewCommunities'
import Contacts from './tabs/Contacts'
import Newgroup from './tabs/Newgroup'
import Community from './tabs/Community'
import Stardmessage from './tabs/Stardmessage'
import Channelbaner from './tabs/Channelbaner'
import NewContacts from './tabs/NewContacts'
import Settings from './tabs/Settings'
import Profile from './tabs/Profile'
import Spacificuser from './Spacificuser'
import background from "../../Images/backgroun.png";
import { CiLock } from 'react-icons/ci'


function Home() {
  const [tabs,setTabs] = useState('Chat')
  // const [contact,Setcontact]=useState('')
  console.log("tabs",tabs)
  return (
    <div className='bg-slate-100 flex'>
        {tabs === 'channelbaner' && (
      <Channelbaner setTabs={setTabs}/>
     )}
      <div className=' relative h-full z-20 '>
      <Sidebar setTabs={setTabs} />
      </div >
     <div className=' w-2/5 relative h-screen border-r-2 bg-white p-3 border-r-slate-300 drop-shadow-sm z-10'>
     {tabs === 'Chat' && (
      <Chats setTabs={setTabs}/>
     )}
     {tabs === 'Status' && (
      <Status/>
     )}
     {tabs === 'Channels' && (
      <Channels setTabs={setTabs}/>
     )}
     {tabs === 'Communities' && (
      <Community setTabs={setTabs}/>
     )}
     {tabs === 'contacts' && (
      <Contacts setTabs={setTabs}/>
     )}
     {tabs === 'newgroup' && (
      <Newgroup setTabs={setTabs}/>
     )}
     {tabs === 'community' && (
      <Communitie setTabs={setTabs}/>
     )}
     {tabs === 'starede' && (
      <Stardmessage setTabs={setTabs}/>
     )}
     {tabs === 'newcontacts' && (
      <NewContacts setTabs={setTabs}/>
     )}
     {tabs === 'settings' && (
      <Settings setTabs={setTabs}/>
     )}
     {tabs === 'profile' && (
      <Profile setTabs={setTabs}/>
     )}
     
     </div>
     <div className='relative bg-slate-200 flex justify-center items-center w-full'>
<div>
<div>
<img className='w-80 mx-auto ' src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" alt="whtsa imgae" />
<h6 className='text-3xl font-extralight font-sans text-gray-600 text-center mt-4'>Download WhatsApp for Windows </h6>
<h6 className='font-extralight font-sans text-sm text-gray-600 text-center mt-4'>Make calls, share your screen and get a faster experience when you download the Windows app.</h6>
<h6  className='bg-green-600 text-white p-2 rounded-full w-52 mx-auto text-center mt-4'>Get from Microsoft Store</h6>
</div>
<h1 className="flex justify-center items-center relative -bottom-32">
            <span>
              <CiLock />
            </span>
            Your personal messages are end-to-end encrypted
          </h1>
</div>
    </div>
     {/* <div className='bg-green-400 h-screen relative w-full'>
      <Spacificuser/>
    </div> */}
    </div>
  )
}

export default Home
