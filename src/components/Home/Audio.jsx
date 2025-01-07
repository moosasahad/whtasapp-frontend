// // import React, { useState, useRef } from 'react';
// // import { io } from 'socket.io-client';
// // const socket = io('http://localhost:4000');
// // function Audio() {
// //   const [audioUrl, setAudioUrl] = useState(null);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const mediaRecorderRef = useRef(null);
// //   const audioChunks = useRef([]);

// //   const startRecording = async () => {
// //       try {
// //           const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //           const mediaRecorder = new MediaRecorder(stream);

// //           mediaRecorderRef.current = mediaRecorder;
// //           audioChunks.current = [];

// //           mediaRecorder.ondataavailable = (e) => {
// //               if (e.data.size > 0) {
// //                   audioChunks.current.push(e.data);
// //               }
// //           };

// //           mediaRecorder.onstop = () => {
// //               const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
// //               const audioUrl = URL.createObjectURL(audioBlob);
// //               setAudioUrl(audioUrl);
// //           };

// //           mediaRecorder.start();
// //           setIsRecording(true);
// //       } catch (err) {
// //           console.error('Error accessing microphone:', err);
// //       }
// //   };

// //   const stopRecording = () => {
// //       mediaRecorderRef.current.stop();
// //       setIsRecording(false);
// //   };

// //   const uploadAudio = async () => {
// //       const formData = new FormData();
// //       formData.append('audio', audioChunks.current[0], 'audio.wav'); // Append audio blob

// //       try {
// //           const response = await fetch('/your-endpoint', {
// //               method: 'POST',
// //               body: formData,
// //           });
// //           const result = await response.json();
// //           console.log('Audio file uploaded successfully', result);
// //       } catch (error) {
// //           console.error('Error uploading audio file:', error);
// //       }
// //   };
// //   return (
// //     <div>
// //     <button onClick={isRecording ? stopRecording : startRecording}>
// //         {isRecording ? 'Stop Recording' : 'Start Recording'}
// //     </button>

// //     {audioUrl && (
// //         <div>
// //             <audio controls src={audioUrl}></audio>
// //             <button onClick={uploadAudio}>Upload</button>
// //         </div>
// //     )}
// // </div>
// //   )
// // }

// // export default Audio



// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000'); 

// const Audio = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit('send_message', { text: message });
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg.text}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Audio;

// import React from 'react'

// function Audio() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Audio

// import React, { useState } from "react";
// import { Recorder } from "react-voice-recorder";
// import "react-voice-recorder/dist/index.css";

// const Audio = () => {
//   const [audioDetails, setAudioDetails] = useState({
//     url: "",
//     blob: null,
//     chunks: [],
//     duration: {
//       h: 0,
//       m: 0,
//       s: 0,
//     },
//   });
// console.log("audioDetails",audioDetails);

//   const [isRecording, setIsRecording] = useState(false);

//   const handleAudioStop = (data) => {
//     console.log("Audio stopped:", data);
//     setAudioDetails(data);
//     setIsRecording(false);
//   };

//   const handleAudioUpload = (file) => {
//     console.log("Audio file uploaded:", file);
//     // Upload file logic
//   };

//   const handleReset = () => {
//     console.log("Recorder reset");
//     setAudioDetails({
//       url: "",
//       blob: null,
//       chunks: [],
//       duration: {
//         h: 0,
//         m: 0,
//         s: 0,
//       },
//     });
//     setIsRecording(false);
//   };

//   const startRecording = () => {
//     console.log("Started recording");
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     console.log("Stopped recording");
//     setIsRecording(false);
//   };

//   return (
//     <div>
//       <h2>React Voice Recorder</h2>
//       <Recorder
//         record={false} // Controlled by custom buttons
//         title={"New Recording"}
//         startRecording={true}
//         audioURL={audioDetails.url}
//         showUIAudio={false}
//         handleAudioStop={handleAudioStop}
//         handleAudioUpload={handleAudioUpload}
//         handleReset={handleReset}
//       />
//       <div>
//         <button onClick={startRecording} disabled={isRecording}>
//           Record
//         </button>
//         <button onClick={stopRecording} disabled={!isRecording}>
//           Stop
//         </button>
//         <button onClick={handleReset}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default Audio;
import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const Audio = () => {
  const [message, setMessage] = useState('');

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native); // Append selected emoji
  };

  return (
    <div>
      <div>
        <Picker data={data} onEmojiSelect={addEmoji} />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default Audio;
