import React, { useContext, useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa6";
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



function Spacificuser({userid}) {
  const [focus, setFocus] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [pop, setpop] = useState(false);
  const {state}= useContext(Product)
  const [userids,setuserid]=useState(null)
  const [usermeesage,setUsermessage]=useState([])
  const [focusing,setFocusing]=useState('')
  console.log("dsjfgsjdfg focusing",focusing);
  
  useEffect(()=>{
    setuserid(userid)
    console.log("dfjsdhfksd",userids);
  },[userid])
  console.log("userid props",userids);

useEffect(()=>{
  const contact = async ()=>{
    try {
      const res = await axiosPrivate.get("/getallcontatc");
      console.log("res get contact", res.data.data.contacts);
      const respon = res.data.data;
      const findemesagger = res.data.data.contacts.find((value) =>value._id==userids)
      setUsermessage(findemesagger)
      console.log("finde messager = ",findemesagger);
      
    } catch (error) {
      console.log("Error in contact post", error);
    }
  }
  contact()
},[userids])
console.log("jgagshsgda usermeesage",usermeesage);

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="bg-slate-200 h-screen"
      
    >
      <div className="bg-slate-200 h-16 flex items-center justify-between cursor-pointer">
        <div className="flex items-center   ml-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={usermeesage?.profileimage? usermeesage?.profileimage.profileimage:profileimage} alt="profile image" />
          </div>
          <div className="ml-2">
            <h1>{usermeesage?.name}</h1>
            <p className="text-gray-500 text-xs">{usermeesage?.number}</p>
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
              <div className="p-4 bg-white absolute right-2 top-10 shadow-lg w-64">
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

      <div className="absolute bottom-0 h-14 bg-slate-200 w-full flex justify-between items-center px-5 focus:bg-slate-400">
        <span
          title="Menu"
          className="relative cursor-pointer"
          onClick={() => setpop((prev) => !prev)}
        >
          {!pop ? (<FaPlus className="text-gray-500" />):(<GrFormClose className="text-gray-500 text-2xl" />)}
          {pop && (
            <div className="p-4 bg-white absolute bottom-10 shadow-lg w-52 rounded-lg">
              <h1
                className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                } // Trigger the file input click
              >
                <input
                  type="file"
                  className="hidden" // Hides the input
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

        <div className="flex w-full mx-10 p-2 rounded-lg bg-white ">
          <PiStickerBold className="text-2xl text-gray-500 cursor-pointer" />
          <input
            type="text"
            onFocus={()=>{setFocusing(true)}}
            onBlur={()=>setFocusing(false)}
            className="mx-5 w-full outline-none"
            placeholder="Type a message"
          />
        </div>
        <div>
          <input
            type="file"
            className="hidden"
           
            onChange={(e) => {
              // Handle file upload logic here
              const file = e.target.files[0];
              console.log("Selected file:", file);
            }}
          />
          {focusing?(<LuSendHorizontal className="text-2xl text-gray-500 cursor-pointer" />):(<IoMdMic className="text-2xl text-gray-500 cursor-pointer" />)}
        </div>
      </div>
      {/* ------dispaly iser messages ------- */}

      
      <div>
        {/* {usermeesage.number} */}
        {usermeesage?.name}

      </div>
    </div>
  );
}

export default Spacificuser;
