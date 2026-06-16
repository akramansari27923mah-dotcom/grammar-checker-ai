"use client";

import { ChevronRight, LoaderCircle, Send, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import handleChat from "@/lib/handleChatOfAi";
import ChatMarkdownSupport from "./MarkDownSupport";
import { everyWearCon } from "@/contexts/everyWear";
import Image from "next/image";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loader, setLoader] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messageRef = useRef(null);
  
  // useEffect(() => {
  //   const user = localStorage.getItem("userId");
  //   const res = localStorage.getItem(`message_${user}`);
  //   if (res) {
  //     setMessage(JSON.parse(res));
  //   }
  // }, []);

  // useEffect(() => {
  //   const user = localStorage.getItem("userId");
  //   if (user) {
  //     localStorage.setItem(`message_${user}`, JSON.stringify(message));
  //     console.log(user);
  //   }
  // }, [message]);

  const sendMessage = async () => {
    const inputValue = prompt.trim();

    if (!inputValue) return;
    setMessage((prev) => [...prev, { role: "user", content: inputValue }]);
    setPrompt("");
    setLoader(true);
    try {
      const res = await handleChat(inputValue, setLoader, "support");
      

      setMessage((prev) => [
        ...prev,
        {
          role: "ai",
          content:res,
        },
      ]);
    } catch (err) {
      console.log(err.message);
      setMessage((prev) => [
        ...prev,
        {
          role: "ai",
          content: err?.message,
        },
      ]);
    } finally {
      setLoader(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftkey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    <>
      {!showChat && (
        <div
          className="fixed bottom-5 right-5 z-50"
          onClick={() => setShowChat(true)}
        >
          <Image
            src="/robot.png"
            width={60}
            height={60}
            alt="robot"
            className="rounded-full border border-gray-300 shadow-xl cursor-pointer hover:scale-110 transition-all duration-300"
          />
        </div>
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-screen bg-white shadow-2xl border-l border-gray-200 transition-transform duration-300
      ${showChat ? "translate-x-0" : "translate-x-full"}
      w-full md:w-105`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 flex justify-center items-center text-white font-bold text-xl shadow-lg">
                G
              </div>

              <div>
                <h2 className="font-semibold text-lg">Grammar AI</h2>

                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                  <p className="text-xs text-gray-500">
                    {loader ? "Typing..." : "Online • Always here to help"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button>
                <Trash size={18} className="text-gray-500 hover:text-red-500" />
              </button>

              <button
                onClick={() => setShowChat(false)}
                className="p-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {message.map((msg, ind) => (
              <div
                key={ind}
                className={`flex ${
                  msg?.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-1 rounded-2xl text-sm md:text-base whitespace-pre-wrap shadow-sm
                ${
                  msg?.role === "user"
                    ? "bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border"
                }`}
                >
                  <ChatMarkdownSupport
                    content={
                      typeof msg?.content === "string"
                        ? msg?.content
                        : JSON.stringify(msg?.content)
                    }
                  />
                </div>
              </div>
            ))}

            {loader && (
              <div className="flex items-center gap-2 text-gray-500">
                <LoaderCircle className="animate-spin" size={18} />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={messageRef}></div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Grammar AI..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                onClick={sendMessage}
                disabled={!prompt.trim()}
                className="h-12 w-12 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition disabled:opacity-50 cursor-pointer"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
