import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/everyWear";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata = {
  title: "GrammarCheckerAI – Free AI Grammar Checker & Writing Assistant",
  description:
    "Improve your writing instantly with GrammarCheckerAI. Correct grammar, spelling, punctuation, and style using AI. Perfect for students, professionals, bloggers, and content creators.",
  keywords: [
    "AI Grammar Checker",
    "Grammar Correction",
    "Spell Checker",
    "Writing Assistant",
    "English Grammar",
    "Punctuation Checker",
    "AI Writing Tool",
    "GrammarCheckerAI",
    "Free Grammar Checker",
    "Online Grammar Checker",
  ],
  authors: [{ name: "GrammarCheckerAI" }],
  creator: "GrammarCheckerAI",
  publisher: "GrammarCheckerAI",
  metadataBase: new URL("https://grammarcheckerai.vercel.app/"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GrammarCheckerAI – Free AI Grammar Checker & Writing Assistant",
    description:
      "Write with confidence using AI. Fix grammar, spelling, punctuation, and improve clarity in seconds.",
    url: "https://grammarcheckerai.vercel.app/", // Replace with your actual domain
    siteName: "GrammarCheckerAI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png", // Add an Open Graph image in your public folder
        width: 1200,
        height: 630,
        alt: "GrammarCheckerAI",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
