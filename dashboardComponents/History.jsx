/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { Bookmark, BookmarkOff, HistoryIcon, LoaderCircle, RefreshCcw } from "lucide-react";
import { successShow } from "@/lib/toast";
import { timeFormater } from "@/lib/timeFormater";
import { savedFunction } from "@/lib/savedFunction";
import { useRouter } from "next/navigation";

const History = () => {
  const { history, historyLoader, setUpdate, update } = everyWearCon();
  const [upd, setUpd] = useState(false);
  const [id, setId] = useState("");
  const [savedItems, setSavedItems] = useState({});
  const route = useRouter()

  const copyResult = (result) => {
    window.navigator.clipboard.writeText(result);
    successShow("Copied");
  };

  const view = (result) => {
    localStorage.setItem('result', JSON.stringify(result) )
    localStorage.setItem('view', 'view' )
    route.push('/grammar-checker')
  }

  const savePrefreHistory = ({ prompt, replyFromAi, userId }, id) => {
    try {
      setUpd(true);
      setId(id);
      localStorage.removeItem(`isNotSaved_${id}`);
      localStorage.setItem(`isSaved_${id}`, JSON.stringify(true));

      setSavedItems((prev) => ({
        ...prev,
        [id]: true,
      }));

      const data = {
        prompt,
        replyFromAi,
        userId,
      };

      savedFunction(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setUpd(false);
    }
  };


  const unSavePrefreHistory = ({ prompt, replyFromAi, userId }, id) => {
    try {
      localStorage.removeItem(`isSaved_${id}`);
      localStorage.setItem(`isNotSaved_${id}`, JSON.stringify(false));
      setSaved(false);
      setSavedItems((prev) => ({
        ...prev,
        [id]: false,
      }));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!history?.length) return;

    const updatedSavedItems = {};

    history.forEach((item) => {
      const savedStatus = localStorage.getItem(`saved_${item._id}`);

      updatedSavedItems[item._id] = savedStatus
        ? JSON.parse(savedStatus)
        : false;
    });

    setSavedItems(updatedSavedItems);
  }, [history, upd]);

  if (historyLoader)
    return (
      <div className="flex justify-center items-center h-130 gap-2 text-xl text-gray-500 italic">
        <LoaderCircle className="animate-spin" />
        Loading...
      </div>
    );

  return (
    <>
     {history.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
              <div className="bg-gray-100 dark:bg-slate-800 p-5 rounded-full mb-4">
                <HistoryIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </div>
    
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                No Saved history yet
              </h2>
    
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
                You haven`t saved any history yet. history cards will appear here for
                quick access whenever you need them.
              </p>
            </div>
          )}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
      <div
        className="absolute right-5 top-2 cursor-pointer flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300"
        onClick={() => setUpdate(!update)}
      >
        <RefreshCcw size={16} />
        <span>Refresh</span>
      </div>

      {history.map((item) => (
        <div
          key={item._id}
          className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Top Section */}
          <div className="flex items-start justify-between mb-4">
            {/* User Icon */}
            <div className="w-11 h-11 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg">✨</span>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {timeFormater(item?.createdAt)}
            </span>
          </div>

          {/* Prompt */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
              {item.prompt}
            </h2>
          </div>

          {/* AI Reply */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 line-clamp-5">
              {item?.replyFromAi}
            </p>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center gap-3 mt-5">
            <button onClick={() => view(item?.replyFromAi)} className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 text-white text-sm cursor-pointer font-medium py-2.5 rounded-2xl">
              View
            </button>

            <button
              onClick={() => copyResult(item?.replyFromAi)}
              className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200 text-gray-700 dark:text-gray-300 text-sm cursor-pointer font-medium py-2.5 rounded-2xl"
            >
              Copy
            </button>

            <button>
              {savedItems[item._id] ? (
                <BookmarkOff
                  onClick={() => unSavePrefreHistory(item, item._id)}
                  className="cursor-pointer"
                />
              ) : (
                <Bookmark
                  onClick={() => savePrefreHistory(item, item._id)}
                  className="cursor-pointer"
                />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default History;
