"use client";
import React, { useEffect, useState } from "react";
import { everyWearCon } from "@/contexts/everyWear";
import { ThemeToggle } from "@/components/Theme-toggle";
import { dashboardCard } from "@/data/dashboardCard";
import { api } from "@/lib/axios";

const Dashboard = () => {
  const { user, saved } = everyWearCon();
  const [savedLen, setSavedLen] = useState([]);

  useEffect(() => {
    const savedLenFetch = async () => {
      try {
        const { data } = await api.get("/totalChecks");
        setSavedLen(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    savedLenFetch();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            Welcome back,{" "}
            <span className="capitalize text-blue-500">{user?.username}</span>{" "}
            👋
          </h1>

          <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
            Here’s an overview of your writing activity and AI insights.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded-xl">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 px-3 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-200">
            <div className="w-11 h-11 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
              <span className="capitalize text-lg font-semibold text-white">
                {user?.username?.[0]}
              </span>
            </div>

            <div className="hidden md:block">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white capitalize">
                {user?.username}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Premium User
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------ */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {dashboardCard.map((item, ind) => {
          const Icon = item.icon;

          return (
            <div
              key={ind}
              className=" group relative overflow-hidden rounded-2xl  bg-white  dark:bg-gray-900 p-5 shadow-md border  border-zinc-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl  hover:border-blue-400 cursor-pointer
        "
            >
              <div
                className=" absolute inset-0 bg-lienear-to-r  from-blue-500/5  to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300
          "
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className=" p-3 rounded-xl  bg-blue-100  text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  >
                    <Icon size={24} />
                  </div>

                  <span className="text-zinc-600 font-medium dark:text-white">
                    {item.title}
                  </span>
                </div>

                <h2
                  className=" mt-5 text-3xl font-bold  text-zinc-800  dark:text-white  group-hover:text-blue-600 transition-colors
            "
                >
                  {item?.title === "Total Checks"
                    ? savedLen?.length
                    : item?.title === "Saved Documents" && saved?.length}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      {/* ------------------------------------------------------------------------------- */}
    </>
  );
};

export default Dashboard;
