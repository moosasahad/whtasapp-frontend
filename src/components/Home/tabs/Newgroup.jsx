import React, { useContext, useState } from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { contactcontext } from '../../Component/Contact';
import { BiCross } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { groupcontextsender } from '../../Component/groupcontext';


function Newgroup({setTabs}) {
  const {state} = useContext(contactcontext)
  const {inputdata,setinputdata,creategroup}= useContext(groupcontextsender)
  const [clik,setclik] = useState({
    data:[ ],
  })
  console.log("clik values",clik)
  const collectmembers = (value)=>{
    console.log("click",clik)
    const findexisting= inputdata?.members?.find((item)=>item._id == value._id)
    console.log("findexisting",findexisting)
    if(!findexisting){
      setinputdata((priv) => ({
        ...priv,
        members: [...(priv?.members || []), value], 
      }));
    }
  }

  const removeiteminstate = (id)=>{
console.log(id)
const filterd = inputdata?.members?.filter((item)=>item._id !== id)
setinputdata({members:filterd})
 
  }
  return (
    <div>
      <div className='flex gap-7 pl-3'>
        <button onClick={()=>setTabs('contacts')}>
        <FiArrowLeft className='text-2xl text-gray-600 '/>
        </button>
        <h1>New group</h1>
      </div>
      <div>
        <button className='text-gray-600 text-2xl relative top-9 left-3'>
            {/* <IoMdSearch/> */}
            <FiArrowLeft/>
        </button>
        <input 
        type="text" 
        placeholder='Searc name or number'
        className='w-full bg-slate-200 p-1 pl-16 rounded-md'
        />
      </div>
      <div>
        <div>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
  <div>
    <label className="block text-gray-700 font-medium mb-2">Group Name</label>
    <input
      type="text"
      placeholder="Enter group name"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setinputdata((priv)=>({...priv,groupName:e.target.value}))}
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-2">Add Profile Image</label>
    <input
      type="file"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setinputdata((priv)=>({...priv,files:e.target.files[0]}))}

    />
  </div>
  <div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      onClick={()=>creategroup()}
    >
      Submit
    </button>
  </div>
</div>

<div className="p-2 flex flex-wrap">
  {inputdata?.members?.map((item) => (
    <div
      className="flex justify-center items-center bg-green-400 text-white rounded-lg m-1 p-1 cursor-pointer hover:bg-green-500 transition duration-200"
      onClick={() => removeiteminstate(item._id)}
      key={item._id}
    >
      <span className="pl-2">{item.name}</span>
      <RxCross2 className="cursor-pointer ml-2 text-lg" />
    </div>
  ))}
</div>

<div className='h-72 overflow-y-auto'>
  {state?.map((value) => (
    <div
      className="h-auto m-2 bg-white shadow-md rounded-lg p-3 cursor-pointer flex items-center justify-between border border-gray-200 hover:shadow-lg transition duration-200"
      key={value._id}
    >
      <div className="flex items-center">
        <div className="w-16 h-16 overflow-hidden mr-4">
          <img
            src={value?.profileimage?.profileimage}
            alt="profile"
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-gray-700 font-semibold text-lg">{value.name}</h1>
          <h5 className="text-gray-500 text-sm">{value.number}</h5>
        </div>
      </div>
      <div>
        <div
          className={`w-6 h-6 flex items-center justify-center ${
            inputdata?.members?.find((item) => item._id === value._id)
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          } border border-black rounded-full cursor-pointer hover:bg-green-400 hover:text-white transition duration-200`}
          onClick={() => collectmembers(value)}
        >
          {inputdata?.members?.find((item) => item._id === value._id) ? "✓" : ""}
        </div>
      </div>
    </div>
  ))}

</div>

        </div>
      </div>
    </div>
  )
}

export default Newgroup
