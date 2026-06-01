"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./Theme-toggle";
import { everyWearCon } from "@/contexts/everyWear";
import { useAuth } from "@/hooks/useAuth";
import { navItemsForMob } from "@/data/links";
import { navItems } from "@/data/links";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = everyWearCon();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <nav
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          bg-white/80
          dark:bg-black/80
          backdrop-blur-xl
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="
                bg-linear-to-r
                from-blue-600
                to-indigo-600
                text-white
                px-3
                py-2
                rounded-xl
                font-bold
                transition-all
                duration-300
                group-hover:rotate-6
              "
            >
              AI
            </div>

            <span
              className="
                text-xl
                font-bold
                transition-colors
                duration-300
                group-hover:text-blue-600
              "
            >
              Grammar AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItemsForMob.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  relative
                  text-slate-600
                  dark:text-slate-300
                  hover:text-blue-600
                  transition-colors
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-0.5
                  after:w-0
                  after:bg-blue-600
                  after:transition-all
                  hover:after:w-full
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/grammar-checker"
              className="
                px-5
                py-2.5
                rounded-xl
                bg-blue-600
                text-white
                font-medium
                hover:bg-blue-700
                hover:shadow-lg
                hover:shadow-blue-500/30
                transition-all
              "
            >
              Try Free
            </Link>

            <Link
              href="/dashboard"
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition-all
              "
            >
              Dashboard
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  transition-all
                  cursor-pointer
                "
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                  transition-all
                "
              >
                Login
              </Link>
            )}
          </div>

          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-white
          dark:bg-slate-950
          border-r
          border-slate-200
          dark:border-slate-800
          z-50
          transform
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Grammar AI</h2>

            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {navItemsForMob.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-xl
                  hover:bg-blue-500
                  hover:text-white
                  transition-all
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <ThemeToggle />

            <Link
              href="/grammar-checker"
              className="
                text-center
                bg-blue-600
                text-white
                py-3
                rounded-xl
              "
            >
              Try Free
            </Link>

            <Link
              href="/dashboard"
              className="
                text-center
                border
                py-3
                rounded-xl
              "
            >
              Dashboard
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  text-white
                  py-3
                  rounded-xl
                "
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="
                  text-center
                  border
                  py-3
                  rounded-xl
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
