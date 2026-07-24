"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./Theme-toggle";
import { everyWearCon } from "@/contexts/everyWear";
import { useAuth } from "@/hooks/useAuth";
import { navItemsForMob } from "@/data/links";
import Image from "next/image";
import { User, Mail, LogOut, } from "lucide-react";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = everyWearCon();
  const { logout } = useAuth();
  const [accoutDilog, setAcountDilog] = useState(true)
  
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      
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
             <div>
                <div onClick={() => setAcountDilog(!accoutDilog)} className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center uppercase bg-gray-100 cursor-pointer">
                  {
                    user?.image ?
                    <Image 
                    src={user?.image}
                    alt={user.username}
                    width={600}
                    height={600}
                    />
                    :
                    (
                      <span className="text-2xl font-semibold">
                        {user?.username[0]}
                      </span>
                    )
                  }
                </div>

              <div
                className="absolute top-16 right-0  overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{width: accoutDilog ? "0px" : "350px"}}
              >
                <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="truncate text-lg font-bold text-white">
                        {user?.username || "Guest User"}
                      </h3>

                      <p className="truncate text-sm text-blue-100">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

              
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                    <User size={18} className="text-blue-500" />
                    <div>
                      <p className="text-xs text-slate-500">Username</p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                    <Mail size={18} className="text-green-500" />
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="truncate font-medium text-slate-900 dark:text-white">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <button onClick={handleLogout} className="mt-2 flex w-full items-center justify-between rounded-xl p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20">
                      <div className="flex items-center gap-3">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>

                </div>
              </div>
                
             </div>
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

          
          <div className="flex justify-center items-center gap-2 flex-row-reverse md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

            
           {user ? (
             <div>
                <div onClick={() => setAcountDilog(!accoutDilog)} className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center uppercase bg-gray-100 cursor-pointer">
                  {
                    user?.image ?
                    <Image 
                    src={user?.image}
                    alt={user.username}
                    width={600}
                    height={600}
                    />
                    :
                    (
                      <span className="text-2xl font-semibold">
                        {user?.username[0]}
                      </span>
                    )
                  }
                </div>

              <div
                className="absolute top-16 right-0  overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{width: accoutDilog ? "0px" : "350px"}}
              >
                <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="truncate text-lg font-bold text-white">
                        {user?.username || "Guest User"}
                      </h3>

                      <p className="truncate text-sm text-blue-100">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

              
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                    <User size={18} className="text-blue-500" />
                    <div>
                      <p className="text-xs text-slate-500">Username</p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                    <Mail size={18} className="text-green-500" />
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="truncate font-medium text-slate-900 dark:text-white">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                    <button onClick={handleLogout} className="mt-2 flex w-full items-center justify-between rounded-xl p-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20">
                      <div className="flex items-center gap-3">
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>

                </div>
              </div>
                
             </div>
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
