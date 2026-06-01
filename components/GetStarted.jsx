import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <section className="w-full flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-6xl bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl px-8 md:px-14 py-12 shadow-2xl overflow-hidden relative">
        {/* Background Blur */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left Content */}
          <div className="text-center md:text-left max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Sparkles className="text-yellow-300" size={22} />
              <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
                AI Powered Grammar Checker
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Ready to Write Better & Smarter?
            </h1>

            <p className="text-blue-100 text-lg mt-5 leading-relaxed">
              Join thousands of users who trust our AI grammar checker to
              improve their writing, fix mistakes, and write with confidence
              every day.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/grammar-checker"
              className="group flex items-center gap-3 bg-white text-blue-600 font-semibold px-7 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span>Get Started for Free</span>

              <ArrowRight
                className="group-hover:translate-x-1 transition-all duration-300"
                size={20}
              />
            </Link>

            <span className="text-sm text-blue-100">
              No credit card required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
