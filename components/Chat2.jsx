/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { api } from "@/lib/axios";
import {
  CircleX,
  Copy,
  Download,
  LayoutDashboard,
  LoaderCircle,
  MoveLeft,
  Trash,
} from "lucide-react";
import ChatMarkdown from "./MarkDown";
import React, { useEffect, useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { errorShow } from "@/lib/toast";
import Link from "next/link";
import { downloadPdf, downloadText, downloadDocx } from "@/lib/downloadResult";

const Chat2 = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const { setLoader, loader } = everyWearCon();
  const [copied, setCopied] = useState(false);
  const [fileExt, setFileExt] = useState("");
  const [inputBoxOpned, setExtInputBoxOpned] = useState(false);
  const [view, setView] = useState("");

  useEffect(() => {
    const view = localStorage.getItem("view");
    setView(view);
  }, []);

  const getResult = async (e) => {
    if (e) e.preventDefault();
    localStorage.removeItem("view");
    if (!prompt.trim()) return errorShow("Please Provide Sentence to AI");
    setLoader(true);
    try {
      const { data } = await api.post("/groq/grammarChecker", { prompt });
      console.log(data);
      setResult(data);
      localStorage.setItem("result", JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchLocal = localStorage.getItem("result");
    setResult(JSON.parse(fetchLocal));
  }, [result]);

  const clearResult = () => {
    localStorage.removeItem("result");
    setResult("");
  };

  const clearContent = () => {
    setPrompt("");
  };

  const handlekeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      getResult();
    }
  };

  const copyResult = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(result);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      {inputBoxOpned && (
        <div className="flex justify-center items-center h-screen bg-black/60 z-10 backdrop-blur-md absolute w-full">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center ">
                <h2 className="text-2xl font-bold text-gray-800">
                  Save Your File
                </h2>
                <CircleX
                  color="red"
                  onClick={() => setExtInputBoxOpned(false)}
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                />
              </div>

              <p className="text-sm text-gray-500">
                Enter the file extension you want to save.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                File Extension
              </label>

              <input
                type="text"
                onChange={(e) => setFileExt(e.target.value)}
                placeholder=".txt, .pdf, .docx"
                className="w-full px-4 py-3 rounded-2xl border border-gray-400 focus:border-gray-600 outline-none transition-all duration-200"
              />
            </div>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() =>
                  downloadText(result, setExtInputBoxOpned, setFileExt, fileExt)
                }
                disabled={
                  fileExt === "pdf" || fileExt === "docx" || !fileExt.trim()
                }
                className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-2xl shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                Save Text
              </button>
              <button
                onClick={() =>
                  downloadPdf(result, setExtInputBoxOpned, setFileExt)
                }
                disabled={
                  fileExt === "txt" || fileExt === "docx" || !fileExt.trim()
                }
                className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-2xl shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                Save Pdf
              </button>
              <button
                onClick={() =>
                  downloadDocx(result, setExtInputBoxOpned, setFileExt)
                }
                disabled={
                  fileExt === "txt" || fileExt === "pdf" || !fileExt.trim()
                }
                className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-2xl shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                Save Docx
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ------------------------------------------- */}
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-10">
        <div className="flex absolute top-2 left-5 gap-5"
        >
          <Link
            href={"/"}
            className=" flex justify-center items-center gap-2 cursor-pointer px-2 py-1 rounded-lg bg-gray-900 text-white text-sm"
          >
            <MoveLeft size={15} />
            <button className="cursor-pointer">Back</button>
          </Link>

          <Link
            href={"/dashboard"}
            className="flex justify-center items-center gap-2 cursor-pointer px-2 py-1 rounded-lg bg-gray-900 text-white text-sm"
          >
            <LayoutDashboard size={15} />
            <button className="cursor-pointer">Dashboard</button>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <form
            onSubmit={getResult}
            className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Grammar Checker
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Improve your writing instantly
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                onKeyDown={handlekeyDown}
                className="
            w-full
            h-64
            rounded-2xl
            p-5
            outline-none
            border
            border-gray-200
            dark:border-slate-700
            bg-white/70
            dark:bg-slate-950
            resize-none
            text-lg
            dark:text-white
            focus:ring-4
            focus:ring-blue-500/20
            transition
          "
                placeholder="Type your sentence here..."
              />

              <div className="flex justify-center items-center absolute top-10 right-10 gap-1 text-sm">
                <span>{prompt.length}</span>
                <span>{prompt.length === 0 ? "word" : " Words"}</span>
              </div>
              <div className="flex gap-4">
                <button
                  className="
              flex-1
              py-4
              rounded-2xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition-all
              shadow-lg
              hover:scale-[1.02]
              cursor-pointer
            "
                >
                  {loader ? (
                    <div className="flex justify-center items-center gap-2">
                      <LoaderCircle className="animate-spin" />
                      <span>Correcting...</span>
                    </div>
                  ) : (
                    "Correct Grammar"
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearContent}
                  className="
              px-5
              rounded-2xl
              border
              border-gray-300
              dark:border-slate-700
              dark:text-white
              hover:bg-gray-100
              dark:hover:bg-slate-800
              transition
              cursor-pointer
            "
                >
                  Clear
                </button>
              </div>
            </div>
          </form>

          {/* RIGHT SIDE */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">
                  Corrected Result
                </h2>
                <p className="text-sm text-gray-500">
                  {view ? "View" : "AI improved version of your text"}
                </p>
              </div>

              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                AI Powered
              </div>
            </div>

            <div className="h-75 overflow-scroll hide-scroll rounded-2xl bg-linear-to-br from-green-50 to-emerald-100 dark:from-slate-950 dark:to-slate-900 p-6 border border-green-100 dark:border-slate-800 ">
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                <ChatMarkdown content={result} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={copyResult}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 dark:bg-slate-800 hover:scale-105 transition dark:text-white cursor-pointer"
              >
                <Copy size={18} />
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={clearResult}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 cursor-pointer dark:bg-slate-800 hover:scale-105 transition text-red-600 dark:text-red-400"
              >
                <Trash size={18} />
                Clear
              </button>

              <button
                onClick={() => setExtInputBoxOpned(!inputBoxOpned)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer bg-green-50 dark:bg-slate-800 hover:scale-105 transition text-green-600 dark:text-green-400"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat2;
