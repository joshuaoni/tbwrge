"use client";
import { useUserStore } from "@/hooks/use-user-store";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import candivetlogo from "../../../public/images/candivet-logo.png";
import DashboardHeader from "../dashboard-header";
import CreateJobFlow from "../job";
import LeftSideBar from "../left-side-bar";
import WelcomeModal from "../welcome-modal";
import { updateProfile } from "@/actions/update-profile";
import { getPremium } from "@/actions/premium";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const modalDismissedRef = useRef(false);
  const trialStateUpdatedRef = useRef(false);

  // Check for free trial when dashboard loads
  const { data: premiumResponse } = useQuery({
    queryKey: ["premium", "freetrial", userData?.user?.seen_freetrial_popup],
    queryFn: () => getPremium(userData?.token || "", true),
    enabled:
      !!userData?.token &&
      !userData?.user?.seen_freetrial_popup &&
      !modalDismissedRef.current,
  });

  useEffect(() => {
    if (!isLoading) {
      if (userData === null) {
        router.push("/sign-in");
      }
    }
  }, [userData, isLoading, router]);

  // Check if welcome modal should be shown
  useEffect(() => {
    if (!isLoading && userData?.user && !modalDismissedRef.current) {
      // Show welcome modal if user hasn't seen the popup yet, regardless of response
      if (!userData.user.seen_freetrial_popup) {
        setShowWelcomeModal(true);
      }
    }
  }, [userData, isLoading]);

  // Ensure trial fields are properly set in user state when component loads
  useEffect(() => {
    if (!isLoading && userData?.user && !trialStateUpdatedRef.current) {
      // Check if user should be on free trial (either already is or just got one)
      const shouldBeOnTrial =
        userData.user.on_freetrial ||
        premiumResponse ===
          "You have been granted a free trial of the premium plan for 14 days.";

      if (shouldBeOnTrial) {
        console.log("Setting trial fields in user state:", {
          current_on_freetrial: userData.user.on_freetrial,
          current_plan_expires: userData.user.plan_expires,
          premiumResponse: premiumResponse,
          shouldBeOnTrial: shouldBeOnTrial,
        });

        // Set trial fields regardless of current state
        updateUser({
          on_freetrial: true,
          plan_expires:
            userData.user.plan_expires ||
            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          plan: "premium",
        });
        trialStateUpdatedRef.current = true;
      }
    }
  }, [userData, isLoading, premiumResponse]);

  const handleModalClose = async () => {
    setShowWelcomeModal(false);
    modalDismissedRef.current = true; // Prevent modal from showing again

    if (userData?.token && userData?.user) {
      try {
        await updateProfile({
          token: userData.token,
          seen_freetrial_popup: true,
        });

        // Always set trial fields when modal is closed (since modal only shows for trial users)
        updateUser({
          seen_freetrial_popup: true,
          on_freetrial: true,
          plan_expires:
            userData.user.plan_expires ||
            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          plan: "premium",
        });

        // Invalidate the premium query to prevent it from running again
        queryClient.invalidateQueries({ queryKey: ["premium", "freetrial"] });
      } catch (error) {
        console.error("Failed to mark popup as seen:", error);
      }
    }
  };

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
        onClose={handleModalClose}
        onStartExploring={handleModalClose}
        onLearnMore={async () => {
          await handleModalClose();
          router.push("/dashboard/billing?screen=choose");
        }}
      />
    </div>
  );
};

export default Dashboard;
