import {
  CircleCheck,
  FilePenLine,
  ListTree,
  Pencil,
  ShieldCheck,
  Sparkles,
  StickyNoteCheck,
  TrendingUp,
  Users,
  House,
  Settings,
  Info,
  Mail,
} from "lucide-react";

export const features = [
  {
    icon: "/feature/correct.png",
    title: "Grammer Correction",
    desc: "Fix grammar mistacks and improve sentence structure.",
  },
  {
    icon: "/feature/check.png",
    title: "Spelling Check",
    desc: "Detect and correct spelling mistacks instantly.",
  },
  {
    icon: "/feature/improve.png",
    title: "Style improvement",
    desc: "Enhance your writing style and tone with AI.",
  },
  {
    icon: "/feature/result.png",
    title: "Instant Results",
    desc: "Get real-time suggestions and corrections.",
  },
];

export const howItWork = [
  {
    icon: FilePenLine,
    title: "Enter Your Text",
    desc: "Type or Paste your text into the editor.",
  },
  {
    icon: Sparkles,
    title: "AI Analyzer",
    desc: "Our AI Analyzer your text and dectects issues.",
  },
  {
    icon: CircleCheck,
    title: "Get Corrections",
    desc: "Review suggestions and improve your writing.",
  },
];

export const reach = [
  {
    icon: Users,
    title: "10k+",
    desc: "Happy Users",
  },
  {
    icon: StickyNoteCheck,
    title: "50k+",
    desc: "Texts Checked",
  },
  {
    icon: Sparkles,
    title: "98%",
    desc: "Accuracy",
  },
  {
    icon: ShieldCheck,
    title: "100%",
    desc: "Secure & Private",
  },
];

export const navItems = [
  {
    name: "Home",
    icon: House,
  },
  {
    name: "Features",
    icon: Sparkles,
  },
  {
    name: "How It Works",
    icon: Settings,
  },
  {
    name: "About",
    icon: Info,
  },
  {
    name: "Contact",
    icon: Mail,
  },
];

export const navItemsForMob = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#hiw" },
  // { name: "About", href: "#about" },
  // { name: "Contact", href: "#contact" },
];
