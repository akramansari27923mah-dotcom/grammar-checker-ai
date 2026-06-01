"use client";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { everyWearCon } from "@/contexts/everyWear";

const SignUpPage = () => {
  const model = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(model);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const { loader } = everyWearCon();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    signup(formData);
  };

  return (
    <div className="min-h-screen bg-lienear-to-br from-indigo-100 via-blue-100 to-white flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-linear-to-r from-indigo-500 to-blue-500 flex justify-center items-center shadow-lg">
            <LockKeyhole size={34} className="text-white" />
          </div>

          <div className="text-center mt-5">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2 text-sm">
              Sign up to get started with your account
            </p>
          </div>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-5 mt-8">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>

            <div className="relative mt-2">
              <User
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={handleInput}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleInput}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleInput}
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer">
            {loader ? (
              <div className="flex justify-center items-center gap-2">
                <LoaderCircle className="animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="flex justify-center items-center gap-1 text-sm mt-6 text-gray-600">
          <span>Already have an account?</span>

          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
