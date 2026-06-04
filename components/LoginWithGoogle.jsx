"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/lib/firebaseConfig";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { everyWearCon } from "@/contexts/everyWear";

const LoginWithGoogle = () => {
  const route = useRouter();
  const [loader, setLoader] = useState(false);
  const {setUpdate} = everyWearCon()

  const loginWithGoogleFun = async () => {
    try {
      setLoader(true);
      setUpdate(true)
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email, photoURL, uid } = result.user;

      const payLoad = {
        username: displayName,
        email,
        image: photoURL,
        googleId: uid,
      };

      const { data } = await api.post("/auth/google", payLoad);
      if (data?.success) {
        route.push("/");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoader(false);
      setUpdate(false)
    }
  };

  return (
    <div
      onClick={loginWithGoogleFun}
      className="flex justify-center items-center gap-2 bg-white rounded-lg hover:scale-105 transition-all cursor-pointer select-none duration-300 px-3 py-2 border border-gray-300"
    >
      {loader ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span>Loging...</span>
        </>
      ) : (
        <>
          <FcGoogle size={20} />
          <p className="text-sm">Continue With Google</p>
        </>
      )}
    </div>
  );
};

export default LoginWithGoogle;
