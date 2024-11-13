import React, { ReactNode } from "react";
import LandingHeader from "../landing-header";
import LandingFooter from "../landing-footer";

const LandingWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen ">
      <LandingHeader />
      <main className="flex-grow">{children}</main>
      <LandingFooter />
    </div>
  );
};

export default LandingWrapper;
