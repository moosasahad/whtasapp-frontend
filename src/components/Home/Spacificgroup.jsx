import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { FaChevronUp, FaRegStar, FaVideo } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoCheckmarkDoneOutline, IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import profileimage from "../../Images/profile image.png";
import background from "../../Images/backgroun.png";
import { IoIosClose, IoMdPersonAdd } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { PiStickerBold, PiWarningCircle } from "react-icons/pi";
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
import io, { Socket } from "socket.io-client";
import { usercontext } from "../Component/Usercontext";
import { MdFullscreen } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { groupcontextsender } from "../Component/groupcontext";
import { CgRecord } from "react-icons/cg";
import { IoIosContacts } from "react-icons/io";
import { contactcontext } from "../Component/Contact";
import { ImUserPlus } from "react-icons/im";
import { toast } from "react-toastify";
 
function Spacificgroup() {
  const [focus, setFocus] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [inputvalu, setinputvalue] = useState("");
  const [pop, setpop] = useState(false);
  const {
    groups,
    sendmessageongroup,
    postinvalue,
    setpostinvalue,
    getgrups,
    spacificgroup,
    Getgroupmessage,
  } = useContext(groupcontextsender);
  const { userid } = useContext(Product);
  const [userids, setuserid] = useState(null);
  const [focusing, setFocusing] = useState("");
  const { state: user } = useContext(usercontext);
  const [file, setfile] = useState("");
  const [dropdown, setdropdown] = useState(false);
  const [details, sestdetails] = useState(false);
  const [infotab, setinfotab] = useState("overview");
  const { state, input, setinput, sercheddata } = useContext(contactcontext);
  const [addgroup, setaddgroup] = useState(true);

  //////////////// FINDING SPACIFIC GROUP //////////////////////
  //   const [spacificgroup,setspacificgroup]= useState([])
  //   const spacificgroup = groups?.find((item) => item._id == userid.id);
  console.log("spacificgroup -- spacificgroup", spacificgroup);
  // useEffect(()=>{
  //   setspacificgroup(spacificgroup)

  // },[dropdown])

  console.log("sending group data", postinvalue);
  useEffect(() => {
    setuserid(userid);
  }, [userid]);

  useEffect(() => {
    const container = document.querySelector(".messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [userid,groups,spacificgroup]);

  const posttextmessage = (e) => {
    setinputvalue(e.target.value);
    setpostinvalue({
      groupid: spacificgroup?._id,
      message: e.target.value,
    });
  };
  const uploadfile = (e) => {
    setfile(e.target.files[0]);
    setpostinvalue((previce) => ({
      ...previce,
      groupid: spacificgroup?._id,
      files: e.target.files[0],
    }));
    console.log(e.target.files[0]);
    sendmessage();
  };

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

  const messagesending = () => {
    sendmessageongroup();
    setinputvalue();
    setpop(false);
    // sendmessageongroup();
    setpostinvalue({ message: "" });
    setfile();
  };
  //----------------------- removeimage --------------------- //
  const removeimage = () => {
    setfile();
    setpop(false);
    setpostinvalue();
  };
  // ------------------ delete message ---------------------//
  const deleteitem = async (id) => {
    try {
      const res = await axiosPrivate.delete(
        `deletemessagegroupmessage/${spacificgroup?._id}/${id}`
      );
      console.log("res delete", res.data);
      getgrups();
      Getgroupmessage()
      setdropdown(null);
    } catch (error) {
      console.log("delet error", error);
    }
  };
  const expandlist = (id) => {
    if (id == dropdown) {
      setdropdown(null);
    } else {
      setdropdown(id);
    }
  };

  ///////////////// STAR MESSAGE ///////////////////////
  const strarmesssage = async (id) => {
    console.log("dsjkdhshdjskhskjdhskjdhsjhsjkd");
    try {
      const res = await axiosPrivate.patch(
        `stargroupemessage/${spacificgroup?._id}/${id}`
      );
      console.log("res star", res.data);
      getgrups();
      setdropdown(null)
      Getgroupmessage()

    } catch (error) {
      console.log("star error", error);
    }
  };

  ////////////////// FNDING ////////////

  const startdmessage = spacificgroup?.messages?.filter((item) => item.star);
  console.log("startdmessage", startdmessage);

  ///////////////////////    GROUPE MEMBERS  /////////////////////////////

  ////////////////////////////////////////////   AUDIO RECODING /////////////////////////////

  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
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
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudioUrl(audioUrl);

      // Update postinvalue with recorded audio
      setpostinvalue((prev) => ({
        ...prev,
        groupid: spacificgroup?._id,
        files: new File([audioBlob], "audio.wav", { type: "audio/wav" }),
      }));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    setIsRecording(false);
    
    return messagesending();
  };
  useEffect(() => {}, [audioChunks]);
  console.log("postinvalue in audio", audioUrl);
  const outsidehandil = () => {
    sestdetails(false);
  };

  console.log("contacts == contacts ", state);

  ///////////////////////////////////////  ADD MEMBERSE IN GROUP //////////////////////////

  const admebersingroup = async (id) => {
    console.log("groupuser id", id);

    try {
      const res = await axiosPrivate.patch(
        `addmembersingroup/${id}/${spacificgroup?._id}`
      );
      console.log("res.admebersingroup", res.data);
      toast.success("added", {
        style: {
          width: "150px",
          height: "10px",
        },
      });
    } catch (error) {
      console.log("admembers error", error);
    }
  };
///////////////////////////////// EXIT GROUP ///////////////////////

const exitgroup =async ()=>{
  try {
    const res =await axiosPrivate.post(`exitgroup/${userid?.id}`)
    console.log("exiting group res",res)
  } catch (error) {
    console.log("exiting group error",error)
    
  }
  console.log("exitgroup",userid?.id)
}
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="bg-slate-200 h-screen"
    >
      <div
        className="bg-slate-200 h-16 flex items-center justify-between cursor-pointer"
        
      >
        <div className="flex items-center   ml-3">
          <div className="w-14 h-14 rounded-full overflow-hidden z-50" onClick={() => sestdetails(!details)}>
            <img
              src={
                spacificgroup?.groupImage
                  ? spacificgroup?.groupImage
                  : profileimage
              }
              alt="profile image"
            />
          </div>
          <div className="ml-2">
            <h1>{spacificgroup?.groupName}</h1>
          </div>
        </div>

        <div className="flex gap-8 mr-5 text-gray-500 text-xl">
          <span title="Vide call" className="z-50">
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
                  onClick={() => sestdetails(!details)}
                >
                  Contact info
                </h1>
                <h1
                  className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>{ sestdetails(!details),setinfotab("star  ")}}
                >
                  Stard messages
                </h1>
                {/* <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Select chats
                </h1> */}
                {/* <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Close chat
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Disappearing messages
                </h1> */}
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer">
                  Clear chat
                </h1>
                <h1 className="p-2 text-base text-slate-600 hover:bg-gray-100 cursor-pointer" onClick={exitgroup}>
                  Exit group
                </h1>
              </div>
            )}
          </span>
        </div>
      </div>
      {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   PROFILE DETAILS PAGE     /////////////////////////////////// */}

      {details ? (
        <div className="w-96 h-4/6  bg-slate-200 border-2 border-slate-300 max-h-screen absolute top-0 flex z-50 ">
          <div className="w-36 h-auto bg-slate-300 p-2 ">
            <div
              className={`flex items-center gap-3 p-2 border-b-2 border-slate-400 ${
                infotab == "overview" ? "bg-slate-400" : null
              } hover:bg-slate-400 cursor-pointer`}
              onClick={() => setinfotab("overview")}
            >
              {" "}
              <PiWarningCircle /> Overview
            </div>
            <div
              className={`flex items-center gap-3 p-2 border-b-2 border-slate-400 ${
                infotab == "star" ? "bg-slate-400" : null
              } hover:bg-slate-400 cursor-pointer`}
              onClick={() => setinfotab("star")}
            >
              {" "}
              <FaRegStar /> Stared{" "}
            </div>
            <div
              className={`flex items-center gap-3 p-2 border-b-2 border-slate-400 ${
                infotab == "members" ? "bg-slate-400" : null
              } hover:bg-slate-400 cursor-pointer`}
              onClick={() => setinfotab("members")}
            >
              {" "}
              <IoIosContacts /> Members{" "}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 items-center pt-8">
            {/* /////////////////////////////// OVERVIEW //////////////////// */}

            {infotab == "overview" && (
              <>
                <div className="w-32 h-32 border-2 border-slate-300 rounded-full overflow-hidden">
                  <img
                    src={
                      spacificgroup?.groupImage
                        ? spacificgroup?.groupImage
                        : profileimage
                    }
                    alt="profile image"
                  />
                </div>
                <h1>{spacificgroup?.groupName}</h1>

                <div className="flex">
                  <div className="w-24 bg-gray-400 flex flex-col justify-center items-center p-2 rounded-md m-2 gap-2 cursor-pointer">
                    <FaVideo />

                    <h1>Video</h1>
                  </div>
                  <div className="w-24 bg-gray-400 flex flex-col justify-center items-center p-2 rounded-md m-2 gap-2 cursor-pointer">
                    <FaPhoneAlt />
                    <h1>Voice</h1>
                  </div>
                </div>
              </>
            )}

            {/* ///////////////////////////////////////// STAR //////////////////////////// */}

            {infotab == "star" && (
              <div className="w-full h-full overflow-y-auto pb-14">
                {startdmessage?.map((item) => (
                  <div
                    className={`flex ${
                      item?.senderid == user._id
                        ? "justify-end"
                        : "justify-start"
                    } relative`}
                  >
                    <div
                      className={`${
                        item?.senderid == user._id
                          ? "bg-yellow-100"
                          : "bg-white"
                      } min-w-32 max-w-96 p-2 m-2 h-auto rounded-lg`}
                    >
                      <button
                        onClick={() => expandlist(item?._id)}
                        className="float-end p-2"
                      >
                        {dropdown == item._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                      {dropdown == item._id && (
                        <div
                          className={`w-auto bg-white absolute z-50 ${
                            item?.senderid == user._id ? "right-2" : "left-2"
                          }  top-12 flex flex-col`}
                        >
                          <button
                            className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                            onClick={() => deleteitem(item._id)}
                          >
                            Delete
                          </button>
                          {/* <button className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start">Forwoard</button> */}
                          <button
                            className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                            onClick={() => strarmesssage(item._id)}
                          >
                            star
                          </button>
                        </div>
                      )}
                      <h1>{item?.text}</h1>

                      <div>
                        {item.image && (
                          <div className="image-container group relative w-full overflow-hidden">
                            <img
                              src={item?.image}
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

                        {item.audio && (
                          <audio
                            controls
                            src={item.audio}
                            className="w-56"
                          ></audio>
                        )}
                        {item.video && (
                          <video controls src={item.video}></video>
                        )}
                      </div>
                      <h1 className="text-xs flex justify-end mt-2">
                        {item.star ? <FaRegStar /> : null}
                        <IoCheckmarkDoneOutline />
                        {new Date(item.date).toLocaleDateString()}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* /////////////////////// DISPLAY MEMBERS //////////////////////////// */}

            {infotab == "members" && (
              <div className="w-full h-full overflow-y-auto ">
                <h1 className="text-center text-2xl ">Members</h1>
                {addgroup ? (
                  <div
                    className="flex justify-center mt-5 border-b border-gray-400 p-4 cursor-pointer"
                    onClick={() => setaddgroup(false)}
                  >
                    <ImUserPlus className="text-2xl text-gray-500 mr-12" />{" "}
                    <h1>Add membres</h1>
                  </div>
                ) : (
                  <div className="mt-5 border-b border-gray-400 p-4 cursor-pointer">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        onChange={(e) => setinput(e.target.value)}
                        className="outline-none bg-slate-300 rounded-md"
                      />
                      <button
                        className=""
                        onClick={() => {
                          setaddgroup(true), setinput();
                        }}
                      >
                        <RxCross2 className="text-2xl text-green-500" />
                      </button>
                    </div>
                    <div></div>
                  </div>
                )}
                <div>
                  {/* ///////////////////// ADD MEMBERS IN GROUP //////////////////////// */}
                  {input ? (
                    <div className="overflow-y-auto h-96">
                      <h1>
                        {sercheddata.length == 0 ? "number not fount" : null}
                      </h1>
                      {sercheddata?.map((value) => (
                        <div
                          className="flex items-center border-b border-gray-400 cursor-pointer"
                          onClick={() =>
                            admebersingroup(value.profileimage._id)
                          }
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-auto ml-5">
                            <img
                              src={value?.profileimage.profileimage}
                              alt="profile image"
                              className="w-10 h-10 rounded-full overflow-hidden"
                            />
                          </div>
                          <div className="mr-auto">
                            <h1 className="text-lg">{value.name}</h1>
                            <h5 className="text-sm">{value.number}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-y-auto h-96">
                      <div className="flex  justify-center items-center border-b border-gray-400 p-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-auto ml-5">
                          <img
                            src={spacificgroup?.admin.profileimage}
                            alt="profile image"
                            className="w-10 h-10 rounded-full overflow-hidden"
                          />
                        </div>
                        <div className="mr-auto">
                          <h1 className="text-lg">
                            {state?.find(
                              (value) =>
                                value.number === spacificgroup?.admin.number
                            ) ? (
                              <>
                                <h1 className="text-">
                                {
                                  state.find(
                                    (value) =>
                                      value.number ===
                                      spacificgroup?.admin.number
                                  ).name
                                }
                                </h1>
                                <span className="text-sm font-bold pl-3">
                                  admin
                                </span>
                              </>
                            ) : (
                              <h1 className="text-sm text-gray-400 w-24">
                                {spacificgroup?.admin.name}
                                <span className="text-sm font-bold pl-3 text-black">
                                  (admin)
                                </span>
                              </h1>
                            )}
                          </h1>

                          <h1 className="text-sm">
                            {spacificgroup?.admin.number}
                          </h1>
                        </div>
                      </div>
                      {spacificgroup?.members.map((item) => (
                        <div className="flex justify-center items-center border-b border-gray-400 p-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-auto ml-5">
                            <img
                              src={item.membersid?.profileimage}
                              alt="profile image"
                              className="w-10 h-10 rounded-full overflow-hidden"
                            />
                          </div>
                          <div className="mr-auto">
                            <h1 className="text-lg">
                              {" "}
                              {state?.find(
                                (value) =>
                                  value.number == item.membersid?.number
                              )?.name || (
                                <h1 className="text-sm text-gray-400">
                                  {item.membersid?.name}
                                </h1>
                              )}
                            </h1>
                            <h1 className="text-sm">
                              {item.membersid?.number}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-0 h-14 bg-slate-200 w-full z-50">
        {file && (
          <span className=" w-full absolute bottom-full z-50 group h-96 overflow-y-auto">
            {file && (
              <div className="">
                <div className="controls absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="group-hover:p-3 rounded-full group-hover:bg-slate-500"
                    onClick={removeimage}
                  >
                    <RxCross1 className="text-4xl font-extrabold text-white" />
                  </button>
                </div>
                <img
                  src={file ? URL.createObjectURL(file) : "default-image-url"}
                  alt="User Profile Image"
                  className="w-full h-auto object-cover bg-black"
                />
                <video
                  src={file ? URL.createObjectURL(file) : "default-image-url"}
                ></video>
              </div>
            )}
          </span>
        )}
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
            {pop && !file && (
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

          {isRecording ? (
            "start recording ....."
          ) : (
            <div className="flex w-full mx-10 p-2 rounded-lg bg-white ">
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
            </div>
          )}
          <div>
            <input type="file" className="hidden" onChange={uploadfile} />
            {inputvalu || file ? (
              <button onClick={messagesending}>
                <LuSendHorizontal className="text-2xl text-gray-500 cursor-pointer" />
              </button>
            ) : (
              // <button >
              //   <IoMdMic className="text-2xl text-gray-500 cursor-pointer" />
              // </button>
              <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? (
                  <CgRecord className="text-2xl text-gray-500 cursor-pointer" />
                ) : (
                  <IoMdMic className="text-2xl text-gray-500 cursor-pointer" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------dispaly user messages ------- */}

      <div
        className="messages-container overflow-y-scroll h-5/6 pb-5"
        onClick={() => sestdetails(false)}
      >
        {spacificgroup?.messages?.map((item) => (
          <div className="relative ">
            <div
              className={`flex ${
                item?.sendernumber == user.number
                  ? "justify-end group"
                  : "justify-start group"
              }`}
            >
              {item?.sendernumber == user.number && (
                <div className=" flex justify-center opacity-0 group-hover:opacity-100 h-auto">
                  {dropdown == item._id && (
                    <div
                      className={`w-auto h-24 flex flex-col bg-white mt-auto m-auto`}
                    >
                      <button
                        className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                        onClick={() => deleteitem(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                        onClick={() => strarmesssage(item._id)}
                      >
                        star
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => expandlist(item._id)}
                    className="float-end p-2"
                  >
                    {dropdown == item._id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              )}

              <div
                className={`${
                  item?.sendernumber == user.number
                    ? "bg-yellow-100"
                    : "bg-white"
                } min-w-32 w-fit p-2 m-2 h-auto rounded-lg`}
              >
                <div className="flex justify-between">
                  {item?.sendernumber == user.number ? (
                    <h1 className="font-bold text-orange-300">You</h1>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <img
                        src={item?.sender?.profileimage}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <h6 className="text-gray-500">
                        {state?.find(
                          (value) => value.number == item?.sendernumber
                        )?.name || (
                          <h1 className="text-md text-orange-300">
                            {item?.sender?.name}
                          </h1>
                        )}
                      </h6>
                    </div>
                  )}
                </div>

                <h1 className="max-w-xl break-words">{item?.text}</h1>

                <div className="max-w-xl overflow-auto">
                  {item.image && (
                    <div className="image-container group relative w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt="Example"
                        ref={imageRef}
                        className="w-full h-auto transition-all duration-300 group-hover:blur-sm"
                      />
                      <div className="controls absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                  {item.star ? <FaRegStar /> : null}
                  <IoCheckmarkDoneOutline />
                  {new Date(item.date).toLocaleDateString()}
                </h1>
              </div>

              {item?.sendernumber != user.number && (
                <div className="flex justify-center h-auto opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => expandlist(item._id)}
                    className="float-end p-2"
                  >
                    {dropdown == item._id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {dropdown == item._id && (
                    <div
                      className={`w-auto h-24 flex flex-col bg-white mt-auto m-auto`}
                    >
                      <button
                        className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                        onClick={() => deleteitem(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="p-2 text-lg hover:bg-slate-200 pl-4 pr-4 text-start"
                        onClick={() => strarmesssage(item._id)}
                      >
                        star
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Spacificgroup);
