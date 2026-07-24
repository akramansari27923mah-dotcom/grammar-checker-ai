import TermsAndConditions from '@/components/Terms'
import React from 'react'

export const metadata = {
  title: "Terms & Conditions | GrammarCheckerAI",
  description:
    "Read the Terms & Conditions for GrammarCheckerAI. Understand the rules, responsibilities, acceptable use, and legal terms that apply when using our AI-powered grammar checker and writing assistant.",
  keywords: [
    "Terms and Conditions",
    "Terms of Service",
    "GrammarCheckerAI",
    "AI Grammar Checker",
    "AI Writing Assistant",
    "User Agreement",
    "Website Terms",
    "Legal",
    "Acceptable Use",
  ],
  alternates: {
    canonical: "https://grammarcheckerai.vercel.app/terms",
  },
  openGraph: {
    title: "Terms & Conditions | GrammarCheckerAI",
    description:
      "Read the Terms & Conditions for using GrammarCheckerAI and our AI-powered grammar checking services.",
    url: "https://grammarcheckerai.vercel.app/terms",
    siteName: "GrammarCheckerAI",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Terms = () => {
  return (
    <div>
        <TermsAndConditions />
    </div>
  )
}

export default Terms