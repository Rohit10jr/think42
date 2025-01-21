import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { BiPlus, BiUser, BiSend, BiSolidUserCircle } from 'react-icons/bi';
import './ChatWindow.css';
import mic from "../../assets/images/microphone.png"
import web from "../../assets/images/internet.png"
import paperClip from "../../assets/images/paperclip.png"
import send from "../../assets/images/send.png"




const predefinedReplies = [
  "Hello! How can I assist you today?",
  "I'm here to help you with your queries.",
  "Please provide more details about your request.",
  "Thank you for reaching out!",
  "Let me know if you need further assistance.",
];


const ChatWindow2 = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);
  // const [currentTitle, setCurrentTitle] = useState(null);
  // const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isShowSidebar, setIsShowSidebar] = useState(false); // Sidebar visibility

  // for the chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFile("");
      setSelectedFileName(""); // Reset if no file is selected
    }
  };

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewChat = () => {
    setMessage(null);
    setText('');
    setCurrentTitle(null);
  };

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  // const sendMessage = async () => {
  //   if (input.trim()) {
  //     // Add user message
  //     setMessages([...messages, { sender: "user", text: input }]);
  //     const userMessage = input;
  //     setInput("");

  //     // Simulate bot typing
  //     setIsTyping(true);

  //     try {
  //       // Send the user message to Rasa
  //       const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ sender: "user_123", message: userMessage }), // 'sender' can be a unique user ID
  //       });

  //       const botReplies = await response.json(); // Array of bot responses
  //       const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

  //       // Update messages with bot replies
  //       setMessages((prevMessages) => [...prevMessages, ...botMessages]);
  //     } catch (error) {
  //       console.error("Error communicating with Rasa:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "bot", text: "Oops! Something went wrong." },
  //       ]);
  //     } finally {
  //       setIsTyping(false);
  //     }
  //   }
  // };

  // const sendMessage = async () => {
  //   if (input.trim() || selectedFile) {
  //     // Add user message to the chat
  //     if (input.trim()) {
  //       setMessages([...messages, { sender: "user", text: input }]);
  //     } else if (selectedFile) {
  //       setMessages([...messages, { sender: "user", text: `File: ${selectedFileName}` }]);
  //     }

  //     const userMessage = input.trim();
  //     setInput(""); // Clear input field
  //     setSelectedFile(null); // Clear selected file
  //     setSelectedFileName(""); // Clear file name
  //     setIsTyping(true); // Simulate bot typing

  //     try {
  //       if (selectedFile) {
  //         // File upload logic
  //         const formData = new FormData();
  //         formData.append("file", selectedFile);

  //         // Send file to Rasa backend
  //         const fileResponse = await fetch("http://localhost:5005/upload-file", {
  //           method: "POST",
  //           body: formData,
  //         });

  //         const fileData = await fileResponse.json();
  //         const extractedText = fileData.text || "No text extracted from the file.";

  //         // Add extracted text to chat
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { sender: "bot", text: `Extracted Text: ${extractedText}` },
  //         ]);
  //       }

  //       if (userMessage) {
  //         // Send text message to Rasa backend
  //         const textResponse = await fetch("http://localhost:5005/webhooks/rest/webhook", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ sender: "user_123", message: userMessage }),
  //         });

  //         const botReplies = await textResponse.json();
  //         const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

  //         // Update messages with bot replies
  //         setMessages((prevMessages) => [...prevMessages, ...botMessages]);
  //       }
  //     } catch (error) {
  //       console.error("Error communicating with Rasa:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "bot", text: "Oops! Something went wrong." },
  //       ]);
  //     } finally {
  //       setIsTyping(false); // Stop typing indicator
  //     }
  //   }
  // };

  // const sendMessage = async () => {
  //   if (input.trim() || selectedFile) {
  //     // Add user message to the chat
  //     if (input.trim()) {
  //       setMessages([...messages, { sender: "user", text: input }]);
  //     } else if (selectedFile) {
  //       setMessages([...messages, { sender: "user", text: `File: ${selectedFileName}` }]);
  //     }

  //     const userMessage = input.trim();
  //     setInput(""); // Clear input field
  //     setSelectedFile(null); // Clear selected file
  //     setSelectedFileName(""); // Clear file name
  //     setIsTyping(true); // Simulate bot typing

  //     try {
  //       if (selectedFile) {
  //         // File upload logic with metadata
  //         const formData = new FormData();
  //         formData.append("file", selectedFile);

  //         // Add metadata to the formData
  //         formData.append("metadata", JSON.stringify({
  //           fileName: selectedFile.name,
  //           fileType: selectedFile.type,
  //           fileSize: selectedFile.size,
  //         }));

  //         // Send file and metadata to Rasa backend
  //         const fileResponse = await fetch("http://localhost:5005/upload-file", {
  //           method: "POST",
  //           body: formData,
  //         });

  //         const fileData = await fileResponse.json();
  //         const extractedText = fileData.text || "No text extracted from the file.";

  //         // Add extracted text to chat
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { sender: "bot", text: `Extracted Text: ${extractedText}` },
  //         ]);
  //       }

  //       if (userMessage) {
  //         // Send text message to Rasa backend
  //         const textResponse = await fetch("http://localhost:5005/webhooks/rest/webhook", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ sender: "user_123", message: userMessage }),
  //         });

  //         const botReplies = await textResponse.json();
  //         const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

  //         // Update messages with bot replies
  //         setMessages((prevMessages) => [...prevMessages, ...botMessages]);
  //       }
  //     } catch (error) {
  //       console.error("Error communicating with Rasa:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "bot", text: "Oops! Something went wrong." },
  //       ]);
  //     } finally {
  //       setIsTyping(false); // Stop typing indicator
  //     }
  //   }
  // };


  const sendMessage = async () => {
    if (input.trim() || selectedFile) {
      // Add user message to the chat
      if (input.trim()) {
        setMessages([...messages, { sender: "user", text: input }]);
      } else if (selectedFile) {
        setMessages([...messages, { sender: "user", text: `File: ${selectedFileName}` }]);
      }

      const userMessage = input.trim();
      setInput(""); // Clear input field
      setSelectedFile(null); // Clear selected file
      setSelectedFileName(""); // Clear file name
      setIsTyping(true); // Simulate bot typing

      try {
        if (selectedFile) {
          // File upload logic
          const formData = new FormData();
          formData.append("resume_file", selectedFile); // Field name in Django model

          // Send file to Django backend
          const fileResponse = await fetch("http://127.0.0.1:8000/api/file-parse/", {
            method: "POST",
            body: formData,
          });

          // if (fileResponse.ok) {
          //   const responseData = await fileResponse.json();
          //   // Add success message to chat
          //   setMessages((prevMessages) => [
          //     ...prevMessages,
          //     { sender: "bot", text: responseData.message || "File uploaded successfully!" },
          //   ]);
          // } else {
          //   setMessages((prevMessages) => [
          //     ...prevMessages,
          //     { sender: "bot", text: "Failed to upload the file. Please try again." },
          //   ]);
          // }

          // if (fileResponse.ok) {
          //   alert("File uploaded successfully!");
          // } else {
          //   alert("Failed to upload the file. Please try again.");
          // }

          const rasaMessage = fileResponse.ok
            ? "File uploaded successfully!"
            : "Failed to upload the file. Please try again.";

          // Send the corresponding message to Rasa backend
          const rasaResponse = await fetch("http://localhost:5005/webhooks/rest/webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sender: "user_123", message: rasaMessage }),
          });

          if (rasaResponse.ok) {
            const botReplies = await rasaResponse.json();
            const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

            // Update messages with bot replies
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "bot", text: "Failed to communicate with Rasa. Please try again." },
            ]);
          }

        }

        if (userMessage) {
          // Send text message to Rasa backend
          const textResponse = await fetch("http://localhost:5005/webhooks/rest/webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sender: "user_123", message: userMessage }),
          });

          if (textResponse.ok) {
            const botReplies = await textResponse.json();
            const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

            // Update messages with bot replies
            setMessages((prevMessages) => [...prevMessages, ...botMessages]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "bot", text: "Failed to communicate with Rasa. Please try again." },
            ]);
          }
        }
      } catch (error) {
        console.error("Error communicating with the server:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Oops! Something went wrong." },
        ]);
      } finally {
        setIsTyping(false); // Stop typing indicator
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
  };


  return (
    <>
      <div className="ChatContainer">
        <section className={`sidebar ${isShowSidebar ? 'open' : ''}`}>

          <div className='sidebar-header' onClick={createNewChat} role='button'>
            <BiPlus size={20} />
            <button className="chatWindow-button">New Chat</button>
          </div>
          {/* <div className='sidebar-history'>
          </div> */}
          <div className='sidebar-info'>
            <div className='sidebar-info-upgrade'>
              <BiUser size={20} />
              <p>Upgrade plan</p>
            </div>
            <div className='sidebar-info-user'>
              <BiSolidUserCircle size={20} />
              <p>User</p>
            </div>
          </div>
        </section>

        <section className="main">

          <div className="main-header">
            <h1>Chatbot</h1>
            {/* <h3>How can i help you today ?</h3> */}
          </div>


          {isShowSidebar ? (
            <MdOutlineArrowRight
              className='burger'
              size={28.8}
              onClick={toggleSidebar}
            />
          ) : (
            <MdOutlineArrowLeft
              className='burger'
              size={28.8}
              onClick={toggleSidebar}
            />
          )}

          <div className="main-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"} ${msg.sender === "bot" && isTyping && index === messages.length - 1 ? "typing" : ""
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="typing-indicator"> Generating answer...</div>}
          </div>

          <div className='main-bottom'>
            <div className='form-container' >
              <input
                type='text'
                placeholder="Type your message..."
                spellCheck='false'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}

              />
              <div className="icon-container">
                <div className="left-icon">
                  {/* File input linked to the paperclip image */}

                  <img src={web} alt="Internet Icon" className="icon" />
                  <img src={mic} alt="Microphone Icon" className="icon" />
                  <input id="file-input" type="file" className="file-input" onChange={handleFileChange} />
                  <label className="label" htmlFor="file-input">
                    <img
                      src={paperClip}
                      alt="File Input"
                      className="icon"
                    />
                  </label>

                  {/* Display the selected file name */}
                  {selectedFileName && (
                    <p className="file-name">
                      Selected: {selectedFileName}
                    </p>
                  )}
                </div>
                <div className="right-icon">
                  <button className="send-button" type="button" onClick={sendMessage}>
                    <img src={send} alt="Send Icon" />
                  </button>
                </div>
              </div>

            </div>
            {/* {errorText && <p className='errorText'>{errorText}</p>} */}
            {/* {errorText && (
             <p id='errorTextHint'>
               *You can clone the repository and use your paid OpenAI API key
               to make this work.
             </p>
           )} */}
          </div>
          <p className="warning-text">
            ChatBOT can make mistakes. Check important
            info.
          </p>
        </section>
      </div>
    </>
  )
}

export default ChatWindow2