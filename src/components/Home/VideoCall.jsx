import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../Axiosinstens";
import { useContext } from "react";
import { Product } from "../Component/Productcontext";

const VideoCall = ({ props }) => {
  const [myStream, setMyStream] = useState(null);
  const [peerStream, setPeerStream] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const myVideoRef = useRef(null);
  const peerVideoRef = useRef(null);
  const {userid} = useContext(Product)

  useEffect(() => {
    // Get user's media (audio/video)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
      });

    // Listen for incoming offer  
    socket.on("offer", (offer, from) => {
      const peerConnection = createPeerConnection();
      setPeerConnection(peerConnection);
      peerConnection
        .setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => peerConnection.createAnswer())
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => {
          socket.emit("answer", peerConnection.localDescription, from); // send answer back
        });
    });

    // Listen for incoming answer
    socket.on("answer", (answer) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Listen for ICE candidates
    socket.on("ice-candidate", (candidate) => {
      const iceCandidate = new RTCIceCandidate(candidate);
      peerConnection.addIceCandidate(iceCandidate);
    });
  }, []);

  // Create a new peer connection
  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    // Add user's media stream tracks
    myStream.getTracks().forEach((track) => peerConnection.addTrack(track, myStream));

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate, userid?.id);
      }
    };

    // Handle incoming peer stream
    peerConnection.ontrack = (event) => {
      setPeerStream(event.streams[0]);
      if (peerVideoRef.current) {
        peerVideoRef.current.srcObject = event.streams[0];
      }
    };

    return peerConnection;
  };

  // Start a call by sending an offer
  const startCall = () => {
    const peerConnection = createPeerConnection();
    setPeerConnection(peerConnection);

    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        socket.emit("offer", peerConnection.localDescription, userid?.id);
      });
  };

  // End the call
  const endCall = () => {
    props.setVideocall(false)
    peerConnection.close();
    setCallActive(false);
    setPeerConnection(null)
    
  };

  return (
    <div>
      <div>
        <h1>Video Call</h1>
        <video
          ref={myVideoRef}
          autoPlay
          muted
          style={{ width: "300px", border: "2px solid black" }}
        ></video>
      </div>
      {callActive && (
        <video
          ref={peerVideoRef}
          autoPlay
          style={{ width: "300px", border: "2px solid black" }}
        ></video>
      )}
      <button onClick={startCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default VideoCall;


// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   MeetingProvider,
//   useMeeting,
//   useParticipant,
// } from "@videosdk.live/react-sdk";
// import ReactPlayer from "react-player";

// function MeetingView() {
//     return null
// }
// const VideoCall  = () => {
//  return (
//   <MeetingProvider
//   config={{
//     meetingId: "undefined",
//     micEnabled: true,
//     webcamEnabled: true,
//     name: "sample's Org",
//   }}
//   token="undefined"
// >
//   <MeetingView />
// </MeetingProvider>
//  )
// };
// export default VideoCall;




// /////////////////////////////// METING VIEW ////////////////////
// export const ParticipantView = () => {
//   return null
// }

//  export const MeetingView = () => {
// const [joined, setJoined] = useState(null);
// //Get the method which will be used to join the meeting.
// //We will also get the participants list to display all participants
// const { join, participants } = useMeeting({
//   //callback for when meeting is joined successfully
//   onMeetingJoined: () => {
//     setJoined("JOINED");
//   }
// });
// const joinMeeting = () => {
//   setJoined("JOINING");
//   join();
// };

// return (
//   <div className="container">
//     {joined && joined == "JOINED" ? (
//       <div>
//         {[...participants.keys()].map((participantId) => (
//           <ParticipantView
//             participantId={participantId}
//             key={participantId}
//           />
//         ))}
//       </div>
//     ) : joined && joined == "JOINING" ? (
//       <p>Joining the meeting...</p>
//     ) : (
//       <button onClick={joinMeeting}>Join the meeting</button>
//     )}
//   </div>
// );
// }