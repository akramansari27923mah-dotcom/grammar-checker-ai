import { features, howItWork } from "@/data/links";
import React from "react";

const HowItWork = () => {
  return (
    <div id="hiw" className="flex justify-center items-center mt-15">
      <div>
        <div className="text-center space-y-2">
          <h1 className="text-blue-500 font-semibold">How It Works</h1>
          <p className="text-2xl font-bold">
            Improve Your Writing in 3 Simple Steps
          </p>
        </div>

        <div className="lg:flex justify-center items-center mt-5 hidden md:block">
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white">
            1
          </span>
          <span className="text-gray-300">
            ---------------------------------
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white">
            2
          </span>
          <span className="text-gray-300">
            ---------------------------------
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white">
            3
          </span>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-8">
          {howItWork.map((item, ind) => {
            const Icon = item.icon;

            return (
              <div
                key={ind}
                className="group w-72 rounded-2xl p-6 flex flex-col justify-center items-center  hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="w-25 h-25 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon size={28} />
                </div>

                <div className="mt-5 space-y-3 text-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 leading-relaxed text-sm dark:text-gray-500">
                    {item.desc}
                  </p>
                </div>

                <button className="mt-5 text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-all duration-300">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
