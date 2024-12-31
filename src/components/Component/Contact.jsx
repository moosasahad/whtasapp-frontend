import React, { createContext, useEffect, useState } from 'react'
import { axiosPrivate } from '../../Axiosinstens'

export const contactcontext = createContext()
function Contact({children}) {
    const [state,setState]=useState([])
  const [input,setinput]=useState('')
  const [sercheddata,setsearcheddata]= useState([])
    
    const getallcontatc = async()=>{
        try {
            const res = await axiosPrivate.get("/getallcontatc")
            console.log("all contatcs",res.data)
            setState(res.data.data)
        } catch (error) {
            console.log("contac error",error)
        }
    }
    useEffect(()=>{
        getallcontatc()
    },[])

    const Searchcontatc =async ()=>{
        try {
            const res = await axiosPrivate.get(`/searchcontatcs?query=${input}`)
            setsearcheddata(res.data)
            console.log("Searchcontatc",res.data)
        } catch (error) {
            console.log("Searchcontatc.error",error)
        }
    }
    useEffect(()=>{
        Searchcontatc()
    },[input])
  return (
<contactcontext.Provider value={{state,input,setinput,sercheddata}}>
    {children}
</contactcontext.Provider>
)
}

export default Contact
