"use client";

import {
  BadgeCheck,
  Copy,
  Heart,
  LoaderCircle,
  RotateCw,
  Share,
  Sparkles,
  Trash,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { api } from "@/lib/axios";
import { errorShow, successShow } from "@/lib/toast";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  removeFromSessionStorage,
  saveInSessionStorage,
} from "@/lib/storageFunctions";
import { shareTwitter, shareOnLinkedin, shareOnWhatsapp } from "@/lib/share";

const SentenceWriterPage = () => {
  const [sentence, setSentence] = useState("");
  const { setRewrite, rewrite, setRewriteUpdate } = everyWearCon();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [share, setShare] = useState(false);
  const [copied, setCopied] = useState("");

  const rewriteSentence = async () => {
    try {
      if (!sentence.trim()) return errorShow("Please enter your sentence!");
      setLoader(true);
      const { data } = await api.post("/groq/sentence-rewrite", { sentence });
      if (!data?.data?.success)
        return setError(true) || errorShow(data?.data?.message);
      setRewrite(data?.data?.rewrites);
      saveInSessionStorage("rewrite", data?.data?.rewrites);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoader(false);
      setRewriteUpdate(true);
    }
  };

  const copySentenceFun = (sen) => {
    window.navigator.clipboard.writeText(sen);
    successShow("Sentence Copied!");
  };

  return (
    <div className="w-full min-h-screen">
      <nav className="flex items-center justify-between h-20 md:px-8 px-2 bg-linear-to-r from-white via-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex md:h-14 h-12 md:w-14 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="md:text-2xl text-nowrap font-bold text-slate-800">
                Sentence Rewriter
              </h1>

              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                AI
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500 hidden md:block">
              Rewrite your sentences in different tones and styles with the
              power of AI.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 shadow-sm">
            <BadgeCheck className="text-indigo-600" size={18} />
            <span className="text-sm font-medium text-slate-700">
              AI Powered
            </span>
          </div>

          <button
            onClick={() => {
              (removeFromSessionStorage("rewrite"),
                setRewrite([]),
                setRewriteUpdate(true));
            }}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-red-500 px-4 py-2 shadow-sm text-white cursor-pointer">
            <Trash size={18} />
            <span className="text-sm font-medium">Clean Result</span>
          </button>
        </div>
      </nav>

      <div className="p-5 md:p-0">
        <div className="w-full max-w-7xl mx-auto my-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <textarea
            placeholder="Type or paste your sentence here..."
            maxLength={500}
            value={sentence}
            onChange={(e) => setSentence(e?.target?.value)}
            className="min-h-35 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Character Counter */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-500">
                {sentence.length} / 500 Characters
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setSentence("")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100">
                <X size={16} />
                Clear
              </button>

              <button
                onClick={rewriteSentence}
                disabled={loader || !sentence.trim()}
                className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed">
                {loader ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Rewriting Sentence
                  </>
                ) : (
                  <>
                    <Sparkles
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    Rewrite Sentence
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* share section */}
        {share && (
          <div className="fixed top-0 flex gap-5 flex-col-reverse justify-center items-center right-0 w-full h-screen bg-black/10 z-20">
            <div
              onClick={() => setShare(false)}
              className="px-4 py-2 rounded-md flex justify-center items-center gap-2 bg-red-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
              <X size={18} />
              <span>Cancel</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => shareOnLinkedin(copied)}
                className="group flex items-center justify-center gap-3 rounded-xl bg-[#0A66C2] px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95">
                <FaLinkedinIn className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                <div className="text-left">
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-xs text-blue-100">Share professionally</p>
                </div>
              </button>

              <button
                onClick={() => shareOnWhatsapp(copied)}
                className="group flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95">
                <FaWhatsapp className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                <div className="text-left">
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-xs text-green-100">Send to friends</p>
                </div>
              </button>

              <button
                onClick={() => shareTwitter(copied)}
                className="group flex items-center justify-center gap-3 rounded-xl bg-black px-5 py-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95">
                <FaXTwitter className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                <div className="text-left">
                  <p className="font-semibold">X</p>
                  <p className="text-xs text-gray-300">Post instantly</p>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6 w-full max-w-7xl mx-auto">
          {rewrite?.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-purple-600">
                    <Sparkles size={18} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item?.tone}
                    </h3>
                    <p className="text-xs text-slate-500">AI Rewritten</p>
                  </div>
                </div>
              </div>

              {/* Sentence */}
              <p className="mt-5 leading-7 text-slate-700">{item?.sentence}</p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between gap-3 border-t pt-4">
                <button
                  onClick={() => copySentenceFun(item?.sentence)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                  <Copy size={16} />
                  Copy
                </button>

                <button
                  onClick={() => {
                    (setShare(true), setCopied(item?.sentence));
                  }}
                  className="flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:scale-105 cursor-pointer">
                  <Share size={15} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentenceWriterPage;
