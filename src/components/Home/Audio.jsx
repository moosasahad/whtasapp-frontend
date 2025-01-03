import React, { useState, useRef } from 'react';

function Audio() {
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
          };

          mediaRecorder.start();
          setIsRecording(true);
      } catch (err) {
          console.error('Error accessing microphone:', err);
      }
  };

  const stopRecording = () => {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
  };

  const uploadAudio = async () => {
      const formData = new FormData();
      formData.append('audio', audioChunks.current[0], 'audio.wav'); // Append audio blob

      try {
          const response = await fetch('/your-endpoint', {
              method: 'POST',
              body: formData,
          });
          const result = await response.json();
          console.log('Audio file uploaded successfully', result);
      } catch (error) {
          console.error('Error uploading audio file:', error);
      }
  };
  return (
    <div>
    <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>

    {audioUrl && (
        <div>
            <audio controls src={audioUrl}></audio>
            <button onClick={uploadAudio}>Upload</button>
        </div>
    )}
</div>
  )
}

export default Audio


