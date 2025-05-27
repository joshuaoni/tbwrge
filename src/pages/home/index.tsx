import BlogPosts from "../blog-posts";
import AboutUs from "./components/about-us";
import Community from "./components/community";
import Expertise from "./components/expertise";
import JobOpportunities from "./components/job-opportunities";
import LandingHeroSection from "./components/landing-hero";
import Partners from "./components/partners";
import PricingPlans from "./components/pricing-plans";
import RightCandidate from "./components/right-candidate";
import HomePageStats from "./components/stats";
import Tools from "./components/tools";
import TopTalents from "./components/top-talents";
import LandingWrapper from "./components/wrapper/landing-wrapper";
import Blogs from "./components/blogs";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true },
};

const HomePage = () => {
  return (
    <LandingWrapper>
      <LandingHeroSection />
      {/* <Partners /> */}
      <motion.div {...fadeInUp}>
        <AboutUs />
      </motion.div>
      <motion.div {...fadeInUp}>
        <JobOpportunities />
      </motion.div>
      <motion.div {...fadeInUp}>
        <TopTalents />
      </motion.div>
      <motion.div {...fadeInUp}>
        <HomePageStats />
      </motion.div>
      <motion.div {...fadeInUp}>
        <Tools />
      </motion.div>
      <motion.div {...fadeInUp}>
        <RightCandidate />
      </motion.div>
      <motion.div {...fadeInUp}>
        <PricingPlans />
      </motion.div>
      <Blogs />
      <motion.div {...fadeInUp}>
        <Expertise />
      </motion.div>
    </LandingWrapper>
  );
};

export default HomePage;
