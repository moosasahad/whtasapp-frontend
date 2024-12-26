import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate } from '../../Axiosinstens';
import { Input } from 'postcss';
export const Product = createContext();
function Productcontext({children}) {
    const[state,setState]=useState(null)
    const[userid,setusesrid]=useState('')
  const [groupuserid,setgroupuserid]=useState(null)

    // console.log("userid---",userid);
    const [login,setlogin]=useState(true)
    const [tabs,settabs]=useState('page-1')
    const [messagess,setmessages]=useState([])
    const [file,setfile]=useState()


    
    
    // --------- getmessage sender --------------//

    useEffect(()=>{
      const getmessager =async ()=>{
        try {
          const res =await axiosPrivate.get("/getallmessagers")
          console.log("getmessager",res?.data.data.findeddata)
            setState(res?.data.data.findeddata)
          
        } catch (error) {
          console.log("error",error)
        }
      }
      getmessager()
    },[])


  

    // ---------------------------------- send message ---------------------- /// 
    const [inputfild,setinputfild]= useState("")
    console.log("jsdhsad",inputfild)

    const sendmessage =async ()=>{
      const formData = new FormData();
      formData.append("message", inputfild?.message);
      formData.append("files", inputfild?.files);
      formData.append("receivernumber", inputfild?.receivernumber);
      formData.append("receiverid", inputfild?.receiverid);

      try {
        const res = await axiosPrivate.post("/sendmessage",formData)
        console.log("post messageee",res.data)
        getspacificuser()
        
        
      } catch (error) {
        console.log("post message error",error)
        
      }
    }


    //------------------- get spacific messager ------------------//
    console.log("sdfghj234567890==",userid)
    const getspacificuser =async ()=>{
      try {
        console.log("sdfghj234567890==///",userid)
        const res =await axiosPrivate.get(`/getmessaeg/${userid}`)
        console.log("get spacific messager",res?.data.data.messages)          
        setmessages(res?.data.data.messages)
      } catch (error) {
        console.log("error",error)
      }
    }
    useEffect(()=>{
      
      getspacificuser()
    },[userid])

    

console.log("filess ----- files",file);





    const obj = {
        state,
        setusesrid,
        userid,
        groupuserid,
        setgroupuserid,
        login,
        setlogin,
        tabs,
        settabs,
        messagess,
        setinputfild,
        sendmessage,
        setfile,
        file,
        getspacificuser,
    };
  return (
    <Product.Provider value={obj}>
        {children}
    </Product.Provider>
  )
}

export default Productcontext
