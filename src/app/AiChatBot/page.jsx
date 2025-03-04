"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import "./ChatBot.css";

const TypewriterChat = () => {
  const { state } = useGlobalContext();
  const router = useRouter();
  const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
  async function sendMessage(e) {
    e.preventDefault();
    if (typeof window !== undefined) {
      const input = document.getElementById("userInput").value;
      const responseDiv = document.getElementById("response");
      if (!input) {
        responseDiv.innerHTML = "Please enter a message.";
        return;
      }
      responseDiv.innerHTML = "Loading...";
      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
              "HTTP-Referer": "https://www.sitename.com",
              "X-Title": "SiteName",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-r1:free",
              messages: [{ role: "user", content: input }],
            }),
          }
        );
        const data = await response.json();
        const markdownText =
          `<h3 className="text-primary">${input}</h3>` +
            data.choices?.[0]?.message?.reasoning ||
          "" + data.choices?.[0]?.message?.content ||
          "No response received.";
        responseDiv.innerHTML = marked.parse(markdownText);
        document.getElementById("userInput").value = "";
      } catch (error) {
        responseDiv.innerHTML = "Error: " + error.message;
      }
    }
  }

  useEffect(() => {
    if (!state) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mt-5">
      <form action="">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="userInput"
            placeholder="Enter your question"
          />
        </div>
        <button
          type="submit"
          className="btn my-3 btn-success"
          onClick={sendMessage}
        >
          Ask!
        </button>
      </form>
      <div id="response"></div>
    </div>
  );
};

export default TypewriterChat;
