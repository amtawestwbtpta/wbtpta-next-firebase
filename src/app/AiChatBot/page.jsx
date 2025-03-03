"use client";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GEMEINI_API_KEY } from "../../modules/constants";
// import { decryptData } from "../../modules/encryption";
import "./ChatBot.css";
// import Image from "next/image";
// const genAl = new GoogleGenerativeAI(decryptData(GEMEINI_API_KEY));
const TypewriterChat = () => {
  const { state } = useGlobalContext();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const messageRef = useRef(null);
  const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
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
        // const response = await generateGeminiReply(input);
        // if (response !== "") {
        //   const aiMessage = {
        //     text: response,
        //     sender: "Gemini",
        //   };
        //   msg = [...msg, aiMessage];
        //   setMessages(msg);
        // } else {
        //   toast.error("Error sending message to Gemini AI. Please try again.");
        //   setTyping(false);
        // }
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
              "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
              "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1:free",
              messages: [
                {
                  role: "user",
                  content: input,
                },
              ],
            }),
          }
        );
        const data = await response.json();
        const aiMessage = {
          text: data.choices?.[0]?.message?.content,
          sender: "DeepSeek",
        };
        msg = [...msg, aiMessage];
        setMessages(msg);
      } catch (error) {
        toast.error("Error sending message to Gemini AI")
        console.error("Error sending message to Gemini AI: ", error);
        setTyping(true);

        // If Gemini AI fails to respond, display a default message
        const defaultMessage = {
          text: "I'm sorry, I couldn't understand that. Please try again.",
          sender: "DeepSeek",
        };
        setMessages([...messages, defaultMessage]);
      }
    }
  };
  // const generateGeminiReply = async (prompt) => {
  //   try {
  //     const model = genAl.getGenerativeModel({ model: "gemini-pro" });
  //     const result = await model.generateContent(prompt);
  //     const response = result.response.text();
  //     return response;
  //   } catch (error) {
  //     console.error("Error generating text:", error);
  //     return "";
  //   }
  // };
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
          <div className="col-md-10 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="chat-container">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message mb-3 p-2 rounded text-black ben`}
                      style={{
                        backgroundColor:
                          msg.sender === "user" ? "cornsilk" : "honeydew",
                      }}
                    >
                      {msg.sender === "DeepSeek" && typing ? (
                        <p
                          ref={messageRef}
                          className="typing-indicator fs-6"
                        ></p>
                      ) : (
                        <p className="fs-6">{msg.text}</p>
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
                <div className="mt-3 d-flex flex-row justify-content-center align-items-center">
                  <a href="#" className="text-decoration-none m-0 p-0">
                    <small>Powered by </small>
                  </a>
                  <img
                    src="https://raw.githubusercontent.com/amtawestwbtpta/awwbtptadata/main/deepseek.png"
                    alt="LOGO"
                    width={"50vw"}
                  />
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
