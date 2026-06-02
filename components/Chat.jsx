"use client";

import { ChevronRight, LoaderCircle, Send, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import handleChat from "@/lib/handleChatOfAi";
import ChatMarkdownSupport from "./MarkDown";
import Image from "next/image";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loader, setLoader] = useState(false);
  const [showChat, setShowChat] = useState(400);
  const messageRef = useRef(null);

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
          content: res,
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
      <div
        className="fixed bottom-5 right-5 z-30"
        onClick={() => setShowChat(400)}
      >
        <Image
          src={"/robot.png"}
          width={60}
          height={60}
          alt="robot"
          className="rounded-full border border-gray-300 shadow hover:scale-105 cursor-pointer transition-all duration-300"
        />
      </div>

      <div
        className={`text-black bg-white fixed cursor-pointer hover:scale-105 transition-all duration-300 top-75 right-100 z-90 hidden md:block ${showChat === 0 && 'md:hidden'}`}
        onClick={() => setShowChat(0)}
      >
        <div className="w-10 h-10 rounded-lg bg-white shadow-2xl border flex justify-center items-center">
          <ChevronRight />
        </div>
      </div>

      <div
        className="flex justify-center items-center h-screen fixed top-0 right-0 z-50 transition-all duration-300"
        style={{ width: `${showChat}px` }}
      >
        <div
          className=" bg-white border border-gray-200 h-screen"
          style={{ width: `${showChat}px` }}
        >
          <div className="flex justify-between items-center p-2 border-b border-gray-200">
            <div className="flex justify-center items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 shadow-lg shadow-green-500/30 flex justify-center items-center text-white font-extrabold text-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-3">
                G
              </div>
              <span className="font-semibold text-lg">Grammar AI</span>
            </div>

            <div className="flex justify-center items-center gap-3">
              <span>
                <Trash size={20} />
              </span>
              <div
                className="text-black cursor-pointer hover:scale-105 transition-all duration-300 z-90 md:hidden"
                onClick={() => setShowChat(0)}
              >
                <div className="w-7 h-7 rounded-lg bg-white shadow-2xl border flex justify-center items-center">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </div>

          {/* chat section */}
          <div className="h-130 w-full p-2 overflow-scroll hide-scroll">
            <div className="flex flex-col gap-4 p-4 overflow-y-auto">
              {message.map((msg, ind) => (
                <div
                  key={ind}
                  className={`flex ${
                    msg?.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
          max-w-[80%] px-4 py-1 rounded-3xl
          text-sm md:text-base leading-relaxed
          transition-all duration-300
           whitespace-pre-wrap
          ${
            msg?.role === "user"
              ? "bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-br-md"
              : "  bg-black/50 backdrop-blur-md rounded-bl-md text-white"
          }
        `}
                  >
                    <ChatMarkdownSupport content={msg.content} />
                    <div ref={messageRef}></div>
                  </div>
                </div>
              ))}

              {loader && (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  Loading...
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center p-4 items-center h-15 gap-5 border-t border-gray-200">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Type your sentence..."
              className="p-2 rounded-lg w-full max-w-md text-sm border outline-none border-gray-200"
            />
            <button
              onClick={sendMessage}
              disabled={!prompt.trim()}
              className="w-12 h-11 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 shadow-lg shadow-green-500/30 flex justify-center items-center text-white font-extrabold text-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-3 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
