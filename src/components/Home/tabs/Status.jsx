import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { Product } from "../../Component/Productcontext";
import { LuSendHorizontal } from "react-icons/lu";
import { axiosPrivate } from "../../../Axiosinstens";
import { contactcontext } from "../../Component/Contact";
import Statusdisplay, { Activuserstatus } from "../Statusdisplay";
import { toast } from "react-toastify";
import { usercontext } from "../../Component/Usercontext";

function Status({ setTabs }) {
  const [dorpdown, setDropdown] = useState(false);
  const [drop, setdrop] = useState(false);
  const [userstatus,setuserStatus]= useState([])
  const [inputdata, setinputdata] = useState({
    type: "",
    content: "",
  });
  const {state:user} = useContext(usercontext)
  const [display,setdisplay]=useState()
  const [userdisplay,setuserdisplay] = useState(false)
  const {state} = useContext(contactcontext)

  const fileInputRef = useRef(null);
 

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };
  const handletextUploadClick = () => {
    setdrop(!drop);
  };

  //////////////////////////////// POST STATUS ////////////////////////////////

  const poststatus = async () => {
    const formdata = new FormData();
    formdata.append("type", inputdata.type);
    formdata.append("files", inputdata.content);
    formdata.append(
      "content",
      inputdata.type == "text" ? inputdata.content : null
    );

    try {
      const res = await axiosPrivate.post("/createStatus", formdata);
      // console.log("statos post res", res.data);
      getuserstatus()
      toast.success("status posted", {
        style: {
            width: "250px",
            height: "10px",
           
          },
      });
    } catch (error) {
      console.log("status post error", error);
    }
  };
  if (inputdata?.type == "video" || inputdata?.type == "image") {
    poststatus();
    setinputdata({
      type: "",
      content: "",
    });
  }
  ///////////////////////////// USER STATUS GET ////////////////////////////

  const getuserstatus = async () => {
    try {
      const res = await axiosPrivate.get("/getUserStatuses");
      // console.log("user satatus get", res.data);
      setuserStatus(res.data.data)

    } catch (error) {
      console.log("user status get error", error);
    }
  };
useEffect(()=>{
  getuserstatus()
},[])  

//////////////////////////////////// GET SAVED CONTACT STATUS ////////////////////////////////
const [statuss,setstatuss] = useState([])
const [allstatus,setallstatus] = useState([])
const getsavedcontactstatus = async () =>{
  try {
    const res =await axiosPrivate.get("/getContactStatuses")
    // console.log("svedcontact status res",res?.data.data)
    setallstatus(res?.data.data)
    const uniqueStatuses = Array.from(
      new Map(res?.data.data.map(item => [item.userId, item])).values()
    );
    // console.log("user status in status page =2",uniqueStatuses)
    setstatuss(uniqueStatuses)
  } catch (error) {
    console.log("avedcontact status error",error)    
  }
}

useEffect(()=>{
  getsavedcontactstatus()
 
},[])





////////////////////////////////

const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isViewingStatus, setIsViewingStatus] = useState(false);
  useEffect(() => {
    if (isViewingStatus) {
      const timeout = setTimeout(() => {
        if (currentStatusIndex < userstatus.length - 1) {
          setCurrentStatusIndex((prev) => prev + 1);
        } else {
          setIsViewingStatus(false); 
        }
      }, 3000); 

      return () => clearTimeout(timeout);
    }
  }, [currentStatusIndex, isViewingStatus, userstatus.length]);

  // const handleStatusClick = () => {
  //   setIsViewingStatus(true);
  //   setCurrentStatusIndex(0); // Start from the first status
  // };

  // const closeStatusViewer = () => {
  //   setIsViewingStatus(false);

  // };

  ///////////////////////////////// STATUS TIME SETUP ////////////////////////////

  function formatDateForStatus(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };

    if (diffInDays === 0) {
        return `Today ${date.toLocaleTimeString('ind', options)}`;
    } else if (diffInDays === 1) {
        return `Yesterday ${date.toLocaleTimeString('in', options)}`;
    } else {
        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return `${date.toLocaleDateString('in', dateOptions)} ${date.toLocaleTimeString('in', options)}`;
    }
}






 return (
    <div>
      { userdisplay ? (<Activuserstatus props={{userstatus,setuserdisplay,getuserstatus}}/>):null}
      
       { display ? (<Statusdisplay props={{display,setdisplay,allstatus}} />):null}
      <div className="flex justify-between pt-5">
        <h1 className="text-2xl font-bold">Status</h1>
        <div className="flex gap-5">
          <button
            // onClick={()=>setDropdown(!dorpdown)}
            className="w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group"
          >
            <AiOutlinePlus />

            <>
              <span className="bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer invisible group-focus-within:visible">
                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100"
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  <input
                    id="photoInput"
                    type="file"
                    className="hidden"
                    onChange={(e) =>{
                      const file = e.target.files[0];
                     if(file.type.split("/")[0] == "image"){
                      setinputdata({
                        type: "image",
                        content: e.target.files[0],
                      })
                     }else{
                      toast.warning("plese select image file", {
                        style: {
                            width: "250px",
                            height: "10px",
                           
                          },
                      });
                     }
                    }}
                  />
                  Photos
                </h1>
                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100"
                  onClick={() => document.getElementById("videoInput").click()}
                >
                  <input
                    id="videoInput"
                    type="file"
                    className="hidden"
                    onChange={(e) =>{
                      const file = e.target.files[0];
                     if(file.type.split("/")[0] == "video"){
                      setinputdata({
                        type: "video",
                        content: e.target.files[0],
                      })
                     }else{
                       toast.warning("plese select video file", {
                                          style: {
                                              width: "250px",
                                              height: "10px",
                                             
                                            },
                                        });
                     }
                    }}
                  />
                  Videos
                </h1>

                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100"
                  onClick={handletextUploadClick}
                >
                  Text
                </h1>
                {drop && (
                  <span className="flex flex-col items-center">
                    <input
                      type="text"
                      className="outline-1 w-full border-2 border-gray-400 rounded-md"
                      onChange={(e) =>
                        setinputdata((priv) => ({
                          ...priv,
                          type: "text",
                          content: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="w-1/2 bg-green-500 p-1 m-2 rounded-md"
                      onClick={() => {
                        poststatus(), setdrop();
                      }}
                    >
                      <LuSendHorizontal className="text-white mx-auto text-2xl" />
                    </button>
                  </span>
                )}
              </span>
              {/* <input
                type="file"
                ref={fileInputRef}
                className=""
                style={{ display: "none" }}
              /> */}
            </>
          </button>
          <button
            onClick={() => setDropdown(!dorpdown)}
            className="w-10 h-10 rounded-full focus:bg-gray-300 flex justify-center items-center text-xl text-gray-500 group"
          >
            <HiDotsVertical />
            {dorpdown ? (
              <span className="bg-white absolute top-16 left-32 p-2 text-left w-60 shadow-md shadow-slate-400 cursor-pointer opacity-0 group-focus:opacity-100">
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100">
                  Status Privacy
                </h1>
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="flex items-center cursor-pointer"  onClick={()=>setuserdisplay(true)}>
        <div className="mr-2 cursor-pointer">
          <label className="cursor-pointer">
            <img
              src={userstatus.find((item)=>item.type == "image")?.content || user?.profileimage }
              alt=""
              className="w-14 h-14 rounded-full"
            />
            {userstatus.length > 0 ?
              (null):(<input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.type.split("/")[0] == "image") {
                    setinputdata({
                      type:  "image",
                      content: e.target.files[0], 
                    });
                  }else{
                    toast.warning("plese select image file", {
                      style: {
                          width: "250px",
                          height: "10px",
                         
                        },
                    });
                  }
                }}
              />)
            }
          </label>
          <p className="bg-green-500 relative -top-6 left-8 rounded-full w-5 h-5 border text-3xl text-white border-white flex justify-center items-center">
            <HiMiniPlusSmall />
          </p>
        </div>
        <div>
          <h3 className="text-gray-500">My status</h3>
          <p className="text-gray-500 text-sm">Clik to add status update</p>
        </div>
      </div>
      <h3 className="text-gray-500 ml-7">RECENT</h3>

      {/* //////////////////////////  STATUS CONTACT USER DISPLAY  //////////////////////////  */}

      <div>
        {
          statuss.map((item)=>(
            <div key={item._id} className="flex gap-5 m-2 cursor-pointer" onClick={()=>setdisplay(item.userId)}>
              <span className="w-16 h-16 rounded-full overflow-hidden bg-black border-2 border-double border-green-500" >
                {item.type == "image" &&(
                  <img src={item.content} alt="status" className="w-16 h-16 rounded-full overflow-hidden"/>
                )}
                 {item.type == "video" &&(
                  <video src={item.content} className="w-16 h-16 rounded-full overflow-hidden"></video>
                )}
                 {item.type == "text" &&(
                  <img src={state?.find((value)=>value.profileimage._id == item.userId )?.profileimage?.profileimage} alt="profile image" className="w-16 h-16 rounded-full overflow-hidden"/>
                )}
              </span>
              <div>
                <h1 className="text-xl font-semibold">{state?.find((value)=>value.profileimage._id == item.userId )?.name}</h1>
                <h1 className="text-sm">{formatDateForStatus(item.createdAt)}</h1>
              </div>
            </div>
          ))
        }
     
    </div>
   
    </div>
  );
}

export default Status;
