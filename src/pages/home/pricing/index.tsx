import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import { Partners } from "../components/partners";
import PricingPlans from "../components/pricing-plans";
import Community from "../components/community";

const index = () => {
  return (
    <LandingWrapper>
      <main className="mt-[100px]">
        <Partners />

        <section className="flex items-center justify-center flex-col">
          <PricingPlans />
        </section>
        
        <Community />
      </main>
    </LandingWrapper>
  );
};

export default index;
