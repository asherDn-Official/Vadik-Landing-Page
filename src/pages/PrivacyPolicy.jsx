import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 fade-in">
      {/* Centered heading and date */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Vadik AI – Privacy Policy</h1>
        <p className="mb-6 text-sm text-gray-600">Last Updated: June 5, 2025</p>
      </div>

      {/* Left-aligned policy content */}
      <div className="text-left text-sm leading-6 text-gray-800 space-y-4">
        <p>
          This Privacy Policy explains how Vadik AI ("we," "us," or "our")
          collects, uses, discloses, and protects your personal information when
          you use our website (https://www.vadik.ai), mobile applications, and
          related services (collectively, the "Services").
        </p>

        <p>
          By accessing or using our Services, you consent to the practices
          described in this policy. If you do not agree, please do not use our
          Services.
        </p>

        <h2 className="font-semibold text-lg mt-6">
          1. Information We Collect
        </h2>

        <p>
          <strong>A. Personal Information You Provide</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Contact Information: Name, email, phone number, address</li>
          <li>Account Credentials: Username, password, security questions</li>
          <li>
            Payment Information: Credit/debit card details (processed via secure
            third-party gateways like Stripe or PayPal)
          </li>
          <li>Communications: Emails, chat logs, support tickets</li>
        </ul>

        <p>
          <strong>B. Automatically Collected Data</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Device & Usage Data: IP address, browser type, operating system,
            pages visited
          </li>
          <li>
            Cookies & Tracking Technologies: For analytics and personalization
          </li>
          <li>Log Files: Time stamps, clickstream data, referring pages</li>
        </ul>

        <p>
          <strong>C. Data from Third Parties</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Social Media Platforms (e.g., login via Google or Facebook)</li>
          <li>Analytics Providers (e.g., Google Analytics, Hotjar)</li>
          <li>Business Partners (e.g., affiliates, advertisers)</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Service Delivery: Account creation, login, subscription management
          </li>
          <li>
            Product Improvement: Analyze trends and improve AI model performance
          </li>
          <li>Marketing: Newsletters, promotions (you may opt out anytime)</li>
          <li>
            Security & Compliance: Prevent fraud and meet legal obligations
          </li>
          <li>Customer Support: Assist with queries and troubleshooting</li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">
          3. Legal Basis for Processing (GDPR/UK Users)
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>Consent – For marketing communications and cookie tracking</li>
          <li>Contractual Necessity – To provide the requested services</li>
          <li>Legal Obligation – To meet regulatory requirements</li>
          <li>
            Legitimate Interest – To improve our service and ensure safety
          </li>
        </ul>

        <h2 className="font-semibold text-lg mt-6">
          4. Sharing Your Information
        </h2>
        <p>We may share your data with:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Service Providers (hosting, analytics, payment processors)</li>
          <li>Legal Authorities (if required under law or regulation)</li>
          <li>
            Business Transfers (if we’re involved in a merger or acquisition)
          </li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>

        <h2 className="font-semibold text-lg mt-6">
          5. Cookies & Tracking Technologies
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>Essential Cookies – Required for core functionality</li>
          <li>
            Analytics Cookies – To track performance and usage (e.g., Google
            Analytics)
          </li>
          <li>Advertising Cookies – For retargeting and conversion tracking</li>
        </ul>
        <p>
          You can manage cookie preferences via your browser settings or through
          our cookie consent banner.
        </p>

        <h2 className="font-semibold text-lg mt-6">
          6. Data Retention & Deletion
        </h2>
        <p>
          We retain personal data only as long as necessary to:
          <ul className="list-disc list-inside ml-4">
            <li>Provide our services</li>
            <li>Comply with legal or financial obligations</li>
            <li>Enforce our terms</li>
          </ul>
          You may request data deletion by emailing{" "}
          <a href="mailto:support@vadik.ai" className="text-blue-600 underline">
            support@vadik.ai
          </a>
          .
        </p>

        <h2 className="font-semibold text-lg mt-6">7. Security Measures</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Encryption (SSL/TLS) for data in transit</li>
          <li>Secure servers and access controls</li>
          <li>Routine vulnerability assessments</li>
        </ul>
        <p>
          While we follow industry best practices, no system is 100% secure.
          Always use strong passwords and notify us of suspicious activity.
        </p>

        <h2 className="font-semibold text-lg mt-6">8. Your Privacy Rights</h2>
        <ul className="list-disc list-inside ml-4">
          <li>✅ Access, update, or delete your personal data</li>
          <li>✅ Opt out of marketing communications</li>
          <li>✅ Withdraw consent at any time</li>
          <li>✅ File a complaint with a regulatory authority</li>
        </ul>
        <p>
          To exercise these rights, contact{" "}
          <a href="mailto:support@vadik.ai" className="text-blue-600 underline">
            support@vadik.ai
          </a>
          .
        </p>

        <h2 className="font-semibold text-lg mt-6">
          9. International Data Transfers
        </h2>
        <p>
          We may process your data outside your country (e.g., in the U.S. or
          EU). Where required, we implement safeguards such as Standard
          Contractual Clauses (SCCs) or equivalent legal mechanisms.
        </p>

        <h2 className="font-semibold text-lg mt-6">10. Children’s Privacy</h2>
        <p>
          Our Services are not intended for users under 16 (or 18 where
          applicable). If we learn we’ve collected data from a minor without
          consent, we will delete it. Parents may contact us at{" "}
          <a href="mailto:support@vadik.ai" className="text-blue-600 underline">
            support@vadik.ai
          </a>
          .
        </p>

        <h2 className="font-semibold text-lg mt-6">
          11. Updates to This Policy
        </h2>
        <p>
          We may revise this policy from time to time. Updates will be posted on
          this page with the new "Last Updated" date. Significant changes may be
          communicated via email or banner notifications.
        </p>

        <h2 className="font-semibold text-lg mt-6">12. Contact Us</h2>
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

export default PrivacyPolicy;
