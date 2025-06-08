import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import { outfit } from "@/constants/app";

const PrivacyPolicy = () => (
  <LandingWrapper>
    <div
      className={`${outfit.className} flex justify-center items-start min-h-[60vh] py-16 px-2`}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <p className="mb-6 text-lg text-gray-700">
          At Candivet, we respect your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard your data.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Personal Information: Name, email, contact details, resumes, cover
            letters, billing details.
          </li>
          <li>Usage Data: Tool activity, login history, and preferences.</li>
          <li>Cookies and Tracking: For analytics and personalization.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          2. How We Use Your Data
        </h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>To provide and improve platform features</li>
          <li>To match candidates and recruiters efficiently</li>
          <li>To offer support, billing, and communication</li>
          <li>To personalize content and recommendations</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Data Sharing</h2>
        <p className="mb-2 text-gray-700">
          We do not sell your data. We may share it with:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>
            Service providers (e.g., payment processors, hosting services)
          </li>
          <li>Employers or candidates, based on your activity</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Your Rights</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Access, correct, or delete your personal data</li>
          <li>Opt out of communications</li>
          <li>Manage cookie preferences</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Data Security</h2>
        <p className="mb-6 text-gray-700">
          We use industry-standard encryption and security protocols to protect
          your data.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          6. International Users
        </h2>
        <p className="mb-6 text-gray-700">
          Your data may be transferred to and stored in countries outside your
          own. We ensure adequate protection of such data.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          7. Children's Privacy
        </h2>
        <p className="mb-2 text-gray-700">
          Candivet is not intended for users under the age of 16. For any
          concerns or data requests, contact us at{" "}
          <a
            href="mailto:privacy@candivet.com"
            className="text-primary underline"
          >
            privacy@candivet.com
          </a>
          .
        </p>
      </div>
    </div>
  </LandingWrapper>
);

export default PrivacyPolicy;
