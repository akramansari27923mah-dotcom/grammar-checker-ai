import History from "@/dashboardComponents/History";

export const metadata = {
  title: "History | Grammar AI",

  description:
    "Review your previous grammar analyses, writing corrections, and saved results to track your progress over time.",

  keywords: [
    "grammar history",
    "writing history",
    "grammar corrections",
    "english writing",
    "Grammar AI",
    "AI writing assistant",
  ],

  openGraph: {
    title: "History | Grammar AI",
    description:
      "Review and manage your previous grammar checks and writing improvements.",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryPage() {
  return (
    <div>
      <History />
    </div>
  );
}
