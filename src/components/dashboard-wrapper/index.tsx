import LeftSideBar from "@/components/left-side-bar";
import React from "react";
import DashboardHeader from "../dashboard-header";

const Dashboard = ({ children }: any) => {
  return (
    <div className="">
      <DashboardHeader />
      <LeftSideBar />
      <div className=" ml-[310px] bg-white h-screen p-4 pt-24">{children}</div>
    </div>
  );
};

export default Dashboard;
