"use client";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-10">
          Last Updated: July 23, 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Introduction
            </h2>
            <p className="leading-7">
              Welcome to <strong>GrammarCheckerAI</strong>. Your privacy is
              important to us. This Privacy Policy explains how we collect,
              use, and protect your information when you use our website and
              AI-powered grammar checking services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address (if you create an account).</li>
              <li>Text that you submit for grammar correction.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide grammar checking and AI writing assistance.</li>
              <li>Improve the accuracy and performance of our services.</li>
              <li>Authenticate your account.</li>
              <li>Respond to customer support requests.</li>
              <li>Prevent spam, abuse, and fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. AI Processing
            </h2>
            <p className="leading-7">
              The text you submit may be processed by AI models to generate
              grammar corrections, writing suggestions, and explanations. We do
              not claim ownership of your content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Data Security
            </h2>
            <p className="leading-7">
              We use reasonable technical and organizational measures to protect
              your information. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. Data Sharing
            </h2>
            <p className="leading-7">
              We do not sell your personal information. We may share limited
              information with trusted third-party service providers that help
              operate our website, such as authentication, analytics, cloud
              hosting, and AI service providers.
            </p>
          </section>


          <section>
            <h2 className="text-2xl font-semibold mb-3">
              10. Changes to This Policy
            </h2>
            <p className="leading-7">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              11. Contact Us
            </h2>
            <p className="leading-7">
              If you have any questions regarding this Privacy Policy, please
              contact us at:
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <p>
                <strong>GrammarCheckerAI</strong>
              </p>
              <p>Email: grammarcheckerai46@gmail.com</p>
              <p>Website: https://grammarcheckerai.vercel.app</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}