import React, { createContext, useEffect, useState } from 'react'
import { axiosPrivate } from '../../Axiosinstens'

export const usercontext = createContext();

function Usercontext({children}) {
    const [state,setState]=useState([])
    
       const getprofile = async ()=>{
        try {
            const res = await axiosPrivate.get("/getspacificuser")
            console.log("userprfile",res.data)
            setState(res?.data.data)
        } catch (error) {
            
        }
       }
      useEffect(()=>{
        getprofile()
      },[])
    console.log("asbdnmbsamdnbamndbasdbsmandbsnmds--------------------11111111111111===========222222222",state)
  return (
   <usercontext.Provider value={{state}}>
      {children}
   </usercontext.Provider>
   
  )
}

export default Usercontext 
