
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import metai from "../../Images/metai.png";
import background from "../../Images/backgroun.png";



const API_KEY = import.meta.env.VITE_API_KEY_API_KEY;
// System message defines ChatGPT's behavior and tone
// console.log("Environment Variables:", process.env);

const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

function Metachat() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Meta Ai! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    console.log("message",message)
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Set typing indicator and process the user's message
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === "ChatGPT" ? "assistant" : "user",
      content: msg.message
    }));

    const data = {
      model: "gpt-4o-mini",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.choices && result.choices.length > 0) {
        setMessages([
          ...chatMessages,
          { message: result.choices[0].message.content, sender: "ChatGPT" }
        ]);
      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
    } finally {
      setIsTyping(false);
    }
  }

  
  return (
    <div className="" style={{height:"550px", backgroundImage: `url(${background})`}}>
        <div className=' bg-slate-200 p-2'>
            <div className='flex items-center gap-3 '>
                <img className='w-12 h-12' src={metai} alt="meta ai logo" />
                <h1> Meta Ai</h1>
            </div>
        </div>
      <div className='relative h-full overflow-y-auto' style={{backgroundImage: `url(${background})`}}>
       
           
              {messages.map((message, i) =>(
                <div key={i}>
                    <div className={`flex ${message.sender == "user"? "justify-end":"justify-start"}`}>
                    <h1 className={` max-w-96 ${message.sender == "user"? "bg-yellow-100  w-fit p-2 m-2 rounded-lg min-w-20":"w-fit bg-white rounded-lg p-2 m-2"}`}>
                        {message.message}
                    </h1>
                    
                    </div>
                </div>
              ))}
            
            
       
      </div>
      <h1 className='absolute bottom-16 text-slate-500'>{isTyping ? "Meta ai typing.....":null}</h1>
      <MessageInput
            placeholder="Type message here" 
            onSend={handleSend}
            style={{padding:"10px"}}
            />
    </div>
  );
}

export default Metachat;
