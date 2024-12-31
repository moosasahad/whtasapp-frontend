import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate } from '../../Axiosinstens'
import { Product } from './Productcontext'
import { toast } from 'react-toastify'
export const groupcontextsender = createContext()
function Groupcontext({children}) {
    const [groups,setgroups]= useState([])
    const [spacificgroup,setspacificgroup] = useState([])
    const [inputdata,setinputdata] = useState({
        groupName:"",
        files:"",
        members:[],
    })
     const [postinvalue,setpostinvalue] = useState({
        groupid:"",
        message:"",
        files:"",
      })
const {userid} = useContext(Product)
console.log("group creating data",inputdata)
//////////////////////////////////// GREATE GROUP /////////////////////////////

const creategroup = async ()=>{
    const formdata = new FormData()
    formdata.append("groupName",inputdata.groupName)
    formdata.append("image",inputdata.files)
    formdata.append("members",JSON.stringify(
        inputdata.members.map((item) => ({
          membersid: item.profileimage._id,
          number: item.number,
        }))
      ))
console.log("formdata,group creating",formdata)
    try{
        const res = await axiosPrivate.post("creategroup",formdata)
        console.log("create group res",res.data)
         toast.success("Group created", {
                    style: {
                        width: "150px",
                        height: "10px",
                       
                      },
                  });
    }catch(error){
        console.log("create group error",error)
    }
}

///////////////////////////////////// GET GROUPS ///////////////////////////////////
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

    ////////////////////////    GET GROUPS MESSAGE / /////////////////////////////


    const  Getgroupmessage = async ()=>{
        console.log("1234567890",userid)
        try {
            const res = await axiosPrivate.get(`/getgroupmessage/${userid.id}`)  
            console.log("get message in sapacific group",res.data) 
            setspacificgroup(res.data)      
              
        } catch (error) {
            console.log("get message in sapacific group error = ",error)
        }
    }
    useEffect(()=>{
        Getgroupmessage()
    },[userid])

//////////////////////  SEND MESSAGE IN GROUP  ///////////////////////////

const sendmessageongroup =async ()=>{
    const formdata = new FormData()
        formdata.append("groupid",postinvalue.groupid);
        formdata.append("message",postinvalue.message);
        formdata.append("files",postinvalue.files)
    try {
        const res = await axiosPrivate.post("/sendmessageongroup",formdata)
        console.log("sende message in group",res.data)
        getgrups()
    } catch (error) {
        console.log("send message in group error",error)
        
    }
}
console.log("spacificgroup///12345678///spacificgroup",spacificgroup)

  return (
    <groupcontextsender.Provider value={{groups,sendmessageongroup,postinvalue,setpostinvalue,getgrups,spacificgroup,creategroup,inputdata,setinputdata}}>
        {children}
    </groupcontextsender.Provider>
  )
}

export default Groupcontext
