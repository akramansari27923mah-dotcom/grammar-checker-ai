import PrivacyPolicy from '@/components/Pricacy'
import React from 'react'

export const metadata = {
  title: "Privacy Policy | GrammarCheckerAI",
  description:
    "Read the Privacy Policy for GrammarCheckerAI. Learn how we collect, use, store, and protect your personal information and submitted content while using our AI-powered grammar checker.",
  keywords: [
    "Privacy Policy",
    "GrammarCheckerAI",
    "AI Grammar Checker",
    "Data Privacy",
    "User Privacy",
    "Security",
    "Cookies",
    "Personal Information",
    "AI Writing Assistant",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const Privacy = () => {
  return (
    <div>
        <PrivacyPolicy />
    </div>
  )
}

export default Privacy