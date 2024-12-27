import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate } from '../../Axiosinstens'
export const groupcontextsender = createContext()
function Groupcontext({children}) {
    const [groups,setgroups]= useState([])
     const [postinvalue,setpostinvalue] = useState({
        groupid:"",
        message:"",
        files:"",
      })

    const getgrups = async ()=>{
        try {
            const res = await axiosPrivate.get("/usergroups")  
            console.log("get group",res.data) 
            setgroups(res.data?.data)      
              
        } catch (error) {
            console.log("get groups error = ",error)
        }
    }
    useEffect(()=>{
        getgrups()
    },[])

//////////////////////  SEND MESSAGE IN GROUP  ///////////////////////////

const sendmessageongroup =async ()=>{
    try {
        const res = await axiosPrivate.post("/sendmessageongroup",postinvalue)
        console.log("sende message in group",res.data)
        getgrups()
    } catch (error) {
        console.log("send message in group error",error)
        
    }
}
  return (
    <groupcontextsender.Provider value={{groups,sendmessageongroup,postinvalue,setpostinvalue}}>
        {children}
    </groupcontextsender.Provider>
  )
}

export default Groupcontext
