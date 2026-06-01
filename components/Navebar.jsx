"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { ThemeToggle } from "./Theme-toggle";
import Link from "next/link";
import { everyWearCon } from "@/contexts/everyWear";
import { useAuth } from "@/hooks/useAuth";
import { navItems } from "@/data/links";

const Navebar = () => {
  const [openMenu, setOpenMenu] = useState("w-0");
  const { user } = everyWearCon();
  const { logout } = useAuth();

  const handelLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className="flex justify-between fixed z-30 top-0 w-full items-center bg-white backdrop-blur-md py-4 px-10 dark:bg-black">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-xl font-bold cursor-pointer"
        >
          <span className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:rotate-12 transition-transform duration-300">
            AI
          </span>
          <span className="hover:text-blue-500 transition-colors">
            Grammar AI
          </span>
        </Link>

        {/* links */}
        <div className="md:flex justify-center items-center gap-10 text-md hidden lg::block">
          <button>
             <a href="#">Home</a>
          </button>
          <button>
            <a href="#features">Features</a>
          </button>
          <button>
            <a href="#hiw">How it works</a>
          </button>
          <button href="#hiw">About</button>
          <button href="#hiw">Contact</button>
        </div>

        <div className="md:flex justify-center items-center gap-5 hidden lg::block">
          <ThemeToggle />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
            <Link href="/grammar-checker">Try For Free</Link>
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
            <Link href="/dashboard">Dashboard</Link>
          </button>

          {user ? (
            <button
              onClick={handelLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
              <Link href="/login">login</Link>
            </button>
          )}
        </div>

        {/* Small screen */}
        <div className="md:hidden">
          {openMenu === "w-60 p-3" ? (
            <X
              onClick={() => setOpenMenu("w-0")}
              className="cursor-pointer hover:rotate-90 transition-all duration-300"
            />
          ) : (
            <Menu
              onClick={() => setOpenMenu("w-60 p-3")}
              className="cursor-pointer hover:rotate-180 transition-all duration-300"
            />
          )}
        </div>

        {openMenu && (
          <aside
            className={`fixed top-15 left-0  h-144 ${openMenu} bg-white backdrop-blur-md overflow-scroll duration-300 transition-all hide-scroll`}
          >
            <div className="flex flex-col justify-center gap-5">
              {navItems.map((item, ind) => {
                const Icon = item.icon;

                return (
                  <button
                    key={ind}
                    className="
          group
          flex
          items-center
          gap-4
          w-full
          px-4
          py-3
          rounded-xl
          cursor-pointer
          transition-all
          duration-300
          hover:bg-blue-500
          hover:text-white
          hover:translate-x-2
          hover:shadow-lg
          hover:shadow-blue-500/20
        "
                  >
                    <Icon
                      size={20}
                      className="
            transition-all
            duration-300
            group-hover:scale-125
            group-hover:rotate-12
          "
                    />

                    <span className="font-medium text-nowrap">{item.name}</span>

                    <span
                      className="
            ml-auto
            opacity-0
            -translate-x-2
            transition-all
            duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
                    >
                      →
                    </span>
                  </button>
                );
              })}
              <ThemeToggle />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
                <Link href="/grammar-checker">Try For Free</Link>
              </button>

              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </button>

              {user ? (
                <button
                  onClick={handelLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:scale-105 transition-all duration-300">
                  <Link href="/login">login</Link>
                </button>
              )}
            </div>
          </aside>
        )}
      </nav>
    </div>
  );
};

export default Navebar;
