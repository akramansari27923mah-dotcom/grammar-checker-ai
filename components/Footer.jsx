import { api } from "@/lib/axios";
import { errorShow, successShow } from "@/lib/toast";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaMailBulk } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const subscribe = async () => {
    try {
      if (!email.trim()) return;
      setLoader(true);
      setEmail('')
      const stayUpdate = email;
      const { data } = await api.post("/stayUpdate", {stayUpdate});
      if (data?.success) {
        successShow("Subscribed Successfully");
      }
    } catch (err) {
      console.log(err);
      if(err.response.status === 400){
        errorShow('Email already exist')
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">GrammerAI</h1>

            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Improve your writing with our AI-powered grammar checker. Write
              confidently, fix mistakes instantly, and communicate better.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <Link
                target="_blank"
                href="https://github.com/akramansari27923mah-dotcom/grammar-checker-ai"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="/"
                className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </Link>

              <Link
                href="/"
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/grammar-checker"
                  className="hover:text-white transition"
                >
                  Grammar Checker
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-5">Resources</h2>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg mb-5">
              Stay Updated
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest updates and features.
            </p>

            <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                className="w-full bg-transparent px-4 py-3 outline-none text-sm"
              />

              <button
                onClick={subscribe}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 transition"
              >
                {loader ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <FaMailBulk size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 text-sm text-gray-500">
          <p>© 2026 GrammerAI. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-white transition">
              Privacy
            </Link>

            <Link href="/" className="hover:text-white transition">
              Terms
            </Link>

            <Link href="/" className="hover:text-white transition">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
