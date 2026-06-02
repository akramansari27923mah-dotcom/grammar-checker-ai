"use client";

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  History,
  House,
  LayoutDashboard,
  Pencil,
  Save,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(260);

  return (
    <>
      <div
        className={`fixed z-40`}
        style={{
          width: `${open}px`,
        }}
      >
        {/* Sidebar */}

        <div className="p-3 md:p-1 cursor-pointer" onClick={() => setOpen(260)}>
          <ArrowRightToLine />
        </div>

        <>
          <aside
            className={`bg-white text-black ${open === 260 ? "p-5" : ""} transition-all duration-300 h-screen fixed top-0 left-0 overflow-hidden border border-gray-200`}
            style={{
              width: `${open}px`,
            }}
          >
            <div className="flex  items-center gap-2 text-xl font-semibold mb-8">
              <div>
                <span className="py-1 px-2 rounded-lg bg-blue-500 text-white">
                  AI
                </span>
              </div>
              <span className="text-nowrap">Grammer AI</span>
              <div className="p-3 cursor-pointer" onClick={() => setOpen(0)}>
                <ArrowLeftToLine />
              </div>
            </div>

            <nav className="flex flex-col gap-5">
              <Link
                href="/"
                className="flex items-center gap-4 focus:bg-blue-100 focus:text-blue-500 px-4 py-2 rounded-lg"
              >
                <House />
                <span className="font-semibold">Home</span>
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center gap-4 focus:bg-blue-100 focus:text-blue-500 px-4 py-2 rounded-lg"
              >
                <LayoutDashboard />
                <span className="font-semibold">Dashboard</span>
              </Link>

              <Link
                href="/grammar-checker"
                className="flex items-center gap-4 focus:bg-blue-100 focus:text-blue-500 px-4 py-2 rounded-lg text-nowrap"
              >
                <Pencil />
                <span className="font-semibold">Grammar Checker</span>
              </Link>

              <Link
                href="/dashboard/history"
                className="flex items-center gap-4 focus:bg-blue-100 focus:text-blue-500 px-4 py-2 rounded-lg"
              >
                <History />
                <span className="font-semibold">History</span>
              </Link>
              <Link
                href="/dashboard/saved"
                className="flex items-center gap-4 focus:bg-blue-100 focus:text-blue-500 px-4 py-2 rounded-lg text-nowrap"
              >
                <Save />
                <span className="font-semibold">Saved Corrections</span>
              </Link>
            </nav>
          </aside>
        </>
      </div>
    </>
  );
};

export default Navbar;
