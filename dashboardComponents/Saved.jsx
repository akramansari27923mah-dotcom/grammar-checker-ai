"use client";
import { api } from "@/lib/axios";
import { LoaderCircle, RefreshCcw, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { timeFormater } from "@/lib/timeFormater";
import { successShow } from "@/lib/toast";
import { useRouter } from "next/navigation";

const Saved = () => {
  const { saved, setSaved, setUpdate, update, setSaveLoader, saveLoader } =
    everyWearCon();
  const [cardId, setCardId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const route = useRouter()

  useEffect(() => {
    const savedFetchFunction = async () => {
      setSaveLoader(true);
      console.log(saved);

      try {
        const { data } = await api.get("/saved");
        setSaved(data.saved);
      } catch (err) {
        console.log(err.message);
      } finally {
        setSaveLoader(false);
      }
    };

    savedFetchFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const copyResult = (result) => {
    window.navigator.clipboard.writeText(result);
    successShow("Copied");
  };

  const handleDelete = async (id) => {
    setUpdate(true);
    try {
      const { data } = await api.delete(`/saved/${id}`);
    } catch (err) {
      console.log(err.message);
    } finally {
      setUpdate(false);
    }
  };

  const view = (result) => {
    localStorage.setItem("result", JSON.stringify(result));
    localStorage.setItem("view", "view");
    route.push("/grammar-checker");
  };

  if (saveLoader)
    return (
      <div className="flex justify-center items-center h-130 gap-2 text-xl text-gray-500 italic">
        <LoaderCircle className="animate-spin" />
        Loading...
      </div>
    );

  return (
    <>
      {saved.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <div className="bg-gray-100 dark:bg-slate-800 p-5 rounded-full mb-4">
            <Trash className="w-10 h-10 text-gray-500 dark:text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            No Saved Cards
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
            You haven`t saved any cards yet. Saved cards will appear here for
            quick access whenever you need them.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-slate-800">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delete Saved Card
                  </h2>

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete this saved card? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      (handleDelete(cardId), setDeleteModal(false));
                    }}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <Trash size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute right-5 top-2 cursor-pointer flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300"
          onClick={() => setUpdate(!update)}
        >
          <RefreshCcw size={16} />
          <span>Refresh</span>
        </div>

        {saved.map((item) => (
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
              <button
                onClick={() => view(item?.replyFromAi)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 text-white text-sm cursor-pointer font-medium py-2.5 rounded-2xl"
              >
                View
              </button>

              <button
                onClick={() => copyResult(item?.replyFromAi)}
                className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200 text-gray-700 dark:text-gray-300 text-sm cursor-pointer font-medium py-2.5 rounded-2xl"
              >
                Copy
              </button>

              <button
                onClick={() => {
                  (setCardId(item._id), setDeleteModal(true));
                }}
                className="flex-1 bg-red-600 dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-slate-700 active:scale-95 transition-all duration-200 text-white dark:text-gray-300 text-sm cursor-pointer font-medium py-2.5 rounded-2xl flex justify-center items-center gap-2"
              >
                <Trash size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Saved;
