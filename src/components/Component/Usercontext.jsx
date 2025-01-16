import React, { createContext, useEffect, useState } from 'react'
import { axiosPrivate } from '../../Axiosinstens'

export const usercontext = createContext();

function Usercontext({children}) {
    const [state,setState]=useState([])
    
       const getprofile = async ()=>{
        try {
            const res = await axiosPrivate.get("/getspacificuser")
            // console.log("userprfile",res.data)
            setState(res?.data.data)
        } catch (error) {
            console.log("userprfile error",error)
        }
       }
      useEffect(()=>{
        getprofile()
      },[])
  return (
   <usercontext.Provider value={{state,getprofile,setState}}>
      {children}
   </usercontext.Provider>
   
  )
}

export default Usercontext 
