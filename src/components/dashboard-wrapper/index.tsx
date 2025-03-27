"use client";
import { useUserStore } from "@/hooks/use-user-store";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import candivetlogo from "../../../public/images/candivet-logo.png";
import DashboardHeader from "../dashboard-header";
import CreateJobFlow from "../job";
import LeftSideBar from "../left-side-bar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { outfit } from "@/constants/app";

interface DashboardProps {
  children: React.ReactNode;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

const Dashboard = ({ children, searchTerm, setSearchTerm }: DashboardProps) => {
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
    <div className="flex">
      <DashboardHeader
        searchTerm={searchTerm || ""}
        setSearchTerm={setSearchTerm || (() => {})}
      />
      <SidebarProvider className="">
        <Sidebar className={`${outfit.className} bg-[#F5F5F5] z-30`}>
          <SidebarHeader className="bg-[#F5F5F5] ">
            <div
              onClick={() => {
                router.push("/dashboard");
              }}
              className="flex ml-8 items-center cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-[6.96px] bg-[#065844] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
                <Image
                  src="/header-final.png"
                  alt=""
                  width={32}
                  height={29.2}
                  className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
                />
              </div>
              <h1
                className={`${outfit.className} ml-2 text-black text-xl md:text-3xl font-bold`}
              >
                Candivet
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <LeftSideBar />
          </SidebarContent>
        </Sidebar>
        {!startCreateJobFlow ? (
          <main className="bg-white px-[70px] pr-[30px] flex-1 p-4 pt-24 overflow-x-hidden">
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
