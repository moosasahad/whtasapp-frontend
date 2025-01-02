import React, { useContext, useState } from "react";
import profileimage from "../../../Images/profile image.png";
import { FaPen } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { IoCamera } from "react-icons/io5";
import { usercontext } from "../../Component/Usercontext";
import { axiosPrivate } from "../../../Axiosinstens";
import { toast } from "react-toastify";

function Profile() {
  const [edit, setEdit] = useState(true);
  const [abouedit, setaboutEdit] = useState(true);
  const { state,getprofile } = useContext(usercontext);
  console.log("sdfghjk profile", state);
  const [inputdata, setinputdata] = useState({
    name:state.name,
    about:state.about,
  });
  const [image, setimgae] = useState();

  console.log("updating input value", inputdata);
  const [inpu, setInput] = useState("jhsjd");


  const updateprofiledata = async () => {
    console.log("hallow ")
    try {
      const res = axiosPrivate.patch("/updateprofile",inputdata);
      getprofile()
      toast.success("updated", {
              style: {
                  width: "150px",
                  height: "10px",
                 
                },
            });
      console.log("profile update res", res.data);
    
      getprofile()
    } catch (error) {
      console.log("profile update error", error);
    }
  };
  console.log("updateimage", image);
  if (image) {
    const updateimage = async () => {
      const formdata = new FormData();
      formdata.append("image", image);
      try {
        const res = axiosPrivate.patch("/updateprofile", formdata);
        getprofile()
        toast.success("image updated", {
                style: {
                    width: "250px",
                    height: "10px",
                   
                  },
              });
             
        console.log("profile update res", res.data);
        setimgae()
      } catch (error) {
        console.log("profile update error", error);
      }
    };
    updateimage();
  }
  return (
    <div className="overflow-x-scroll h-full">
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="w-64 h-64 flex justify-center items-center relative mx-auto">
          <div className="w-64 h-64 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={state ? state.profileimage : profileimage}
              alt="Profile"
            />
          </div>

          <label className="absolute top-0 left-0 w-64 h-64 rounded-full bg-slate-400 bg-opacity-50 flex flex-col justify-center items-center text-white text-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            {/* Camera Icon and Text */}
            <div className="flex flex-col items-center">
              <IoCamera className="text-3xl m-2" />
              <h6 className="text-xs">
                CHANGE
                <br />
                PROFILE PHOTO
              </h6>
            </div>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setimgae(e.target.files[0])}
              onClick={() => console.log("cliked image")}
            />
          </label>
        </div>
      </div>
      <div className="text-gray-500 p-5 ">
        <p className="text-gray-500 text-sm">Your name</p>
        {edit ? (
          <div className="flex justify-between py-6">
            <h1>{state?.name}</h1>
            <span
              className="cursor-pointer w-5 h-5"
              onClick={() => setEdit(!edit)}
            >
              <FaPen className="text-gray-500" />
            </span>
          </div>
        ) : (
          <div className="flex justify-between py-6">
            <input
              type="text"
              onChange={(e) => setinputdata({name:e.target.value})}
              value={(inputdata.name)}
              className="outline-none border-b-2 border-gray-500 w-full"
            />
            <span className="cursor-pointer" onClick={() =>{ setEdit(!edit),updateprofiledata()}}>
              <FiCheck className="text-gray-500 text-2xl" />
            </span>
          </div>
        )}
      </div>
      <p className="text-gray-500 text-sm ml-4">Your number</p>
      <div className="flex justify-between py-6 text-gray-500 ml-6">
        <h1>{state?.number}</h1>
      </div>
      <div>
        <p className="p-3 text-xs text-gray-500 bg-slate-200 my-5">
          This is not your username or PIN. This name will be visible to your
          WhatsApp contacts.
        </p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">About</p>
        {abouedit ? (
          <div className="flex justify-between py-6">
            <h1>{state?.about}</h1>
            <span
              className="cursor-pointer w-5 h-5"
              onClick={() => setaboutEdit(!abouedit)}
            >
              <FaPen className="text-gray-500" />
            </span>
          </div>
        ) : (
          <div className="flex justify-between py-6">
            <input
              type="text"
              onChange={(e) => setinputdata({about:e.target.value})}
              value={(inputdata.about)}
              className="outline-none border-b-2 border-gray-500 w-full"
            />
            <span
              className="cursor-pointer"
              onClick={() =>{ setaboutEdit(!abouedit),updateprofiledata()}}
            >
              <FiCheck className="text-gray-500 text-2xl" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
