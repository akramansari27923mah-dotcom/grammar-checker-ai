import { ChevronDown, Copy, Download } from "lucide-react";
import Link from "next/link";
import React from "react";


const Hero = () => {
  return (
    <div className=" bg-linear-to-r from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center z-10 min-h-screen">
        {/* Left Side */}
        <div className="space-y-6 mt-20 md:p-0 md:m-0 ">
          <span className="px-4 py-2 rounded-full bg-blue-200 dark:bg-slate-800 text-xs font-medium">
            ✨ AI Powered Grammar Checker
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black dark:text-white">
            Write Better.
            <span className="text-blue-600"> Faster.</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
            Improve grammar, spelling, and sentence structure with your modern
            AI writing assistant.
          </p>

          <div className="flex gap-4">
            <Link
              href="/grammar-checker"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Try Now
            </Link>

            <button className="px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-700 hover:bg-white/40 dark:hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="flex justify-end items-center text-sm gap-3">
              <div className="flex justify-center items-center gap-2 border border-gray-400 px-2 py-0.5 rounded-md">
                <span>English</span>
                <ChevronDown size={15} />
              </div>

              <button className="border border-gray-400 px-3 py-1 rounded-md">
                Clear
              </button>
            </div>
            <h2 className="text-xl font-semibold dark:text-white">Your Text</h2>

            <textarea
              className="
              w-full
              h-40
              rounded-xl
              p-4
              outline-none
              border
              border-gray-300
              dark:border-slate-700
              bg-transparent
              resize-none
              dark:text-white
            "
              placeholder="i has a pen..."
            />

            <button
              className="
              w-full
              py-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              transition
            "
            >
              Correct Grammar
            </button>

            <div className="rounded-xl bg-green-100 dark:bg-green-900/30 p-4">
              <p className="text-green-700 dark:text-green-400">
                I have a pen.
              </p>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-md border border-gray-300">
                <Copy size={15} color="blue" />
                <button>Copy</button>
              </div>
              <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-md border border-gray-300">
                <Download size={15} color="blue" />
                <button>Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
