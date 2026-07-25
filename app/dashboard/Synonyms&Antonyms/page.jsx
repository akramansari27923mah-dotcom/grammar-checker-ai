import SynonymsAntonymsPage from '@/dashboardComponents/Synonyms&Antonyms'
import React from 'react'


export const metadata = {
  title: "Synonyms Generator | Find Similar Words Instantly",
  description:
    "Discover synonyms for any word instantly. Improve your vocabulary, writing, essays, emails, and communication with accurate and AI-powered synonym suggestions.",

  keywords: [
    "synonyms",
    "synonym finder",
    "similar words",
    "english vocabulary",
    "word alternatives",
    "writing assistant",
    "grammar checker",
    "AI synonyms",
    "better words",
    "vocabulary builder",
  ],

  openGraph: {
    title: "Synonyms Generator | AI Word Finder",
    description:
      "Find the best synonyms for any English word. Enhance your writing with AI-powered word suggestions.",
    type: "website",
  },

};

const SynonymsAntonyms = () => {
  return (
    <div>
        <SynonymsAntonymsPage />
    </div>
  )
}

export default SynonymsAntonyms