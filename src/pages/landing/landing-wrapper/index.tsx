import React, { ReactNode } from "react";
import LandingHeader from "../landing-header";
import LandingFooter from "../landing-footer";

const LandingWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LandingHeader />
      {children}
      <LandingFooter />
    </div>
  );
};

export default LandingWrapper;
