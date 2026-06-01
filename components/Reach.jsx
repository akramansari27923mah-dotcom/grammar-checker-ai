import { reach } from "@/data/links";
import React from "react";

const Reach = () => {
  return (
    <div className="w-full flex justify-center items-center px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {reach.map((item, ind) => {
          const Icon = item.icon;

          return (
            <div
              key={ind}
              className="group bg-white border border-gray-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Icon size={30} />
              </div>

              {/* Content */}
              <div className="mt-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reach;
