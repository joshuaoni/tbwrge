import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import { outfit } from "@/constants/app";

const TermsOfService = () => (
  <LandingWrapper>
    <div
      className={`${outfit.className} flex justify-center items-start min-h-[60vh] py-16 px-2`}
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms of Service
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          By using Candivet, you agree to the following Terms of Service
          ("Terms"). If you do not agree, do not use the platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Eligibility</h2>
        <p className="mb-6 text-gray-700">
          You must be at least 16 years old to use Candivet.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          2. Account Registration
        </h2>
        <p className="mb-6 text-gray-700">
          You are responsible for maintaining the security of your account and
          for any activity occurring under your credentials.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          3. Use of the Platform
        </h2>
        <p className="mb-2 text-gray-700">
          You agree to use Candivet only for lawful purposes:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Recruiters may post jobs and vet candidates.</li>
          <li>Job seekers may apply for jobs and use AI tools.</li>
        </ul>
        <p className="mb-6 text-gray-700">
          You agree not to misuse, scrape, or reverse-engineer the platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          4. Subscriptions and Payments
        </h2>
        <p className="mb-6 text-gray-700">
          Fees are outlined in our Pricing section. Paid plans renew
          automatically unless canceled. You may cancel at any time via your
          account settings.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          5. Content and Ownership
        </h2>
        <p className="mb-6 text-gray-700">
          You retain ownership of your content (e.g., resumes, job posts), but
          you grant Candivet a non-exclusive license to use it for the purpose
          of delivering our services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Termination</h2>
        <p className="mb-6 text-gray-700">
          We may suspend or terminate your access for violating these Terms.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">
          7. Limitation of Liability
        </h2>
        <p className="mb-6 text-gray-700">
          Candivet is provided "as is." We are not liable for indirect,
          incidental, or consequential damages arising from the use of the
          platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-3">8. Governing Law</h2>
        <p className="mb-2 text-gray-700">
          These Terms are governed by the laws of the jurisdiction in which MIXT
          Technologies operates. Contact us at{" "}
          <a
            href="mailto:support@candivet.com"
            className="text-primary underline"
          >
            support@candivet.com
          </a>{" "}
          with any questions.
        </p>
      </div>
    </div>
  </LandingWrapper>
);

export default TermsOfService;
