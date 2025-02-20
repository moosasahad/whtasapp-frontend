import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { axiosPrivate, socket } from '../../Axiosinstens'
import { Product } from './Productcontext'
import { toast } from 'react-toastify'
import { usercontext } from './Usercontext'
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
const {state} = useContext(usercontext)



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
    try{
        const res = await axiosPrivate.post("creategroup",formdata)
        // console.log("create group res",res.data)
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
            // console.log("get group",res.data) 
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
        try {
            const res = await axiosPrivate.get(`/getgroupmessage/${userid.id}`)  
            // console.log("get message in sapacific group",res.data) 
            // setspacificgroup(res?.data.findgroup)      

            socket.on("get-message",(findgroup)=>{
                // console.log("get-message",findgroup)
            setspacificgroup(findgroup)      

            })
              
        } catch (error) {
            console.log("get message in sapacific group error = ",error)
        }
    }
    useEffect(()=>{

        Getgroupmessage()

         if (userid) {
            const usesrId = state?._id
              socket.emit("joingrouproom", usesrId);
              const handlePreviousMessages = (findgroup) => {
                // console.log("previousMessage:", findgroup);
                setspacificgroup(findgroup);
              };
        
              socket.on("get-message", handlePreviousMessages);
        
              const handleNewMessage = (data) => {
                setspacificgroup(data);
                console.log("newpreviousMessage:", data);
              };
        
              socket.on("res-group-message", handleNewMessage);
        
              return () => {
                socket.off("previousMessage", handlePreviousMessages);
                // socket.off("newpreviousMessage", handleNewMessage);
              };
            }
    },[userid.page == "group",userid.id])
  

    // useEffect(()=>{
    //     socket.on("get-grou-message",(data)=>{
    //         console.log("get-grou-message using soket io",data)
    //         setspacificgroup(data) 
    //       })
       
    // },[postinvalue])
//////////////////////  SEND MESSAGE IN GROUP  ///////////////////////////

const sendmessageongroup =async ()=>{
    const formdata = new FormData()
        formdata.append("groupid",postinvalue.groupid);
        formdata.append("message",postinvalue.message);
        formdata.append("files",postinvalue.files)
    try {
        const res = await axiosPrivate.post("/sendmessageongroup",formdata)
        getgrups()
        // console.log("sende message in group",res.data)
      
    } catch (error) {
        // console.log("send message in group error",error)
        
    }
}

// useEffect(() => {
//     if (userid) {
//       const userId = user._id;
  
      
//       socket.emit("joingrouproom", userId);
  
      
//       const handlePreviousMessages = (messages) => {
//         // console.log("previousMessage:", messages);
//         setmessages(messages);
//       };
//       socket.on("messags spacific", handlePreviousMessages);
  
      
//       const handleNewMessage = (data) => {
//         // console.log("newpreviousMessage:", data);
        
//         setmessages((prev) => [...prev, data]);
//       };
//       socket.on("newpreviousMessage", handleNewMessage);
  
      
//       return () => {
//         socket.off("previousMessage", handlePreviousMessages);
//         socket.off("newpreviousMessage", handleNewMessage);
//       };
//     }
//   }, [inputfild,userid.page == "chat"]); 

  return (
    <groupcontextsender.Provider value={{
        groups,sendmessageongroup,postinvalue,setpostinvalue,getgrups,spacificgroup,creategroup,inputdata,setinputdata,Getgroupmessage
        }}>
        {children}
    </groupcontextsender.Provider>
  )
}

export default Groupcontext
