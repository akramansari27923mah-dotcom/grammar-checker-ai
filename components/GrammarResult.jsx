"use client";

import { Copy } from "lucide-react";

export default function GrammarResult({
  data,
  copied,
  copyResult,
}) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow border">
          <p className="text-sm text-gray-500 mb-2">Grammar Score</p>

          <h2 className="md:text-4xl font-bold text-green-600">
            {data?.score}/100
          </h2>

          <p className="text-sm text-green-500 mt-1">Excellent Writing</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow border">
          <p className="text-sm text-gray-500 mb-2">Mistakes Found</p>

          <h2 className="md:text-4xl font-bold text-red-500">
            {data?.mistakesCount}
          </h2>

          <p className="text-sm text-red-400 mt-1">Needs Correction</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">✨</span>

          <h3 className="font-semibold text-lg">Corrected Text</h3>
        </div>

        <p className="leading-8 text-gray-700">{data?.correctedText}</p>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => copyResult(data?.correctedText)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 dark:bg-slate-800 hover:scale-105 transition dark:text-white cursor-pointer"
          >
            <Copy size={18} />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔍</span>

          <h3 className="font-semibold text-lg">Corrections</h3>
        </div>

        <div className="space-y-3">
          {data?.corrections?.map((item, index) => (
            <div key={index} className="border rounded-xl p-4 bg-gray-50">
              <div className="flex gap-2 flex-wrap">
                <span className="text-red-500 font-medium">
                  {item?.original}
                </span>

                <span>→</span>

                <span className="text-green-600 font-medium">
                  {item?.corrected}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2">{item?.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl shadow border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📈</span>

          <h3 className="font-semibold text-lg">AI Feedback</h3>
        </div>

        <p className="text-gray-700">{data?.summary?.overallFeedback}</p>
      </div>
    </div>
  );
}
