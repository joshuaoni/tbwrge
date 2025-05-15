import BlogPosts from "../blog-posts";
import AboutUs from "./components/about-us";
import Community from "./components/community";
import Expertise from "./components/expertise";
import JobOpportunities from "./components/job-opportunities";
import LandingHeroSection from "./components/landing-hero";
import Partners from "./components/partners";
import PricingPlans from "./components/pricing-plans";
import RightCandidate from "./components/right-candidate";
import Tools from "./components/tools";
import LandingWrapper from "./components/wrapper/landing-wrapper";

const HomePage = () => {
  return (
    <LandingWrapper>
      <LandingHeroSection />
      {/* <Partners /> */}
      <AboutUs />
      <JobOpportunities />
      <Tools />
      <RightCandidate />
      <PricingPlans />
      <BlogPosts />
      <Expertise />
      <Community />
    </LandingWrapper>
  );
};

export default HomePage;
