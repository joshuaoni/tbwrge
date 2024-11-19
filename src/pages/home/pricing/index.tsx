import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import { Partners } from "../components/partners";
import PricingPlans from "../components/pricing-plans";
import Community from "../components/community";
import Image from "next/image";
import PricingHeaderImage from "../../../../public/images/pricing_header_image.jpeg";

const index = () => {
  return (
    <LandingWrapper>
      <main className="mt-[100px]">
        <section>
          <div className=" flex items-center relative justify-center  h-[400px] w-screen">
            <div className="bg-black opacity-70 w-full h-full absolute" />
            <Image
              src={PricingHeaderImage}
              width={300}
              height={400}
              alt=""
              className="w-full h-full object-cover"
            />
            <h1 className="text-[60px] text-white font-extrabold absolute">
              Pricing
            </h1>
          </div>
        </section>
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
