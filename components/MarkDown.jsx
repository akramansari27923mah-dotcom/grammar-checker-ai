import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function ChatMarkdown({ content }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="prose prose-invert max-w-none wrap-break-word">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{

          li({ children }) {
            return <li className="ml-4 list-disc">{children}</li>;
          },
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
          ),

          p: ({ children }) => (
            <p className="leading-8 mb-3 text-green-500 text-sm dark:text-white">
              {children}
            </p>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
              {children}
            </blockquote>
          ),

          ul: ({ children }) => (
            <ul className="list-disc ml-6 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-6 space-y-2">{children}</ol>
          ),

          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              const code = String(children).replace(/\n$/, "");

              return (
                <div className="relative my-3">
                  {/* header */}
                  <div className="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs text-gray-300 rounded-t-md">
                    <span>{match[1]}</span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      {copied ? "Copied" : <Copy size={14} />}
                    </button>
                  </div>

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
