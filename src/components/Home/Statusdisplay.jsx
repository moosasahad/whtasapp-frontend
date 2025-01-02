import React, { useContext, useEffect, useState } from 'react'
import { contactcontext } from '../Component/Contact'
import { usercontext } from '../Component/Usercontext'
import { axiosPrivate } from '../../Axiosinstens'

function Statusdisplay(props) {
  console.log("props instatus",props.porps.allstatus)
  const displayingstatus = props.porps.allstatus?.filter((item)=>item.userId == props.porps.display )
  console.log("displayingstatus",displayingstatus)
  const {state} = useContext(contactcontext)


    const [currentIndex, setCurrentIndex] = useState(0);

  if(currentIndex >= displayingstatus.length ){
    props.porps.setdisplay()
  }
  console.log("props.porps.setdisplay()",displayingstatus.length-1)
  console.log("props.porps.",currentIndex)

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1));
    };
  
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + displayingstatus.length) % displayingstatus.length);
    };
  return (
    <div className='w-full h-full bg-slate-300 absolute z-50'>
      
      <div className=" w-full h-full bg-gray-900 py-3">
      <div className=" absolute flex items-center w-full ">
          <div className='flex justify-center items-center gap-2 pl-2'>
          <img
            src={
              state?.find((value) => value.profileimage._id === displayingstatus[currentIndex]?.userId)
                ?.profileimage?.profileimage || "/default-profile.jpg"
            }
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-white">{
              state?.find((value) => value.profileimage._id === displayingstatus[currentIndex]?.userId)
                ?.name || ""
            }</h2>
          </div>
            {/* <button
          onClick={() => props.porps.setdisplay()}
          className="absolute top-1 right-4 text-white text-xl bg-gray-800 p-2 rounded-full z-50 w-10 h-10 flex justify-center items-center"
        >
          &times;
        </button> */}
        </div>
        

        <div className="w-full h-full flex items-center justify-center">
          {displayingstatus[currentIndex]?.type === "image" && (
            <img
              src={displayingstatus[currentIndex]?.content}
              alt="status"
              className="max-w-full max-h-full object-contain"
            />
          )}
          {displayingstatus[currentIndex]?.type === "video" && (
            <video
              src={displayingstatus[currentIndex]?.content}
              autoPlay
              loop
              
              className="max-w-full max-h-full object-contain"
            ></video>
          )}
          {displayingstatus[currentIndex]?.type === "text" && (
            <h1 className="text-white text-2xl">{displayingstatus[currentIndex]?.content}</h1>
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-full text-white text-2xl p-2 rounded-full"
        >
          {/* &larr; */}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 h-full text-white text-2xl p-2 rounded-full"
        >
          {/* &rarr; */}
        </button>

        
      </div>
 
    </div>
  )
}

export default Statusdisplay
 

///////////////////////////////  USER STATUS DISPALYING COMPONENT  //////////////////////////////////


export const Userstatus = ({ props }) => {
  const { state } = useContext(usercontext);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= props.userstatus.length) {
      props.setuserdisplay(false);
    }
  }, [currentIndex, props]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % props.userstatus.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + props.userstatus.length) % props.userstatus.length);
  };

  const deletestatus = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/deleteStatus/${id}`);
      console.log("Status deleted:", res.data);
    } catch (error) {
      console.log("Status delete error:", error);
    }
  };
if(currentIndex >= props?.userstatus.length-1 ){
    props.setuserdisplay(false)
  }
  return (
    <div className="absolute w-full h-full z-50">
      <div className="w-full h-full bg-gray-900 flex items-center justify-center p-4">
       
        <div className="absolute top-4 flex items-center justify-between w-full px-3">
          <div className="flex items-center gap-3">
            <img
              src={state.profileimage}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-white">{state.name}</h2>
          </div>
          <button
            onClick={() => deletestatus(props.userstatus[currentIndex]?._id)}
            className="text-white text-xl p-2 bg-black rounded-full z-50"
          >
            &times;
          </button>
        </div>

        
        <div className="w-full h-full flex items-center justify-center">
          {props.userstatus[currentIndex]?.type === "image" && (
            <img
              src={props.userstatus[currentIndex]?.content}
              alt="status"
              className="max-w-full max-h-full object-contain"
            />
          )}
          {props.userstatus[currentIndex]?.type === "video" && (
            <video
              src={props.userstatus[currentIndex]?.content}
              autoPlay
              loop
              className="max-w-full max-h-full object-contain"
            ></video>
          )}
          {props.userstatus[currentIndex]?.type === "text" && (
            <h1 className="text-white text-2xl">{props.userstatus[currentIndex]?.content}</h1>
          )}
        </div>

       =
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 h-full rounded-full"
        >
          {/* &larr; */}
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 h-full rounded-full"
        >
          {/* &rarr; */}
        </button>
      </div>
    </div>
  );
};