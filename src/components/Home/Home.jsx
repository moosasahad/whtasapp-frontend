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

function Home() {
  const [tabs,setTabs] = useState('')
  // const [contact,Setcontact]=useState('')
  console.log("tabs",tabs)
  return (
    <div className='bg-slate-100'>
      <div className='w-auto fixed h-full z-10 '>
      <Sidebar setTabs={setTabs} />
      </div >
     <div className='ml-16 w-96 h-screen border-r-2 bg-white p-3 border-r-slate-300 drop-shadow-sm z-20'>
     {tabs === 'Chat' && (
      <Chats setTabs={setTabs}/>
     )}
     {tabs === 'Status' && (
      <Status/>
     )}
     {tabs === 'Channels' && (
      <Channels/>
     )}
     {tabs === 'Communities' && (
      <Community/>
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
     </div>
    </div>
  )
}

export default Home
