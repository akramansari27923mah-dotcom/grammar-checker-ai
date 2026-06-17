/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { api } from "@/lib/axios";
import {
  Download,
  LayoutDashboard,
  LoaderCircle,
  MoveLeft,
  Sparkles,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { errorShow } from "@/lib/toast";
import Link from "next/link";
import { downloadPdf, downloadText, downloadDocx } from "@/lib/downloadResult";
import DownloadResult from "./DownloadResult";
import GrammarResult from "./GrammarResult";

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
      localStorage.setItem("result", data);
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

  const copyResult = (res) => {
    if (!res) return;
    setCopied(true);
    window.navigator.clipboard.writeText(res);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      {inputBoxOpned && (
        <DownloadResult
          setExtInputBoxOpned={setExtInputBoxOpned}
          setFileExt={setFileExt}
          downloadPdf={downloadPdf}
          downloadText={downloadText}
          downloadDocx={downloadDocx}
          fileExt={fileExt}
          result={result}
        />
      )}
      {/* ------------------------------------------- */}
      <div
        className=" min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50
dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 lg:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between gap-3 mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm"
            >
              <MoveLeft size={15} />
              Back
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white text-sm"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
          </div>

          <div className=" flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
            {/* LEFT SIDE */}
            <form
              onSubmit={getResult}
              className=" backdrop-blur-xl w-full sticky top-10 h-140 lg:w-105  bg-white/80  dark:bg-slate-900/70 border  border-white/20  dark:border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-8"
            >
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                  Grammar Checker
                </h1>

                <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                  <Sparkles size={15} />
                  Improve your writing instantly
                </p>
              </div>

              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                onKeyDown={handlekeyDown}
                placeholder="Type your sentence here..."
                className=" w-full h-60 md:h-100 lg:h-75 rounded-2xl p-5 outline-none border  border-gray-200  dark:border-slate-700  bg-white/70  dark:bg-slate-950 resize-none text-sm  dark:text-white focus:ring-4  focus:ring-blue-500/20 transition"
              />

              <div className="flex justify-end mt-2 text-sm text-gray-500">
                {prompt.length} characters
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button className=" flex-1 py-4 rounded-2xl  bg-blue-600  text-white font-semibold  hover:bg-blue-700 transition-all cursor-pointer">
                  {loader ? (
                    <div className="flex justify-center items-center gap-2">
                      <LoaderCircle className="animate-spin" />
                      Correcting...
                    </div>
                  ) : (
                    "Correct Grammar"
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearContent}
                  className=" px-5 py-4 rounded-2xl border  border-gray-300  dark:border-slate-700  dark:text-white  hover:bg-gray-100  dark:hover:bg-slate-800 transition"
                >
                  Clear
                </button>
              </div>
            </form>

            {/* RIGHT SIDE */}
            <div className=" flex-1 w-full backdrop-blur-xl  bg-white/80  dark:bg-slate-900/70 border  border-white/20  dark:border-slate-800 rounded-3xl shadow-2xl p-6 lg:p-8">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    Corrected Result
                  </h2>

                  <p className="text-sm text-gray-500">
                    AI improved version of your text
                  </p>
                </div>

                <div className="  bg-green-100  dark:bg-green-900/30  text-green-700  dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium h-fit">
                  AI Powered
                </div>
              </div>

              <div className=" min-h-75 md:min-h-100 overflow-y-auto hide-scroll rounded-2xl bg-linear-to-br  from-green-50  to-emerald-100  dark:from-slate-9 dark:to-slate-900 p-6 border  border-green-100  dark:border-slate-800">
                <div className=" prose dark:prose-invert max-w-none  text-gray-700  dark:text-gray-200 whitespace-pre-wrap">
                  {result && (
                    <GrammarResult
                      data={JSON.parse(result)}
                      copied={copied}
                      copyResult={copyResult}
                      clearResult={clearResult}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={clearResult}
                  className=" flex items-center gap-2 px-5 py-3 rounded-xl  bg-red-50  dark:bg-slate-800 cursor-pointer text-red-600  dark:text-red-400 hover:scale-105 transition"
                >
                  <Trash size={18} />
                  Clear
                </button>

                <button
                  onClick={() => setExtInputBoxOpned(!inputBoxOpned)}
                  className=" flex items-center gap-2 px-5 py-3 rounded-xl  bg-green-50  dark:bg-slate-800 cursor-pointer text-green-600  dark:text-green-400 hover:scale-105 transition"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat2;
