import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate } from '../../Axiosinstens';
import { Input } from 'postcss';
export const Product = createContext();
function Productcontext({children}) {
    const[state,setState]=useState(null)
    const[userid,setusesrid]=useState({id:"",page:"",number:"",})
  const [groupuserid,setgroupuserid]=useState(null)

    console.log("userid---",userid);
    const [login,setlogin]=useState(true)
    const [tabs,settabs]=useState('page-1')
    const [messagess,setmessages]=useState([])
    const [file,setfile]=useState()
console.log("userid,userid,userid=======userid",userid)

    
    
    // --------- getmessage sender --------------//

    useEffect(()=>{
      const getmessager =async ()=>{
        try {
          const res =await axiosPrivate.get("/getallmessagers")
          console.log("getmessager",res?.data.data)
            setState(res?.data.data)
          
        } catch (error) {
          console.log("error",error)
        }
      }
      getmessager()
    },[])
    console.log("state in productcontext",state)


  

    // ---------------------------------- send message ---------------------- /// 
    const [inputfild,setinputfild]= useState("")
    console.log("jsdhsad",inputfild)

    const sendmessage =async ()=>{
      const formData = new FormData();
      formData.append("message", inputfild?.message ? (inputfild?.message):(""));
      formData.append("files", inputfild?.files);
      formData.append("receivernumber", inputfild?.receivernumber);
      formData.append("receiverid", inputfild?.receiverid);
console.log("fomrdata",formData);

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
        const res =await axiosPrivate.get(`/getmessaeg/${userid.id}`)
        console.log("get spacific messager",res?.data.data)          
        setmessages(res?.data.data)
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
