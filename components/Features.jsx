import { features } from "@/data/links";
import React from "react";

const Features = () => {
  return (
    <div id="features" className="flex justify-center items-center mt-15">
      <div>
        <div className="text-center space-y-2">
          <h1 className="text-blue-500 font-semibold">FEATURES</h1>
          <p className="text-2xl font-bold">
            Everything You Need for Better Writing
          </p>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-8 mt-8">
          {features.map((item, ind) => {
            const Icon = item.icon;

            return (
              <div
                key={ind}
                className="group w-72 bg-white dark:bg-gray-900 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
    
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon size={28} />
                </div>

          
                <div className="mt-5 space-y-3">
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

export default Features;
