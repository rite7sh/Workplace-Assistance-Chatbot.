import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Avatar, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';


function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Boiler! How may i help you! 😊",
      sentTime: "just now",
      sender: "Boiler",
      direction: 'incoming',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
    const x = await AIResponse(message);
    setMessages([...newMessages, {
      message: x,
      sender: "Baailar",
      direction: 'incoming',
    }])
    console.log(x);
    setIsTyping(false);
  };


  async function AIResponse(message) { 
    const genAI = new GoogleGenerativeAI(
      "AIzaSyA0FK2uWYfTB2HZIXTI6pqDlRuOblwZF6s"
    );
    console.log(message);
  //   const APIkey = 'AIzaSyA0FK2uWYfTB2HZIXTI6pqDlRuOblwZF6s'
  //   const url = "http://localhost:5000/api/v1/chat/gnew"; 
  //   const {data} = await axios.post(url, {"message": message});
  //   const x = await formatString(data.chatResponse);
  //   return x;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // ... other safety settings
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful assistant who works like google assistant"}],
        },
        {
          role: "model",
          parts: [{ text: "My name is Boiler. What's your name?"}],
        },
      ],
    });
  

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();
    const x = await formatString(text);
    return x;
  }
  


  async function formatString(str) {
    const parts = str.split("**");
    let formattedString = "";
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        formattedString += parts[i];
      } else {
        formattedString += `<strong>${parts[i]}</strong>`;
      }
    }
    return formattedString;
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "550px", width: "750px" }}>
        <MainContainer>
          <ChatContainer>   
          <ConversationHeader>
          <Avatar src="user.webp" name="Boiler" />
          <ConversationHeader.Content userName="Boiler" info="Online" />
          <ConversationHeader.Actions>
            {/* <VoiceCallButton />
            <VideoCallButton />
            <InfoButton /> */}
          </ConversationHeader.Actions>          
        </ConversationHeader>    
            <MessageList 
              scrollBehavior="smooth" style={{ backgroundColor: 'lightgray' }}
              typingIndicator={isTyping ? <TypingIndicator content="Boiler is typing" /> : null}
            >
              
             
                {/* return ( */}<br></br>
                  {messages.map((message, i) => {
                    if (message.sender === "user") {
                      return (
                        <Message key={i} model={message} > 
                          <Avatar src="user.webp" name="Boiler" />
                          <Message.Footer sentTime="just now" />
                        </Message>
                      );
                    } else {
                      return (
                        <Message key={i} model={message}>
                          <Avatar src="img.webp" name="Boiler" status='available'/>
                          {/* <Message.Footer sentTime="just now" /> */}
                        </Message>
                      );
                    }
                  })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} autoFocus/>        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
