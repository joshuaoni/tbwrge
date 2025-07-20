"use client";
import { useUserStore } from "@/hooks/use-user-store";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import candivetlogo from "../../../public/images/candivet-logo.png";
import DashboardHeader from "../dashboard-header";
import CreateJobFlow from "../job";
import LeftSideBar from "../left-side-bar";
import WelcomeModal from "../welcome-modal";
import { updateProfile } from "@/actions/update-profile";
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
  const { userData, isLoading, updateUser } = useUserStore();
  const [startCreateJobFlow, setStartCreateJobFlow] = React.useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (userData === null) {
        router.push("/sign-in");
      }
    }
  }, [userData, isLoading, router]);

  // Check if welcome modal should be shown
  useEffect(() => {
    if (!isLoading && userData?.user) {
      const user = userData.user;
      if (user.on_freetrial && !user.seen_freetrial_popup) {
        setShowWelcomeModal(true);
      }
    }
  }, [userData, isLoading]);

  return (
    <div className="flex w-full max-w-[1800px] mx-auto">
      <SidebarProvider className="">
        <Sidebar className={`${outfit.className} bg-[#F5F5F5] z-30`}>
          <SidebarHeader className="bg-[#F5F5F5] ">
            <div
              onClick={() => {
                router.push("/dashboard");
              }}
              className="flex ml-8 mt-4 items-center cursor-pointer"
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
        <div className="flex-1 flex flex-col">
          <DashboardHeader
            searchTerm={searchTerm || ""}
            setSearchTerm={setSearchTerm || (() => {})}
          />
          {!startCreateJobFlow ? (
            <main className="bg-white px-[70px] pr-[30px] flex-1 p-4 pt-8 overflow-x-hidden">
              {/* <SidebarTrigger /> */}
              {children}
            </main>
          ) : (
            <CreateJobFlow setStartCreateJobFlow={setStartCreateJobFlow} />
          )}
        </div>
      </SidebarProvider>

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={async () => {
          setShowWelcomeModal(false);
          if (userData?.token) {
            try {
              await updateProfile({
                token: userData.token,
                seen_freetrial_popup: true,
              });
              // Update user state to reflect the change
              updateUser({ seen_freetrial_popup: true });
            } catch (error) {
              console.error("Failed to mark popup as seen:", error);
            }
          }
        }}
        onStartExploring={async () => {
          setShowWelcomeModal(false);
          if (userData?.token) {
            try {
              await updateProfile({
                token: userData.token,
                seen_freetrial_popup: true,
              });
              // Update user state to reflect the change
              updateUser({ seen_freetrial_popup: true });
            } catch (error) {
              console.error("Failed to mark popup as seen:", error);
            }
          }
          // You can add navigation logic here if needed
        }}
        onLearnMore={async () => {
          setShowWelcomeModal(false);
          if (userData?.token) {
            try {
              await updateProfile({
                token: userData.token,
                seen_freetrial_popup: true,
              });
              // Update user state to reflect the change
              updateUser({ seen_freetrial_popup: true });
            } catch (error) {
              console.error("Failed to mark popup as seen:", error);
            }
          }
          router.push("/pricing");
        }}
      />
    </div>
  );
};

export default Dashboard;
