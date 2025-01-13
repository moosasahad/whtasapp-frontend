// import React, { useState } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
// import { CgRecord } from "react-icons/cg";
// import { IoMdMic } from "react-icons/io";

// const Audio = () => {
//   const [isRecording, setIsRecording] = useState(false);

//   return (
//     <div>
//       <ReactMediaRecorder
//         audio
//         render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
//           const handleRecording = () => {
//             if (isRecording) {
//               stopRecording();
//               setIsRecording(false);
//             } else {
//               startRecording();
//               setIsRecording(true);
//             }
//           };

//           return (
//             <div>
//               <p>Status: {status}</p>

//               {/* Custom Recording Button */}
//               <button onClick={handleRecording}>
//                 {isRecording ? (
//                   <CgRecord className="text-2xl text-red-500 cursor-pointer" />
//                 ) : (
//                   <IoMdMic className="text-2xl text-green-500 cursor-pointer" />
//                 )}
//               </button>

//               {/* Audio Player */}
//               {mediaBlobUrl && <audio src={mediaBlobUrl} controls className="mt-4" />}
//             </div>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default Audio;
// // A

import React from 'react'

function Audio() {
  return (
    <div>
      
    </div>
  )
}

export default Audio
