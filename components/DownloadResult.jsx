import { CircleX } from "lucide-react";
import React from "react";

const DownloadResult = ({
  setExtInputBoxOpned,
  setFileExt,
  downloadPdf,
  downloadText,
  downloadDocx,
  fileExt,
  result,
}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-black/60 z-10 backdrop-blur-md fixed w-full">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-6 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl font-bold text-gray-800">Save Your File</h2>
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
              downloadPdf(result, setExtInputBoxOpned, setFileExt, fileExt)
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
              downloadDocx(result, setExtInputBoxOpned, setFileExt, fileExt)
            }
            disabled={fileExt === "txt" || fileExt === "pdf" || !fileExt.trim()}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200 text-white font-semibold py-3 rounded-2xl shadow-lg cursor-pointer disabled:cursor-not-allowed"
          >
            Save Docx
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadResult;
