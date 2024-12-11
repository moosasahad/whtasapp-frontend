import React from "react";
import communtiyimage from "../../../Images/new community.png";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Communitie({ setTabs }) {
  return (
    <div>
      <div className="flex gap-7 pl-3">
        <button onClick={() => setTabs("contacts")}>
          <FiArrowLeft className="text-2xl text-gray-600 " />
        </button>
        <h1>New Chat</h1>
      </div>
      <div className="mt-24">
        <div>
        <div>
          <img src={communtiyimage} alt="" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl text-center mb-5 mt-10">
            Create a new community Bring
          </h1>
          <p className="text-slate-500 text-sm text-center">
            together a neighborhood, school or more. <br />
            Create topic-based groups for members, and easily <br /> send them
            admin announcements.
          </p>
        </div>
        <div className="flex justify-center mt-5">
          <p
            className="flex w-fit hover:underline cursor-pointer text-emerald-600 text-sm items-center"
            onClick={() => setTabs("Communities")}
          >
            See example communities
            <span className="flex items-center justify-center ml-1 mr-1 text-2xl">
              <MdOutlineKeyboardArrowRight />
            </span>
          </p>
        </div>
        </div>
        <div className="flex justify-center mt-12">
        <button className="w-12 h-12 bg-green-500 flex justify-center items-center rounded-full"
        onClick={()=>setTabs((priv)=>priv)}
        >
        <FiArrowRight className="text-2xl text-gray-600 " />
        </button>
        </div>
      </div>
    </div>
  );
}

export default Communitie;
