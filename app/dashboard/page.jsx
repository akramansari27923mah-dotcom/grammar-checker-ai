import Dashboard from '@/dashboardComponents/Dashboard'
import React from 'react'

export const metadata = {
  title: "Dashboard | Grammar AI",
  description:
    "Track grammar corrections, view writing statistics, manage saved content, and improve your English with AI-powered insights.",

  keywords: [
    "grammar checker",
    "grammar ai",
    "writing assistant",
    "english correction",
    "dashboard",
    "ai grammar tool",
  ],

  openGraph: {
    title: "Dashboard | Grammar AI",
    description:
      "Manage your writing, corrections, and productivity from your Grammar AI dashboard.",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const DashboardLayout = () => {
  return (
    <div>
        <Dashboard />
    </div>
  )
}

export default DashboardLayout