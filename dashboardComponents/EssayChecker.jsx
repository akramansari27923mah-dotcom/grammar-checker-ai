"use client";

import { everyWearCon } from "@/contexts/everyWear";
import {
  BadgeCheck,
  Info,
  LoaderCircle,
  Sparkles,
  Trash,
  X,
  SpellCheck,
  BookA,
  BookOpenCheck,
  Eye,
  Workflow,
  MessageCircleMore,
  Copy,
  Share,
  Lightbulb,
  Check,
  ChevronDown,
} from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useState } from "react";
import { useGroqApiFunctions } from "@/hooks/useGroqApi";
import { changeBgOfDetails } from "@/lib/changeColorOrBg";
import { successShow } from "@/lib/toast";
import { removeFromSessionStorage } from "@/lib/storageFunctions";
import { shareOnLinkedin, shareOnWhatsapp, shareTwitter } from "@/lib/share";

const EssayCheckerPage = () => {
  const [loader, setLoader] = useState(false);
  const [essayValue, setEssayValue] = useState("");
  const [error, setError] = useState(false);
  const { essay, setEssay, setEssayUpdate, essayUpdate } = everyWearCon();
  const { correctEssay } = useGroqApiFunctions();
  const [changeBg, setChangeBg] = useState("All");
  const [isShare, setIsShare] = useState(false);
  const {
    overallScore,
    overallFeedback,
    grammarScore,
    spellingScore,
    vocabularyScore,
    readabilityScore,
    coherenceScore,
    tone,
  } = essay || {};

  const scoreOfAssay = [
    {
      title: "Grammer",
      Icon: BookOpenCheck,
      text: "text-blue-600",
      bg: "bg-blue-100",
      bgForScore: "bg-blue-600",
      score: grammarScore,
    },
    {
      title: "Spelling",
      Icon: SpellCheck,
      text: "text-emerald-600",
      bg: "bg-emerald-100",
      bgForScore: "bg-emerald-600",
      score: spellingScore,
    },
    {
      title: "Vocabulary",
      Icon: BookA,
      text: "text-violet-600",
      bg: "bg-violet-100",
      bgForScore: "bg-violet-600",
      score: vocabularyScore,
    },
    {
      title: "Readability",
      Icon: Eye,
      text: "text-amber-600",
      bg: "bg-amber-100",
      bgForScore: "bg-amber-600",
      score: readabilityScore,
    },
    {
      title: "Coherence",
      Icon: Workflow,
      text: "text-cyan-600",
      bg: "bg-cyan-100",
      bgForScore: "bg-cyan-600",
      score: coherenceScore,
    },
    {
      title: "Tone",
      Icon: MessageCircleMore,
      text: "text-rose-600",
      bg: "bg-rose-100",
      bgForScore: "bg-rose-600",
      score: tone,
    },
  ];

  const detailsButton = [
    {
      name: "All",
    },
    {
      name: "Grammer",
    },
    {
      name: "Spelling",
    },
    {
      name: "Vocabulary",
    },
  ];

  const detailsFeedback = [
    {
      icon: "G",
      title: "Grammer Issues",
      des: `We found ${essay?.grammarMistakes?.length} spellig mistakes in your essay.`,
      count: "Issues",
      mistakes: essay?.grammarMistakes?.length,
      id: "Grammer",
    },
    {
      icon: "Aa",
      title: "Spelling Mistakes",
      des: `We found ${essay?.spellingMistakes?.length} spellig mistakes in your essay.`,
      count: "Issues",
      mistakes: essay?.spellingMistakes?.length,
      id: "Spelling",
    },
    {
      icon: "V",
      title: "Vocabulary Enhancements",
      des: `We found ${essay?.vocabularySuggestions?.length} places to improve your vocabulary.`,
      count: "Suggestions",
      mistakes: essay?.vocabularySuggestions?.length,
      id: "Vocabulary",
    },
  ];

  const correctedEssayBtn = [
    {
      name: "Copy",
      icon: Copy,
    },
    {
      name: "Share",
      icon: Share,
    },
  ];

  const copyCorrectEssay = (result) => {
    window.navigator.clipboard.writeText(result);
    successShow("Result Copied!");
  };

  const essayStatus = [
    {
      name: "Words",
      score: essay?.wordCount,
    },
    {
      name: "Sentences",
      score: essay?.sentenceCount,
    },
    {
      name: "Paragraphs",
      score: essay?.paragraphCount,
    },
    {
      name: "Reding Time",
      score: essay?.readingTime,
    },
    {
      name: "Difficulty Level",
      score: essay?.difficultyLevel,
    },
  ];

  const shareButtons = [
    {
      name: "Linkedin",
      icon: FaLinkedinIn,
      id: 1,
    },
    {
      name: "Twitter",
      icon: FaXTwitter,
      id: 2,
    },
    {
      name: "Whatsapp",
      icon: FaWhatsapp,
      id: 3,
    },
  ];

  const definedPercentage = (per) => {
    if (per >= 90) return "🌟 Excellent";
    if (per >= 80) return "👏 Very Good";
    if (per >= 70) return "😊 Good";
    if (per >= 60) return "👍 Above Average";
    if (per >= 50) return "🙂 Average";
    if (per >= 40) return "💪 Needs Improvement";
    return "📚 Keep Practicing";
  };

  return (
    <>
      <nav className="flex items-center justify-between h-20 md:px-8 px-4 bg-linear-to-r from-white via-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex md:h-14 md:w-14 h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="md:text-2xl font-bold text-slate-800">
                Essay Checker
              </h1>

              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                AI
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 hidden md:block">
              Analyze your essay in-depth and improve your writing.
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
              (removeFromSessionStorage("correctEssay"), setEssayUpdate(!essayUpdate));
            }}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-red-500 px-4 py-2 shadow-sm text-white cursor-pointer">
            <Trash size={18} />
            <span className="text-sm font-medium">Clean Result</span>
          </button>
        </div>
      </nav>

      <div className="flex justify-center items-center flex-col md:flex-row w-full min-h-screen">
        <div className="w-full max-w-2xl p-5 flex justify-center h-screen">
          <div className="bg-white w-full max-w-xl p-5 rounded-xl shadow border border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Your Essay</h1>
              <p className="text-gray-500 text-sm font-semibold">
                {essayValue?.length} / 5000{" "}
                <span className="text-xs">Words</span>
              </p>
            </div>

            <textarea
              onChange={(e) => setEssayValue(e?.target?.value)}
              value={essayValue}
              className="border border-gray-200 shadow my-3 rounded-md bg-white w-full h-115 p-5"
              placeholder="Type or Paste your essay here..."
            />

            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => setEssayValue("")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100">
                <X size={16} />
                Clear
              </button>

              <button
                disabled={loader || !essayValue.trim()}
                onClick={() =>
                  correctEssay(
                    essay,
                    setEssay,
                    essayValue,
                    setEssayUpdate,
                    setLoader,
                    setError,
                  )
                }
                className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed text-nowrap">
                {loader ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Analyzing your Essay...
                  </>
                ) : (
                  <>
                    <Sparkles
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    Analyze Essay
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full items-center my-5">
          {essay?.success && (
            <div className="bg-white shadow rounded-lg w-full max-w-md">
              <div className="flex items-center gap-2 p-4">
                <h1 className="text-sm font-semibold">Overall Score</h1>
                <Info size={15} />
              </div>

              <div className="flex flex-col items-center justify-center gap-5 mt-6">
                <div className="relative flex items-center justify-center w-30 h-30 rounded-full bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-2xl">
                  <div className="flex flex-col items-center justify-center w-full h-full rounded-full bg-white">
                    <span className="text-4xl font-bold text-gray-900">
                      {essay?.success ? overallScore : "0"}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      /100
                    </span>
                  </div>
                </div>

                <div className="max-w-sm text-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {definedPercentage(essay?.overallScore)}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {overallFeedback}
                  </p>
                </div>

                <div className="border-t border-gray-200 space-y-3 p-4 w-full">
                  {scoreOfAssay.map((items, ind) => {
                    const Icon = items?.Icon;
                    return (
                      <>
                        <div key={ind}>
                          <div className="flex justify-between items-center">
                            <div className="flex justify-center items-center gap-2">
                              <div className="w-10 h-10 rounded-full text-green-500 bg-green-100 flex justify-center items-center">
                                <Icon className={`${items?.text}`} />
                              </div>
                              <p className="text-sm font-semibold">
                                {items?.title}
                              </p>
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold">
                                {essay?.success ? items?.score : "0"}
                              </span>
                              {items?.title !== "Tone" && (
                                <span className="text-gray-600">/100</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={` mb-6 rounded-2xl ${items?.title !== "Tone" && "bg-gray-100"}`}>
                          <div
                            className={`p-1 rounded-2xl ${items?.title !== "Tone" && items?.bgForScore}`}
                            style={{
                              width: `${essay?.success ? items?.score : "0"}%`,
                            }}></div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {essay?.success && (
        <div className="w-full md:max-w-6xl max-w-md p-5 rounded-lg mx-auto bg-white shadow">
          <div className="flex justify-between flex-col md:flex-row gap-3 items-center">
            <h1 className="text-md font-semibold">Detailed Feedback</h1>
            <div className="flex justify-center flex-wrap  items-center gap-4 text-sm font-semibold">
              {detailsButton?.map((items, ind) => (
                <button
                  onClick={() => setChangeBg(items?.name)}
                  key={ind}
                  className={`px-4 py-1 ${items?.name === changeBg && "bg-indigo-500 text-white"} text-black shadow border border-gray-200 rounded-lg cursor-pointer`}>
                  {items?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 p-5">
            {detailsFeedback?.map((items, ind) => {
              return (
                <div
                  key={ind}
                  className={`flex justify-between items-center ${changeBg === "All" ? "shadow" : items?.id === changeBg && "shadow"} mb-5 p-3 rounded-lg`}>
                  <div className="flex justify-center gap-5 items-center">
                    <label
                      className={`w-10 h-10 flex justify-center items-center rounded-3xl text-white ${changeBgOfDetails(
                        changeBg === "All"
                          ? items?.icon
                          : items?.id === changeBg && items?.icon,
                      )}`}>
                      {changeBg === "All"
                        ? items?.icon
                        : items?.id === changeBg && items?.icon}
                    </label>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-md font-semibold">
                        {changeBg === "All"
                          ? items?.title
                          : items?.id === changeBg && items?.title}
                      </h1>
                      <p className="text-sm text-gray-700">
                        {changeBg === "All"
                          ? items?.des
                          : items?.id === changeBg && items?.des}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-sm font-semibold">
                    <span>
                      {changeBg === "All"
                        ? items?.mistakes
                        : items?.id === changeBg && items?.mistakes}
                    </span>
                    <span>
                      {changeBg === "All"
                        ? items?.count
                        : items?.id === changeBg && items?.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {essay?.success && (
        <div className="bg-white p-5 rounded-lg w-full max-w-6xl mx-auto mt-5 ">
          <div className="text-base font-semibold">All Mistakes</div>

          <div className="my-5 grid md:grid-cols-3 grid-cols-1 gap-5">
            <div className="h-140 overflow-scroll">
              <div className="text-base font-semibold mb-3">
                Grammer Mistakes
              </div>
              {essay?.grammarMistakes?.map((items) => (
                <div
                  key={items?.id}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden mb-3">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100">
                        <span className="text-lg">✍️</span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Mistake
                        </p>
                        <h2 className="font-semibold text-gray-800">
                          {items?.type}
                        </h2>
                      </div>
                    </div>

                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-600">
                      Needs Correction
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    {/* Wrong */}
                    <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs">
                          ✕
                        </span>
                        <span className="text-sm font-semibold text-red-600">
                          Incorrect
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        {items?.wrongText}
                      </p>
                    </div>

                    {/* Correct */}
                    <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs">
                          ✓
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          Correct
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed">
                        {items?.correctText}
                      </p>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span>💡</span>
                        <span className="text-sm font-semibold text-blue-600">
                          Explanation
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {items?.explanation}
                      </p>
                    </div>

                    {/* Rule */}
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span>📚</span>
                        <span className="text-sm font-semibold text-purple-600">
                          Grammar Rule
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {items?.rule}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center h-140 overflow-scroll">
              <div className="space-y-3">
                <div className="text-base font-semibold">Spelling Mistakes</div>
                {essay?.spellingMistakes?.map((items, index) => (
                  <div
                    key={items?.id || index}
                    className="group flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
                    {/* Wrong Word */}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Incorrect
                      </p>

                      <p className="inline-block px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-medium line-through">
                        {items?.wrongWord}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 shrink-0">
                      →
                    </div>

                    {/* Correct Word */}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Correct
                      </p>

                      <p className="inline-block px-3 py-1.5 rounded-lg bg-green-50 text-green-600 font-semibold">
                        {items?.correctWord}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center h-140 overflow-scroll">
              <div className="space-y-4">
                <div className="text-base font-semibold">
                  Vocabulary Suggestions
                </div>

                {essay?.vocabularySuggestions?.map((items, index) => (
                  <div
                    key={items?.id || index}
                    className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-100">
                          💡
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Vocabulary
                          </p>
                          <h3 className="font-semibold text-gray-800">
                            Better Word Suggestion
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Word Comparison */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Current Word */}
                      <div className="w-full flex-1 p-4 rounded-xl bg-gray-50 border border-gray-200">
                        <p className="text-xs font-medium text-gray-400 mb-1">
                          Current Word
                        </p>

                        <p className="text-gray-700 font-medium">
                          {items?.word}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-500 shrink-0">
                        →
                      </div>

                      {/* Better Word */}
                      <div className="w-full flex-1 p-4 rounded-xl bg-green-50 border border-green-100">
                        <p className="text-xs font-medium text-green-600 mb-1">
                          Better Word
                        </p>

                        <p className="text-green-700 font-semibold">
                          {items?.betterWord}
                        </p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span>📖</span>

                        <p className="text-sm font-semibold text-blue-600">
                          Why?
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {items?.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {essay?.success && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 my-5 min-h-screen mx-10">
          <div className=" p-5 rounded-lg shadow bg-white h-150 relative">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Corrected Essay</h1>
              <div className="flex justify-center items-center gap-3 text-sm font-semibold">
                <button className="text-white bg-indigo-500 px-3 py-2 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95">
                  Corrected
                </button>
              </div>
            </div>
            <div className="h-110 w-full p-8 hide-scroll overflow-scroll rounded-lg bg-white shadow border border-gray-200 my-5">
              <p>{essay?.correctedEssay}</p>
            </div>

            <div className="flex justify-end items-center gap-3">
              {correctedEssayBtn?.map((items, ind) => {
                const Icon = items?.icon;
                return (
                  <div
                    key={ind}
                    onClick={
                      items?.name === "Copy"
                        ? () => copyCorrectEssay(essay?.correctedEssay)
                        : () => setIsShare(!isShare)
                    }
                    className="flex justify-center items-center gap-2 bg-white shadow rounded-lg px-4 py-2 border border-gray-300 active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer">
                    <Icon size={15} />
                    <button
                      className="cursor-pointer"
                      onClick={
                        items?.name === "Copy"
                          ? () => copyCorrectEssay(essay?.correctedEssay)
                          : () => setIsShare(!isShare)
                      }>
                      {items?.name}
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              className={` absolute right-0 bottom-17 w-52 rounded-l-2xl  bg-white border border-gray-200 shadow-xl overflow-hidden origin-right transition-all duration-300 ease-out
              `}
              style={{ width: isShare ? "180px" : "0px" }}>
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <Share size={16} className="text-gray-700" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">Share</p>
                  <p className="text-xs text-gray-500">Share this result</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="p-3 space-y-2">
                {shareButtons?.map((btn) => {
                  const Icon = btn?.icon;

                  const buttonStyles = {
                    Linkedin: "bg-[#0A66C2] hover:bg-[#0959a8]",
                    Twitter: "bg-black hover:bg-gray-800",
                    Whatsapp: "bg-[#25D366] hover:bg-[#20bd5a]",
                  };

                  return (
                    <button
                      key={btn?.id}
                      onClick={
                        btn?.name === "Linkedin"
                          ? () => shareOnLinkedin(essay?.correctedEssay)
                          : btn?.name === "Twitter"
                            ? () => shareTwitter(essay?.correctedEssay)
                            : btn?.name === "Whatsapp"
                              ? () => shareOnWhatsapp(essay?.correctedEssay)
                              : null
                      }
                      type="button"
                      className={` w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 cursor-pointer
            ${buttonStyles[btn?.name] || "bg-gray-600 hover:bg-gray-700"}
          `}>
                      <Icon size={17} />
                      <span>{btn?.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-3">
            <div className="bg-white shadow rounded-lg p-4 w-full h-60 max-w-sm ">
              <div className="flex items-center gap-3">
                <Lightbulb />
                <label className="font-semibold">Quick Suggestions</label>
              </div>

              <div>
                {essay?.quickSuggestions?.map((items, ind) => (
                  <div key={ind} className="flex items-center gap-3 mt-4">
                    <div className="bg-green-500 w-6 h-6 flex justify-center items-center text-white rounded-full p-1">
                      <Check size={18} />
                    </div>
                    <p className="text-gray-600 text-sm">{items}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 w-full h-60 max-w-sm ">
              <div className="flex items-center gap-3">
                <label className="font-semibold">Essay Status</label>
              </div>

              <div>
                {essayStatus?.map((items, ind) => (
                  <div
                    key={ind}
                    className="flex items-center text-sm justify-between font-semibold gap-3 mt-4">
                    <p className="text-gray-600">{items?.name}</p>
                    <span>{items?.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EssayCheckerPage;
