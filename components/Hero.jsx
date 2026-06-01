"use client";

import { ChevronDown, Copy, Download } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden md:mt-10 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
    
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center min-h-screen">

        {/* Left Side */}
        <div className="space-y-8 pt-24 lg:pt-0">

      
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm">
            <span>✨</span>
            <span className="text-sm font-medium">
              AI Powered Grammar Checker
            </span>
          </div>

          
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white">
              Perfect Your
              <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Writing With AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Instantly fix grammar mistakes, improve sentence structure,
              enhance clarity, and write with confidence using advanced AI.
            </p>
          </div>

        
          <div className="flex flex-wrap gap-4">
            <Link
              href="/grammar-checker"
              className="
                px-8 py-4
                rounded-xl
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-700
                hover:scale-105
                hover:shadow-xl
                hover:shadow-blue-500/30
                transition-all
              "
            >
              Start Checking Free →
            </Link>

            <button
              className="
                px-8 py-4
                rounded-xl
                border
                border-slate-300
                bg-white/70
                backdrop-blur-md
                hover:bg-white
                transition-all
              "
            >
              Watch Demo
            </button>
          </div>

          
          <div className="flex flex-wrap gap-10 pt-4">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
              <p className="text-sm text-slate-500">Grammar Checks</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">99%</h3>
              <p className="text-sm text-slate-500">Accuracy</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
              <p className="text-sm text-slate-500">Available</p>
            </div>
          </div>
        </div>

      
      {/* Right side */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 dark:text-black bg-white px-4 py-2 rounded-xl shadow-xl z-20">
            ✨ Grammar Fixed
          </div>

          <div className="absolute md:-bottom-6 dark:text-black -bottom-1 -right-6 bg-white px-4 py-2 rounded-xl shadow-xl z-20">
            ⚡ AI Powered
          </div>

          
          <div className="bg-white/90 dark:bg-slate-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 mb-5 md:mb-0 p-6">

            <div className="space-y-3">

              <div className="flex justify-end items-center gap-3 text-sm">
                <div className="flex items-center gap-2 border border-slate-300 px-3 py-1 rounded-lg">
                  <span>English</span>
                  <ChevronDown size={15} />
                </div>

                <button className="border border-slate-300 px-3 py-1 rounded-lg">
                  Clear
                </button>
              </div>

              <h2 className="text-xl font-semibold dark:text-white">
                Your Text
              </h2>

              <textarea
                className="
                  w-full
                  h-40
                  rounded-xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-transparent
                  p-4
                  resize-none
                  outline-none
                "
                placeholder="I has a pen..."
              />

              <button
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-medium
                  hover:bg-blue-700
                  transition
                "
              >
                Correct Grammar
              </button>

              
              <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                <p className="text-red-500 line-through">
                  I has a pen.
                </p>

                <p className="mt-2 text-green-600 font-semibold">
                  I have a pen.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition">
                  <Copy size={16} />
                  Copy
                </button>

                <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition">
                  <Download size={16} />
                  Download
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;