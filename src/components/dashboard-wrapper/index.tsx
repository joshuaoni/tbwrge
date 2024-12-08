"use client";
import React, { useEffect } from "react";
import DashboardHeader from "../dashboard-header";
import LeftSideBar from "../left-side-bar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import Image from "next/image";
import candivetlogo from "../../../public/images/candivet-logo.png";
import { useRouter } from "next/router";
import { useUserStore } from "@/hooks/use-user-store";
import CreateJobFlow from "../job";

const Dashboard = ({ children }: { children: any }) => {
  const router = useRouter();
  const { userData, isLoading } = useUserStore();
  const [startCreateJobFlow, setStartCreateJobFlow] = React.useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (userData === null) {
        router.push("/home/sign-in");
      }
    }
  }, [userData, isLoading, router]);
  return (
    <div>
      <DashboardHeader setStartCreateJobFlow={setStartCreateJobFlow} />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="bg-[#e1e1e1]">
            <div
              onClick={() => {
                router.push("/dashboard");
              }}
              className="flex mt-6 items-center ml-6 cursor-pointer"
            >
              <Image src={candivetlogo} alt="" width={50} height={50} />
              <h1 className="text-3xl font-bold">Candivet</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <LeftSideBar />
          </SidebarContent>
        </Sidebar>
        {!startCreateJobFlow ? (
          <main className="bg-white w-screen h-screen p-4 pt-24">
            <SidebarTrigger />
            {children}
          </main>
        ) : (
          <CreateJobFlow setStartCreateJobFlow={setStartCreateJobFlow} />
        )}
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
