"use client";

import { everyWearCon } from "@/contexts/everyWear";
import { dummy } from "@/data/dummy";
import { api } from "@/lib/axios";
import {
  removeFromSessionStorage,
  saveInSessionStorage,
} from "@/lib/storageFunctions";
import { errorShow, successShow } from "@/lib/toast";
import {
  BadgeCheck,
  BookOpen,
  Check,
  Eye,
  Lightbulb,
  LoaderCircle,
  Network,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash,
  TrendingUp,
  Trophy,
  WandSparkles,
  X,
} from "lucide-react";
import React, { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const writingBgOrColor = (type, isFor) => {
  if (isFor === "G") {
    if (type === "Grammar") return "bg-green-100 text-green-500";
    if (type === "Vocabulary") return "bg-indigo-100 text-indigo-500";
    if (type === "Clarity") return "bg-sky-100 text-sky-500";
    if (type === "Structure") return "bg-orange-100 text-orange-500";
    if (type === "Readability") return "bg-pink-100 text-pink-500";
  }

  if (isFor === "C") {
    if (type === "Grammar") return "text-green-500";
    if (type === "Vocabulary") return "text-indigo-500";
    if (type === "Clarity") return "text-sky-500";
    if (type === "Structure") return "text-orange-500";
    if (type === "Readability") return "text-pink-500";
  }
};

const WritingCheckerPage = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const {
    writing,
    setWriting,
    writingScoreD,
    setWritingScoreD,
    writingUpdate,
    setWritingUpdate,
  } = everyWearCon();

  const { grammar, vocabulary, clarity, structure, readability } =
    writingScoreD?.categories || {};

  const { improvementTips, overallScore, strengths, summary } =
    writingScoreD || {};

  const writingData = [
    {
      name: "Grammar",
      score: grammar?.score,
      icon: ShieldCheck,
    },
    {
      name: "Vocabulary",
      score: vocabulary?.score,
      icon: BookOpen,
    },
    {
      name: "Clarity",
      score: clarity?.score,
      icon: Lightbulb,
    },
    {
      name: "Structure",
      score: structure?.score,
      icon: Network,
    },
    {
      name: "Readability",
      score: readability?.score,
      icon: Eye,
    },
  ];

  const writingScore = async () => {
    if (!writing?.trim()) return errorShow("Writing is required!");
    setLoader(true);
    setError(false);
    setWritingUpdate(true);
    try {
      const { data } = await api.post("/groq/writingChecker", { writing });
      console.log(data);
      if (!data.data?.success)
        return setError(true) || errorShow(data?.data?.message);

      if (data?.success) {
        setWritingScoreD(data?.data);
        saveInSessionStorage("writing", data?.data);
      }
    } catch (err) {
      console.error(err?.message);
      setError(true);
    } finally {
      setError(false);
      setLoader(false);
    }
  };

  const handelKeyPress = (e) => {
    if(e?.key === "Enter" && !e?.shiftKey){
        e.preventDefault()
        writingScore()
    }
  }

  return (
    <div>
      <nav className="flex items-center justify-between h-20 md:px-8 px-4 bg-linear-to-r from-white via-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex md:h-14 md:w-14 h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="md:text-2xl font-bold text-slate-800">
                Writing Score
              </h1>

              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                AI
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 hidden md:block">
              We find mistakes, explain why they&lsquo;re wrong, and help
              improve.
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
              (removeFromSessionStorage("writing"),
                setWritingUpdate(!writingUpdate));
            }}
            className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-500 px-4 py-2 shadow-sm text-white cursor-pointer">
            <Plus size={18} />
            <span className="text-sm font-medium">Check Another Essay</span>
          </button>
        </div>
      </nav>

      {!grammar && (
        <div className="w-full max-w-7xl mx-auto my-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <textarea
            placeholder="Type or paste your sentence here..."
            maxLength={500}
            value={writing}
            onKeyDown={handelKeyPress}
            onChange={(e) => setWriting(e?.target?.value)}
            className="min-h-40 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
          {error && (
            <span className="md:text-sm text-xs text-red-500">
              Please provide a valid sentence
            </span>
          )}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Character Counter */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-500">
                {writing.length} / 5000 Characters
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setWriting("")}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100">
                <X size={16} />
                Clear
              </button>

              <button
                onClick={writingScore}
                className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed text-nowrap">
                {loader ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Analyzing your sentence...
                  </>
                ) : (
                  <>
                    <WandSparkles
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    Explain Mistakes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {grammar && (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm w-full max-w-7xl mx-auto my-5">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-52 h-52 shrink-0">
              <div className="absolute inset-0 rounded-full bg-indigo-100 blur-2xl opacity-40" />

              <div className="relative w-full h-full">
                <CircularProgressbarWithChildren
                  value={dummy?.data?.overallScore}
                  styles={buildStyles({
                    pathColor: "#6366f1",
                    trailColor: "#eef2ff",
                    strokeLinecap: "round",
                    pathTransitionDuration: 1,
                  })}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Overall Score
                    </span>

                    <p className="text-5xl font-bold text-indigo-600 mt-1">
                      {overallScore}
                    </p>

                    <span className="text-xs text-gray-400">out of 100</span>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
                <Sparkles size={16} />
                Writing Analysis
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                  Good Job!
                  <span>😎</span>
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                  {summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-600">
                  <TrendingUp size={17} />
                  Great performance
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-600">
                  <Trophy size={17} />
                  Keep improving
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Next Goal
                </p>

                <p className="mt-1 text-sm font-medium text-gray-700">
                  Improve your score to{" "}
                  <span className="font-bold text-indigo-600">
                    {Math.min(dummy?.data?.overallScore + 10, 100)}/100
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {grammar && (
        <div className="grid md:grid-cols-3 grid-cols-1 p-8 justify-center items-center gap-5 flex-wrap">
          {writingData?.map((items, ind) => {
            const Icon = items?.icon;
            return (
              <div
                key={ind}
                className="group w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${writingBgOrColor(
                        items?.name,
                        "G",
                      )}`}>
                      <Icon size={26} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {items?.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Writing performance
                      </p>
                    </div>
                  </div>

                  {/* Score badge */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${writingBgOrColor(
                      items?.name,
                    )}`}>
                    {items?.score >= 90
                      ? "Excellent"
                      : items?.score >= 80
                        ? "Great"
                        : items?.score >= 70
                          ? "Good"
                          : "Needs Work"}
                  </span>
                </div>

                {/* Score */}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <span
                      className={`text-4xl font-bold ${writingBgOrColor(
                        items?.name,
                        "C",
                      )}`}>
                      {items?.score}
                    </span>

                    <span className="ml-1 text-sm text-gray-400">/100</span>
                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    Score
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${items?.name === "Grammar" ? "bg-green-500" : items?.name === "Vocabulary" ? "bg-indigo-500" : items?.name === "Clarity" ? "bg-sky-500" : items?.name === "Structure" ? "bg-orange-500" : items?.name === "Readability" && "bg-pink-500"}`}
                      style={{
                        width: `${items?.score}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-gray-400">0</span>
                    <span className="font-medium text-gray-500">
                      {items?.score}% achieved
                    </span>
                    <span className="text-gray-400">100</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {grammar && (
        <div className=" flex justify-center items-center md:flex-row flex-col gap-10 grid-cols-1 p-8">
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Improvement Tips
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Follow these suggestions to improve your writing score.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {improvementTips?.map((item, ind) => (
                <div
                  key={ind}
                  className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    {ind + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm leading-5 text-gray-700">{item}</p>
                  </div>

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5">
              <Sparkles size={15} className="text-indigo-500" />

              <p className="text-xs font-medium text-indigo-600">
                Apply these tips to improve your next essay.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Your Strengths
                </h2>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Here’s what you’re doing well in your writing.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {strengths?.map((item, ind) => (
                <div
                  key={ind}
                  className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50">
                  {/* Number */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    {ind + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm leading-5 text-gray-700">{item}</p>
                  </div>

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2.5">
              <Sparkles size={15} className="text-indigo-500" />

              <p className="text-xs font-medium text-green-700">
                Keep building on these strengths to make your writing even
                better.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingCheckerPage;
