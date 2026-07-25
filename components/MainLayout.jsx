"use client";
import { usePathname } from "next/navigation";
import Navebar from "@/components/Navebar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { everyWearCon } from "@/contexts/everyWear";
import HowItWork from "./HowItWork";
import Reach from "./Reach";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import Chat from "./Chat";
import { LoaderCircle } from "lucide-react";

export default function MainLayout({ children }) {
  const {checkUserLoader} = everyWearCon()
  const pathName = usePathname();

  const blackList = [
    "/grammar-checker",
    "/login",
    "/signup",
    "/contact",
    "/dashboard",
    "/dashboard/history",
    "/dashboard/saved"
  ];

  const isMatch = blackList.includes(pathName);

  if(checkUserLoader){
    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/10 px-10 py-8 shadow-2xl backdrop-blur-xl">
        <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
        <div className="space-y-1 text-center">
          <p className="text-lg font-semibold text-white">
            Loading...
          </p>
          <p className="text-sm text-gray-300">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen">
        {!isMatch && (
          <>
            <Navebar />
            <Hero />
            <Chat />
            <Features />
            <HowItWork />
            <Reach />
            <GetStarted />
            <Footer />
          </>
        )}

        {children}
      </main>
    </ThemeProvider>
  );
}