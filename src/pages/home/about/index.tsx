import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../community";

const index = () => {
  return (
    <LandingWrapper>
      <main className="h-screen bg-red-400"></main>
      <Community />
    </LandingWrapper>
  );
};

export default index;
