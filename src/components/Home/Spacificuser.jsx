import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { FaChevronUp, FaVideo } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import profileimage from "../../Images/profile image.png";
import background from "../../Images/backgroun.png";
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { PiStickerBold } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";
import { BiPoll } from "react-icons/bi";
import { PiStickerDuotone } from "react-icons/pi";
import { GrFormClose } from "react-icons/gr";
import { Product } from "../Component/Productcontext";
import { axiosPrivate } from "../../Axiosinstens";
import { LuSendHorizontal } from "react-icons/lu";
import io from "socket.io-client";
import { usercontext } from "../Component/Usercontext";
import { MdFullscreen } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { contactcontext } from "../Component/Contact";
import { CgRecord } from "react-icons/cg";
import { PiWarningCircle } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";











function Spacificuser({ userid }) {
  const [focus, setFocus] = useState(false);
  const [inputvalu,setinputvalue]= useState("")
  const [sidebar, setSidebar] = useState(false);
  const [pop, setpop] = useState(false);
  const { state, messagess,setinputfild,sendmessage,setfile,file,getspacificuser } = useContext(Product);
  const [userids, setuserid] = useState(null);
  const [focusing, setFocusing] = useState("");
  const {state:user} = useContext(usercontext)
  const [users,setuser] = useState("")
  const [details,sestdetails] = useState(false)
  const [infotab,setinfotab] = useState("overview")
  const [postinvalue,setpostinvalue] = useState({
    receivernumber:users?.number,
    message:"",
    files:"",
  })
  const {state:contact} = useContext(contactcontext)
  console.log("contact in contact context",contact )
  const findcontact = contact?.find((item)=>item.profileimage._id ==userid.id )
  console.log("postinvalue,-=,postinvalue",findcontact)
  const findmessagesender = state?.find((item)=>item._id == userid.id)
  console.log("findmessagesender",state)
 if(!findcontact){
  useEffect(()=>{
    setuser(findmessagesender)

  },[userid])
 }else{
  useEffect(()=>{
    setuser(findcontact)

  },[userid])
 }
  console.log("userid = ",messagess)
  console.log("state = ",user)

  const [dropdown,setdropdown]=useState(false)
  setinputfild(postinvalue)
  console.log("postinvalue /////// postinvalue",postinvalue)
  useEffect(() => {
    setuserid(userid);
    
  }, [userid]);

  useEffect(() => {
    const container = document.querySelector(".messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messagess])

  const posttextmessage = (e)=>{
    console.log("text input ",e.target.value)
    console.log("dhajghsjag")
    setinputvalue(e.target.value)
     setpostinvalue((prev) => ({
      ...prev,
      receivernumber: userid?.id,
      message:e?.target?.value,
    }))
  }
  const uploadfile = (e)=>{
    setpostinvalue((prev) => ({
      ...prev,
      receivernumber: userid?.id,
      files: e.target.files[0],
    }))
    console.log(e.target.files[0])
    setfile(e.target.files[0])
    sendmessage()
  }
console.log("usersprofile/......-.././",users)








/////////////////////////////////////-----------------------


  const imageRef = useRef(null);

  const openFullscreen = () => {
    if (imageRef.current.requestFullscreen) {
      imageRef.current.requestFullscreen();
    } else if (imageRef.current.webkitRequestFullscreen) {
      // For Safari
      imageRef.current.webkitRequestFullscreen();
    } else if (imageRef.current.msRequestFullscreen) {
      // For IE/Edge
      imageRef.current.msRequestFullscreen();
    }
  };


  //-----------------------message sending =-----------------//

  const messagesending =()=>{
    sendmessage()
    setpostinvalue(
  {    message:"",} 
    )
    setfile()
    setinputvalue()
  }


//----------------------- removeimage --------------------- // 
const removeimage = ()=>{
  setfile()
  setpostinvalue()
  
}
 // ------------------ delete message ---------------------//
const deleteitem = async (id)=>{
  try {
    const res = await axiosPrivate.delete(`deletemessage/${id}`)
    console.log("res delete", res.data)
    setdropdown(null)
    getspacificuser()
  } catch (error) {
    console.log("delet error",error)
  }
}
////////////////// STAR MESSAGE ///////////////////////////
const strarmesssage =async (id)=>{
 try {
    const res = await axiosPrivate.patch(`/starmessages/${id}`)
    console.log("res star message", res.data)
    setdropdown(null)
    getspacificuser()
  } catch (error) {
    console.log("star message error",error)
  }
}

//////////////////////  FINDE STARD MESSAGE ////////////////////

const startdmessage = messagess.filter((item)=>item.star)
console.log("startdmessage",startdmessage)




const expandlist = (id)=>{
  if(id == dropdown){
    setdropdown(null)
  }else{
    setdropdown(id)
  }

}

/////////////////////////////////////////////   AUDIO RECODING /////////////////////////////

  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
  
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
  
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
  
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
  
        setAudioUrl(audioUrl);
  
        // Update postinvalue with recorded audio
        setpostinvalue((prev) => ({
          ...prev,
          receivernumber: userid?.id,
          files: new File([audioBlob], 'audio.wav', { type: 'audio/wav' }),
        }));
      };
  
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    sendmessage()
    setIsRecording(false);
    // messagesending()
  };
useEffect(()=>{
 
},[audioChunks])
console.log("postinvalue in audio",audioUrl)
const outsidehandil = () =>{
  sestdetails(false)
}
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="bg-slate-200 h-screen"
      
    >
      <div className="bg-slate-200 h-16 flex items-center justify-between cursor-pointer" onClick={()=>sestdetails(!details)}>
        <div className="flex items-center   ml-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
              src={
                users?.profileimage
                  ? users?.profileimage.profileimage || users?.profileimage
                  : profileimage
              }
              alt="profile image"
            />
          </div>
          <div className="ml-2">
            <h1>{contact?.find((item)=>item.profileimage._id == userid.id)?.name || null}</h1>
            <p className="text-gray-500 text-xs">
              {users?.number}
            </p>
          </div>
        </div>

        <div className="flex gap-8 mr-5 text-gray-500 text-xl">
          <span title="Vide call">
            <FaVideo />
          </span>
          <span title="Audio call">
            <FaPhoneAlt />
          </span>
          <span title="Search" className="" onClick={() => setFocus(true)}>
            <IoSearchSharp className="text-2xl" />
            {focus ? (
              <div className="flex justify-center items-center p-4 bg-white absolute right-10">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none border-b-2 "
                
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocus(false);
                  }}
                >
                  <IoIosClose className="text-3xl" />
                </button>
              </div>
            ) : null}
          </span>

          <span
            title="Menu"
            className="relative"
            onClick={() => setSidebar((prev) => !prev)}
          >
            <BsThreeDotsVertical />
            {sidebar && (
              <div className="p-4 bg-white absolute right-2 top-10 shadow-lg w-64 z-40">
                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setTabs("newgroup")}
                >
                  Contact info
                </h1>
                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setTabs("starede")}
                >
                  Select messages
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Select chats
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Close chat
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Disappearing messages
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Clear chat
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Delete chat
                </h1>
              </div>
            )}
          </span>
        </div>
      </div>

      {/* /////////////////////////  PROFILE DETAILS PAGE  //////////// */}

      {
       details ? (
        <div className="w-96   bg-slate-200 border-2 border-slate-300 max-h-screen absolute top-0 flex z-50 ">
          <div className="w-36 h-auto bg-slate-300 p-2 ">
            <div className={`flex items-center gap-3 p-2 border-b-2 border-slate-400 ${infotab == "overview" ? "bg-slate-400":null} hover:bg-slate-400 cursor-pointer`} onClick={()=>setinfotab("overview")}> <PiWarningCircle/> Overview</div>
            <div className={`flex items-center gap-3 p-2 border-b-2 border-slate-400 ${infotab == "star" ? "bg-slate-400":null} hover:bg-slate-400 cursor-pointer`} onClick={()=>setinfotab("star")}> <FaRegStar/> Stred </div>

          </div>
          <div className="w-full flex flex-col gap-1 items-center pt-8">
           {infotab == "overview" && ( <><div className="w-32 h-32 border-2 border-slate-300 rounded-full overflow-hidden">
            <img
            className="w-32 h-32 rounded-full "
              src={
                users?.profileimage
                  ? users?.profileimage.profileimage || users?.profileimage
                  : profileimage
              }
              alt="profile image"
            />
            </div>
            <h1 className="text-2xl mt-8">{contact?.find((item)=>item.profileimage._id == userid.id)?.name || null}</h1>
            <h1>{findmessagesender?.about}</h1>
            <h1>{users?.number}</h1>

            <div className="flex">
              <div className="w-24 bg-gray-400 flex flex-col justify-center items-center p-2 rounded-md m-2 gap-2 cursor-pointer">
              <FaVideo />


                <h1>Video</h1>
              </div>
              <div className="w-24 bg-gray-400 flex flex-col justify-center items-center p-2 rounded-md m-2 gap-2 cursor-pointer">
              <FaPhoneAlt />
                <h1>Voice</h1>
                </div>

            </div></>)}
            {infotab == "star" && (<div className="w-full h-full overflow-y-auto pb-14">
              {startdmessage?.map((item) => (
  <div
    className={`flex ${
      item?.senderid == user._id ? "justify-end" : "justify-start"
    } relative`}
  >
    <div
      className={`${
        item?.senderid == user._id
          ? "bg-yellow-100"
          : "bg-white"
      } min-w-32 max-w-96 p-2 m-2 h-auto rounded-lg`}
    >
      <button onClick={()=>expandlist(item._id)} className="float-end p-2">{dropdown == item._id ? (<FaChevronUp/>):(<FaChevronDown/>)}</button>
      {
        dropdown == item._id && <div className={`w-auto bg-white absolute z-50 ${item?.senderid == user._id ?"right-2":"left-2"}  top-12 flex flex-col`}>
        <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start" onClick={()=>deleteitem(item._id)}>Delete</button>
        {/* <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start">Forwoard</button> */}
        <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start" onClick={()=>strarmesssage(item._id)}>star</button>


      </div>
      }
      <h1>{item?.text}</h1>
      
      <div>
      {item.image && (
        <div className="image-container group relative w-full overflow-hidden">
          <img
            src={item.image}
            alt="Example"
            ref={imageRef}
            className="w-full h-auto transition-all duration-300 group-hover:blur-sm"
          />
          <div className="controls absolute top-0 left-0 w-full h-full  flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openFullscreen}
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
            >
              <MdFullscreen size={24} />
            </button>
            <a href={item.image} download>
              <button className="bg-green-500 text-white px-4 py-2 rounded m-2">
                <MdDownload size={24} />
              </button>
            </a>
          </div>
        </div>
      )}

        {item.audio && <audio controls src={item.audio} className="w-56"></audio>}
        {item.video && <video controls src={item.video}></video>}
      </div>
      <h1 className="text-xs flex justify-end mt-2">
      {item.star ? (<FaRegStar/>):(null)}
      <IoCheckmarkDoneOutline/>
        {new Date(item.date).toLocaleDateString()}
        
      </h1>

    </div>
    

  </div>
))}
 
            </div>) }
          </div>
      </div>
       ) :(null)
      }

            
      <div className="absolute bottom-0 h-14 bg-slate-200 w-full z-50">
      {file && <span className=" w-full absolute bottom-full z-50 group h-96 overflow-y-auto">
            {file && <div className="">
              <div className="controls absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="group-hover:p-3 rounded-full group-hover:bg-slate-500" onClick={removeimage}><RxCross1 className="text-4xl font-extrabold text-white"/></button>
          </div>
              <img
                         src={file ? URL.createObjectURL(file) : 'default-image-url'}
                         alt="User Profile Image"
                         className="w-full h-auto object-cover bg-black"
                       />
                       <video  src={file ? URL.createObjectURL(file) : 'default-image-url'}></video>
            </div>

        }
            </span>}
       <div className=" h-14 bg-slate-200 w-full flex justify-between items-center px-5 focus:bg-slate-400">
       <span
          title="Menu"
          className="relative cursor-pointer"
          onClick={() => setpop((prev) => !prev)}
        >
          {!pop ? (
            <FaPlus className="text-gray-500" />
          ) : (
            <GrFormClose className="text-gray-500 text-2xl" />
          )}
          {pop && (
            <div className="p-4 bg-white absolute bottom-10 shadow-lg w-52 rounded-lg z-50">
              <h1
                className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                } // Trigger the file input click
              >
                <input
                  type="file"
                  className="hidden" // Hides the input
                  onChange={uploadfile}
                />
                <IoDocumentText className="mr-2 text-blue-500 text-2xl" />
                Document
              </h1>

              <h1
                className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                } // Trigger the file input click
              >
                <input
                  type="file"
                  className="hidden" // Hides the input
                  onChange={uploadfile}
                />
                <IoMdPhotos className="mr-2 text-blue-500 text-2xl" />
                Photos & videos
              </h1>
              <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center">
                <FaCamera className="mr-2 text-red-500 text-2xl" />
                Camera
              </h1>
              <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center">
                <RiUser3Fill className="mr-2 text-blue-500 text-2xl" />
                Contact
              </h1>
              <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center">
                <BiPoll className="mr-2 text-yellow-500 text-2xl" />
                Poll
              </h1>
              <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center">
                <PiStickerDuotone className="mr-2 text-gray-500 text-2xl" />
                New sticker
              </h1>
            </div>
          )}
        </span>

        {
          isRecording ? ("start recording ....."):(<div className="flex w-full mx-10 p-2 rounded-lg bg-white ">
            <PiStickerBold className="text-2xl text-gray-500 cursor-pointer" />
            <input
              type="text"
              // onFocus={()=>{setFocusing(true)}}
              // onBlur={()=>setFocusing(false)}
              className="mx-5 w-full outline-none"
              placeholder="Type a message"
              onChange={posttextmessage}
              value={postinvalue?.message}
            />
          </div>)
        }
        <div>
          <input
            type="file"
            className="hidden"
            onChange={uploadfile}
          />
          {inputvalu || file ? (
            <button onClick={messagesending} >
              <LuSendHorizontal className="text-2xl text-gray-500 cursor-pointer" />
            </button>
          ) : (
            // <button >
            //   <IoMdMic className="text-2xl text-gray-500 cursor-pointer" />
            // </button>
            <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? (<CgRecord className="text-2xl text-gray-500 cursor-pointer"/>) : ( <IoMdMic className="text-2xl text-gray-500 cursor-pointer" />)}
    </button>
          )}
        </div>
       </div>
      </div>
      {/* ------dispaly user messages ------- */}

      <div className="overflow-y-scroll h-5/6 pb-5 messages-container" onClick={outsidehandil}>
      {messagess?.map((item) => (
  <div
    className={`flex ${
      item?.senderid == user._id ? "justify-end" : "justify-start"
    } relative`}
  >
    <div
      className={`${
        item?.senderid == user._id
          ? "bg-yellow-100"
          : "bg-white"
      } min-w-32 max-w-96 p-2 m-2 h-auto rounded-lg`}
    >
      <button onClick={()=>expandlist(item._id)} className="float-end p-2">{dropdown == item._id ? (<FaChevronUp/>):(<FaChevronDown/>)}</button>
      {
        dropdown == item._id && <div className={`w-auto bg-white absolute z-50 ${item?.senderid == user._id ?"right-2":"left-2"}  top-12 flex flex-col`}>
        <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start" onClick={()=>deleteitem(item._id)}>Delete</button>
        {/* <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start">Forwoard</button> */}
        <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start" onClick={()=>strarmesssage(item._id)}>star</button>


      </div>
      }
      <h1>{item?.text}</h1>
      
      <div>
      {item.image && (
        <div className="image-container group relative w-full overflow-hidden">
          <img
            src={item.image}
            alt="Example"
            ref={imageRef}
            className="w-full h-auto transition-all duration-300 group-hover:blur-sm"
          />
          <div className="controls absolute top-0 left-0 w-full h-full  flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={openFullscreen}
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
            >
              <MdFullscreen size={24} />
            </button>
            <a href={item.image} download>
              <button className="bg-green-500 text-white px-4 py-2 rounded m-2">
                <MdDownload size={24} />
              </button>
            </a>
          </div>
        </div>
      )}

        {item.audio && <audio controls src={item.audio}></audio>}
        {item.video && <video controls src={item.video}></video>}
      </div>
      <h1 className="text-xs flex justify-end mt-2">
      {item.star ? (<FaRegStar/>):(null)}
      <IoCheckmarkDoneOutline/>
        {new Date(item.date).toLocaleDateString()}
        
      </h1>

    </div>
    

  </div>
))}
 

         <div>
          {/* Input for the message */}
          {/* <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button> */}

          {/* List of messages */}
        </div>
      </div>
    </div>
  );
}

export default memo(Spacificuser);
