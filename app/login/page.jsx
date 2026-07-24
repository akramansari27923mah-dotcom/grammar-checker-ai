import LoginPage from '@/components/Login'
import React from 'react'

export const metadata = {
  title: "Login - GrammarCheckerAI",
  description:
    "Login - GrammarCheckerAI for GrammarCheckerAI.",
  keywords: [
    "Login - GrammarCheckerAI",
    "GrammarCheckerAI",
    "AI Grammar Checker",
    "AI Writing Assistant",
  ],
  alternates: {
    canonical: "https://grammarcheckerai.vercel.app/login",
  },
  openGraph: {
    title: "Login | GrammarCheckerAI",
    description:
      "Login - GrammarCheckerAI for using GrammarCheckerAI and our AI-powered grammar checking services.",
    url: "https://grammarcheckerai.vercel.app/login",
    siteName: "GrammarCheckerAI",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Login = () => {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Login