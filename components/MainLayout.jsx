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
      <div className="flex justify-center items-center h-screen text-xl italic gap-2">
        <LoaderCircle className="animate-spin" />
        Loading...
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