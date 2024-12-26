import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate } from '../../Axiosinstens'
export const groupcontextsender = createContext()
function Groupcontext({children}) {
    const [groups,setgroups]= useState([])

    const getgrups = async ()=>{
        try {
            const res = await axiosPrivate.get("http://localhost:4000/usergroups")  
            console.log("get group",res.data) 
            setgroups(res.data?.data)         
        } catch (error) {
            console.log("get groups error = ",error)
        }
    }
    useEffect(()=>{
        getgrups()
    },[])
  return (
    <groupcontextsender.Provider value={{groups}}>
        {children}
    </groupcontextsender.Provider>
  )
}

export default Groupcontext
