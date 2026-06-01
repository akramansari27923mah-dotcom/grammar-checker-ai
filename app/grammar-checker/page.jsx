import Chat from '@/components/Chat'
import Chat2 from '@/components/Chat2'
import React from 'react'

export const metadata = {
  title: "Free AI Grammar Checker | Grammar AI",

  description:
    "Use Grammar AI to instantly fix grammar, spelling, punctuation, and sentence structure errors. Improve your English writing with AI-powered suggestions.",

  keywords: [
    "free grammar checker",
    "AI grammar checker",
    "grammar correction",
    "writing assistant",
    "english grammar",
    "spell checker",
    "punctuation checker",
    "Grammar AI",
  ],

  openGraph: {
    title: "Free AI Grammar Checker | Grammar AI",
    description:
      "Instantly detect and fix grammar mistakes with AI-powered writing assistance.",
    type: "website",
  },
};

const GrammerChecker = () => {
  return (
    <div>
      {/* <Chat /> */}
      <Chat2 />
    </div>
  )
}

export default GrammerChecker