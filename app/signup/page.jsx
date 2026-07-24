import SignUpPage from '@/components/Signup'
import React from 'react'

export const metadata = {
  title: "Signup - GrammarCheckerAI",
  description:
    "Signup - GrammarCheckerAI for GrammarCheckerAI.",
  keywords: [
    "Signup - GrammarCheckerAI",
    "GrammarCheckerAI",
    "AI Grammar Checker",
    "AI Writing Assistant",
  ],
  alternates: {
    canonical: "https://grammarcheckerai.vercel.app/signup",
  },
  openGraph: {
    title: "Signup | GrammarCheckerAI",
    description:
      "Signup - GrammarCheckerAI for using GrammarCheckerAI and our AI-powered grammar checking services.",
    url: "https://grammarcheckerai.vercel.app/signup",
    siteName: "GrammarCheckerAI",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Signup = () => {
  return (
    <div>
      <SignUpPage />
    </div>
  )
}

export default Signup