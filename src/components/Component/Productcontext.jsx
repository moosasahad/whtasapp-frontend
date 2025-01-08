import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { axiosPrivate, socket } from "../../Axiosinstens";
import { usercontext } from "./Usercontext";
import { data } from "react-router-dom";
export const Product = createContext();

function Productcontext({ children }) {
  const [state, setState] = useState(null);
  const [userid, setusesrid] = useState({ id: "", page: "", number: "" });
  const [groupuserid, setgroupuserid] = useState(null);
  const [login, setlogin] = useState(true);
  const [tabs, settabs] = useState("page-1");
  const [messagess, setmessages] = useState([]);
  const [file, setfile] = useState();
  const {state:user} = useContext(usercontext) 
console.log("useruseruseruseruseruseruseruseruseruseruseruseruser--useruseruser====-----user",user);

  // // --------- getmessage sender --------------//

  // useEffect(()=>{
  //   const getmessager =async ()=>{
  //     try {
  //       const res =await axiosPrivate.get("/getallmessagers")
  //       console.log("getmessager",res?.data.data)
  //         setState(res?.data.data)

  //     } catch (error) {
  //       console.log("error",error)
  //     }
  //   }
  //   getmessager()
  // },[])

  //////////////////////////////////// SEND MESSAGES /////////////////////////////////

  const [inputfild, setinputfild] = useState("");

  const sendmessage = async () => {
    const formData = new FormData();
    formData.append("message", inputfild?.message ? inputfild?.message : "");
    formData.append("files", inputfild?.files);
    formData.append("receivernumber", inputfild?.receivernumber);
    formData.append("receiverid", inputfild?.receiverid);

    try {
      const res = await axiosPrivate.post("/sendmessage", formData);
      console.log("post messageee", res.data);
      console.log(
        "inputfielde .................... djksjdkjd .............",
        inputfild
      );
    } catch (error) {
      console.log("post message error", error);
    }
  };

  // //////////////////// implimet socket io message sending /////////////////
  // const sendmessage =async ()=>{
  //   const formData = new FormData();
  //   formData.append("message", inputfild?.message ? (inputfild?.message):(""));
  //   formData.append("files", inputfild?.files);
  //   formData.append("receivernumber", inputfild?.receivernumber);
  //   formData.append("receiverid", inputfild?.receiverid);
  // // console.log("fomrdata",formData);
  // // socket.emit("send_message", {
  // //   message: inputfild.message,
  // //   receivernumber: inputfild.receivernumber,
  // //   receiverid: inputfild.receiverid,
  // //   files: inputfild?.files,
  // // });

  //   try {
  //     // const res = await axiosPrivate.post("/sendmessage",formData)
  //     // console.log("post messageee",res.data)
  //     console.log("inputfielde .................... djksjdkjd .............",inputfild)
  //     if (inputfild?.files) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         // Emit message with file data
  //         socket.emit("send_message", {
  //           message: inputfild?.message,
  //           receivernumber: inputfild?.receivernumber,
  //           files: {
  //             data: reader.result, // File content (Base64 or ArrayBuffer)
  //             name: inputfild?.files.name,
  //             type: inputfild?.files.type, // File MIME type
  //           },
  //           usreid: user?._id,
  //         });
  //       };

  //       reader.onerror = (err) => {
  //         console.error("Error reading file:", err);
  //       };

  //       reader.readAsDataURL(inputfild?.files); // Convert file to Base64
  //     } else {
  //       // Send text message without file
  //       socket.emit("send_message", {
  //         message: inputfild?.message,
  //         receivernumber: inputfild?.receivernumber,
  //         usreid: user?._id,
  //       });
  //     }

  //   } catch (error) {
  //     console.log("post message error",error)

  //   }
  // }

  // Dependency ensures the effect runs when the receiver's number changes

  //////////////////////////////////////// GET SPACIFIC MESSSAES  //////////////////////////////////

  const getspacificuser = async () => {
    try {
      const res = await axiosPrivate.get(`/getmessaeg/${userid.id}`);
      console.log("get spacific messager", res?.data.data);
      // setmessages(res?.data.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getspacificuser();
  }, [userid]);

  //////////////////////////////// IMPPLINMENT SOCKET IO IN SPACIFIC MESSAGE GETING ////////////////////////////////////
  // useEffect(() => {
  //   const userId = user._id; // Replace with the actual user ID
  //   socket.emit("joinRoom", userId); // Join the room
  //   console.log("messags spacific:", userId);
  
  //   // Listen for previous messages
  //   socket.on("messags spacific", (messages) => {
  //     console.log("Previous messags spacific:", messages);
  //     setmessages(messages)
  //     // setMessages(messages); // Assuming you have a setMessages function
  //   });
  
  //   return () => {
  //     socket.off("messags spacific");
  //   };
  // }, [userid]);
  
  useEffect(() => {
    if (userid) {
      const userId = user._id;
  
      // Join the specific room for the user
      socket.emit("joinRoom", userId);
  
      // Handle receiving previous messages
      const handlePreviousMessages = (messages) => {
        console.log("previousMessage:", messages);
        setmessages(messages);
      };
      socket.on("messags spacific", handlePreviousMessages);
  
      // Handle receiving new messages in real-time
      const handleNewMessage = (data) => {
        console.log("newpreviousMessage:", data);
        setmessages((prev) => [...prev, data]);
      };
      socket.on("newpreviousMessage", handleNewMessage);
  
      // Cleanup listeners on unmount or dependency change
      return () => {
        socket.off("previousMessage", handlePreviousMessages);
        socket.off("newpreviousMessage", handleNewMessage);
      };
    }
  }, [inputfild,userid]); // Remove `inputfild` to prevent unnecessary re-initializations
  

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
    setmessages,
    setfile,
    file,
    getspacificuser,
  };
  return <Product.Provider value={obj}>{children}</Product.Provider>;
}

export default Productcontext;
