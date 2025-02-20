"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
const TypewriterChat = () => {
  const { state } = useGlobalContext();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const messageRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      let msg = [...messages];
      const userMessage = { text: input, sender: "user" };
      msg = [...msg, userMessage];
      setMessages(msg);
      setInput("");
      setTyping(true);

      // Call Gemini AI chat API (replace with actual API endpoint)
      //   const response = await axios.post('YOUR_Gemini_API_ENDPOINT', { message: input });
      try {
        const response = await axios.post("/api/deepSeekChat", {
          prompt: input,
        });
        if (response.data.success) {
          const aiMessage = {
            text: response.data.message,
            sender: "Gemini",
          };
          msg = [...msg, aiMessage];
          setMessages(msg);
        } else {
          toast.error(response.data.error || response.data.message);
          console.log(response.data.error || response.data.message);
          setTyping(false);
        }
      } catch (error) {
        console.error("Error sending message to Gemini AI: ", error);
        setTyping(true);

        // If Gemini AI fails to respond, display a default message
        const defaultMessage = {
          text: "I'm sorry, I couldn't understand that. Please try again.",
          sender: "Gemini",
        };
        setMessages([...messages, defaultMessage]);
      }
    }
  };
  useEffect(() => {
    if (typing && messageRef.current) {
      const messageText = messageRef.current.textContent;
      let i = 0;
      const interval = setInterval(() => {
        if (i < messageText.length) {
          messageRef.current.textContent = messageText.substring(0, i + 1);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust typing speed (milliseconds)
      return () => clearInterval(interval);
    }
  }, [typing]);
  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mt-5">
      <form action="" method="post" onSubmit={handleSend}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="chat-container">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message mb-3 p-2 rounded ${
                        msg.sender === "user"
                          ? "bg-light text-dark"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.sender === "DeepSeek" && typing ? (
                        <span
                          ref={messageRef}
                          className="typing-indicator"
                        ></span>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TypewriterChat;
