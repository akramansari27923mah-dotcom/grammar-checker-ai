"use client";
import { LoaderCircle, Send, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import handleChat from "@/lib/handleChatOfAi";

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loader, setLoader] = useState(false);
  const messageRef = useRef(null);

  const sendMessage = async () => {
    const inputValue = prompt.trim();

    if (!inputValue) return;
    setMessage((prev) => [...prev, { role: "user", content: inputValue }]);
    setPrompt("");
    setLoader(true);
    try {
      const res = await handleChat(inputValue, message);

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
          content: res,
        },
      ]);
    }
    finally{
        setLoader(false)
        setPrompt('')
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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl mx-auto bg-white border border-gray-200 h-screen">
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <div className="flex justify-center items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 shadow-lg shadow-green-500/30 flex justify-center items-center text-white font-extrabold text-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-3">
              G
            </div>
            <span className="font-semibold text-lg">Grammar AI</span>
          </div>

          <span>
            <Trash size={20} />
          </span>
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
          max-w-[80%] px-4 py-3 rounded-3xl shadow-md
          text-sm md:text-base leading-relaxed
          transition-all duration-300
           whitespace-pre-wrap
          ${
            msg?.role === "user"
              ? "bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
          }
        `}
                >
                  {msg.content}
                  <div ref={messageRef}></div>
                </div>
              </div>
            ))}

            {
                loader && (
                    <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" />
                        Loading...
                    </div>
                )
            }
          </div>
        </div>

        <div className="flex justify-center items-center h-15 gap-5 border-t border-gray-200">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            placeholder="Type your sentence..."
            className="p-2 rounded-lg w-full max-w-md border outline-none border-gray-200"
          />
          <span
            onClick={sendMessage}
            className="w-12 h-11 rounded-xl bg-linear-to-br from-emerald-400 via-green-500 to-emerald-700 shadow-lg shadow-green-500/30 flex justify-center items-center text-white font-extrabold text-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-3 cursor-pointer"
          >
            <Send />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
