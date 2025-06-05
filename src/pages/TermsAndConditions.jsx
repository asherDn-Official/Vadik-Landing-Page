import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 fade-in">
      {/* Centered Heading and Last Updated */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Vadik AI – Terms and Conditions
        </h1>
        <p className="mb-6 text-sm text-gray-600">Last Updated: June 5, 2025</p>
      </div>

      {/* Left-aligned Content */}
      <div className="text-left text-sm leading-6 text-gray-800 space-y-4">
        <p>
          By using Vadik AI (https://www.vadik.ai), you agree to these Terms of
          Service.
        </p>

        <h2 className="font-semibold text-lg mt-6">1. Acceptance of Terms</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            You are at least 18 years old (or legal age in your jurisdiction)
          </li>
          <li>You agree to these Terms and our Privacy Policy</li>
          <li>Violations may lead to suspension or termination of access</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">2. Account Registration</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            You agree to provide accurate, complete information during sign-up
          </li>
          <li>
            You are responsible for maintaining the security of your credentials
          </li>
          <li>
            Notify us immediately at{" "}
            <a
              href="mailto:support@vadik.ai"
              className="text-blue-600 underline"
            >
              support@vadik.ai
            </a>{" "}
            of any unauthorized access
          </li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">3. User Responsibilities</h2>
        <ul className="list-disc list-inside ml-4">
          <li>❌ Use Vadik AI for illegal or fraudulent purposes</li>
          <li>❌ Attempt to hack, reverse-engineer, or disrupt our systems</li>
          <li>❌ Provide false or misleading information</li>
          <li>❌ Harass, spam, or abuse other users</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">4. Intellectual Property</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            All content, code, and AI models are the exclusive property of Vadik
            AI
          </li>
          <li>You may not copy, reproduce, or distribute content</li>
          <li>No scraping bots or automation without permission</li>
          <li>You may not claim ownership over AI-generated outputs</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">5. Payments & Refunds</h2>
        <ul className="list-disc list-inside ml-4">
          <li>All subscription fees are billed monthly or annually</li>
          <li>No refunds are issued unless required by law</li>
          <li>Refund requests must be made within 7 days of purchase</li>
          <li>Unauthorized chargebacks may result in account suspension</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">6. AI Disclaimer</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Our AI-generated content is for informational or educational use
            only
          </li>
          <li>Not a substitute for legal, medical, or professional advice</li>
          <li>Used at your own discretion and responsibility</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">
          7. Limitation of Liability
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>Vadik AI is not liable for downtime or data loss</li>
          <li>
            No responsibility for indirect damages like loss of revenue or
            productivity
          </li>
          <li>Not liable for third-party tools, plugins, or partners</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">8. Termination</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            We may suspend or terminate your account if you violate these Terms
          </li>
          <li>
            Termination may occur at our sole discretion or as required by law
          </li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">
          9. Governing Law & Dispute Resolution
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>These Terms are governed by the laws of India</li>
          <li>
            Disputes will be resolved via binding arbitration in Bangalore
          </li>
          <li>No class action lawsuits are permitted under this agreement</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">10. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Updates will be reflected on
          this page. Continued use of the Services means you accept the updated
          Terms.
        </p>

        <h2 className="font-semibold text-lg mt-6">11. Contact Us</h2>
        <p>
          📧 Email:{" "}
          <a href="mailto:support@vadik.ai" className="text-blue-600 underline">
            support@vadik.ai
          </a>
          <br />
          🏢 Address: Vadik AI Technologies,Chennai, India
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
