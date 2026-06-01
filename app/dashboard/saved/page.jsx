import Saved from '@/dashboardComponents/Saved'
import React from 'react'

export const metadata = {
  title: "Saved Corrections | Grammar AI",

  description:
    "Store, review, and manage your saved grammar corrections, writing revisions, and AI-enhanced content.",

  keywords: [
    "saved corrections",
    "grammar checker",
    "writing assistant",
    "grammar ai",
    "saved edits",
    "writing improvements",
  ],

  openGraph: {
    title: "Saved Corrections | Grammar AI",
    description:
      "Manage your saved grammar corrections and writing improvements.",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const SavedCorrectionPage = () => {
  return (
    <div>
        <Saved />
    </div>
  )
}

export default SavedCorrectionPage