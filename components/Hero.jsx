"use client";

import { ChevronDown, Copy, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden md:mt-10 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
    
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center min-h-screen">

        {/* Left Side */}
        <div className="space-y-8 pt-24 lg:pt-0">

      
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm">
            <span>✨</span>
            <span className="text-sm font-medium">
              AI Powered Grammar Checker
            </span>
          </div>

          
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white">
              Perfect Your
              <span className="block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Writing With AI
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Instantly fix grammar mistakes, improve sentence structure,
              enhance clarity, and write with confidence using advanced AI.
            </p>
          </div>

        
          <div className="flex flex-wrap gap-4">
            <Link
              href="/grammar-checker"
              className="
                px-8 py-4
                rounded-xl
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-700
                hover:scale-105
                hover:shadow-xl
                hover:shadow-blue-500/30
                transition-all
              "
            >
              Start Checking Free →
            </Link>
          </div>

          
          <div className="flex flex-wrap gap-10 pt-4">
            <div>
              <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
              <p className="text-sm text-slate-500">Grammar Checks</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">99%</h3>
              <p className="text-sm text-slate-500">Accuracy</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
              <p className="text-sm text-slate-500">Available</p>
            </div>
          </div>
        </div>

      
      {/* Right side */}
        <div className="relative hover:scale-105 transition-all duration-300">
          <Image 
          src={'/hero.png'}
          loading="lazy"
          alt="hero image"
          width={600}
          height={600}
          className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;