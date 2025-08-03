import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import { outfit } from "@/constants/app";
import SEO from "@/components/seo";

const CookiePolicy = () => (
  <>
    <SEO
      title="Cookie Policy - Candivet"
      description="Learn about how Candivet uses cookies to improve your experience and provide personalized services on our platform."
      canonical="https://candivet.com/cookie-policy"
      ogType="website"
    />
    <LandingWrapper>
      <div
        className={`${outfit.className} flex justify-center items-start min-h-[60vh] py-16 px-2`}
      >
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
          <p className="mb-6 text-lg text-gray-700">
            Candivet uses cookies to provide a better experience and help us
            understand how users interact with our tools.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-3">
            1. What Are Cookies?
          </h2>
          <p className="mb-6 text-gray-700">
            Cookies are small text files stored on your device when you visit
            our site.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-3">
            2. Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>
              Essential Cookies: Necessary for basic platform functionality.
            </li>
            <li>
              Performance Cookies: Help us analyze site usage (e.g., Google
              Analytics).
            </li>
            <li>
              Functionality Cookies: Remember your settings and preferences.
            </li>
            <li>
              Advertising Cookies: Used to show you relevant ads and job
              recommendations (only with your consent).
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-3">
            3. Managing Cookies
          </h2>
          <p className="mb-6 text-gray-700">
            You can manage or disable cookies in your browser settings.
            Disabling essential cookies may affect the platform's functionality.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-3">
            4. Third-Party Cookies
          </h2>
          <p className="mb-2 text-gray-700">
            We may allow third parties to place cookies on our platform for
            analytics. By using Candivet, you consent to our use of cookies as
            described.
          </p>
        </div>
      </div>
    </LandingWrapper>
  </>
);

export default CookiePolicy;
