import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import AboutUs from "@/components/home/about-us";
import LandingWrapper from "@/components/home/wrapper/landing-wrapper";
import LandingHeroSection from "@/components/home/landing-hero";
import JobOpportunities from "@/components/home/job-opportunities";
import Tools from "@/components/home/tools";
import TopTalents from "@/components/home/top-talents";
import HomePageStats from "@/components/home/stats";
import PricingPlans from "@/components/home/pricing-plans";
import Blogs from "@/components/home/blogs";
import RightCandidate from "@/components/home/right-candidate";
import Expertise from "@/components/home/expertise";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Candivet - Your AI-Powered Hiring Platform</title>
        <meta
          name="description"
          content="Welcome to Candivet - The #1 global AI-powered platform for recruiters and job seekers. Start your journey to smarter hiring and job seeking today."
        />
      </Head>
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
    </>
  );
}
