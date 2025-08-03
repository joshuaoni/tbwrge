import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import SEO from "@/components/seo";
import { outfit } from "@/constants/app";

const Disclaimer = () => (
  <>
    <SEO
      title="Disclaimer - Candivet"
      description="Learn about the disclaimer of Candivet. We make no guarantees about the accuracy, completeness, or suitability of any content, recommendations, or tools available on the Platform."
      canonical="https://candivet.com/disclaimer"
      ogType="website"
    />
    <LandingWrapper>
      <div
        className={`${outfit.className} flex justify-center items-start min-h-[60vh] py-16 px-2`}
      >
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Disclaimer</h1>
          <p className="mb-6 text-lg text-gray-700">
            The information and services provided on Candivet (the "Platform")
            are for general informational and hiring assistance purposes only.
            While we use advanced AI and automation to optimize hiring and job
            search processes, we make no guarantees about the accuracy,
            completeness, or suitability of any content, recommendations, or
            tools available on the Platform.
          </p>
          <p className="mb-6 text-gray-700">
            Candivet does not assume responsibility for the hiring decisions
            made by employers, nor for job offers or outcomes received by
            candidates. Users are responsible for verifying the accuracy of job
            listings, credentials, and candidate information before taking
            action.
          </p>
          <p className="mb-2 text-gray-700">
            Use of the Platform is at your own risk. We disclaim liability for
            any loss or damage resulting from reliance on information or
            services on the Platform.
          </p>
        </div>
      </div>
    </LandingWrapper>
  </>
);

export default Disclaimer;
