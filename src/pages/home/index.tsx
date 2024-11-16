import BlogPosts from "../blog-posts";
import Community from "./community";
import AboutUs from "./components/about-us";
import Expertise from "./components/expertise";
import LandingHeroSection from "./components/landing-hero";
import LandingWrapper from "./components/wrapper/landing-wrapper";
import { Partners } from "./components/partners";
import PricingPlans from "./components/pricing-plans";
import RightCandidate from "./components/right-candidate";
import Tools from "./components/tools";

const index = () => {
  return (
    <LandingWrapper>
      <LandingHeroSection />
      <Partners />
      <AboutUs />
      <Tools />
      <RightCandidate />
      <PricingPlans />
      <BlogPosts />
      <Expertise />
      <Community />
    </LandingWrapper>
  );
};

export default index;
