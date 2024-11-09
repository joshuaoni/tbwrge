import React from "react";
import DashboardHeader from "../dashboard-header";
import LeftSideBar from "../left-side-bar";

const Dashboard = ({ children }: { children: any }) => {
  return (
    <div className="">
      <DashboardHeader />
      <LeftSideBar />
      <div className=" ml-[310px] bg-white h-screen p-4 pt-24">{children}</div>
    </div>
  );
};

export default Dashboard;
