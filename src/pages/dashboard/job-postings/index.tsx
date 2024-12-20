import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CurrentOpenings from "./current-openings";
import ClosedOpenings from "./closed-openings";
import JobDetails from "./job-details";
import CandidateDetail from "./candidate-detail";

const JobPostings = () => {
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [filterOpenings, setFilterOpenings] = useState("latest");
  const [currentView, setCurrentView] = useState("openings");
  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <DashboardWrapper>
      <div className="flex w-full  justify-between items-center  mb-4">
        {currentView != "details" && currentView != "candidatedetail" && (
          <>
            <div className="flex flex-row items-center space-x-6">
              <h1 className="text-xl font-bold">
                {currentView === "openings"
                  ? "Current Openings"
                  : "Closed Jobs"}
              </h1>
              <Button
                onClick={() => {
                  setCurrentView(
                    currentView === "openings" ? "closed" : "openings"
                  );
                }}
                className="bg-primary text-white"
              >
                {currentView === "openings"
                  ? "Closed Jobs"
                  : "Current Openings"}
              </Button>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="h-12  px-3 w-fit rounded-full text-[#898989] bg-[#e1e1e1] flex items-center">
                    <p className="text-sm"> Sort By: {filterOpenings}</p>
                    <CaretDownIcon />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      <div className="flex overflow-x-auto gap-6 flex-col h-screen overflow-y-scroll w-full ">
        {currentView === "openings" && (
          <CurrentOpenings
            setCurrentView={setCurrentView}
            setSelectedJob={setSelectedJob}
          />
        )}
        {currentView === "closed" && <ClosedOpenings />}
        {currentView === "details" && (
          <JobDetails
            selectedJob={selectedJob}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === "candidatedetail" && (
          <CandidateDetail setCurrentView={setCurrentView} />
        )}
        {/* {jobPosts.map((jobPost, index) => (
          <JobPost
            jobPost={jobPost}
            setSelectedOpening={setSelectedOpening}
            key={index}
            {...jobPost}
          />
        ))} */}
      </div>
    </DashboardWrapper>
  );
};

const JobPost = ({
  title,
  logo,
  time,
  setSelectedOpening,
  jobPost,
}: {
  title: string;
  location: string;
  experience: string;
  applications: number;
  logo: StaticImageData;
  time: string;
  setSelectedOpening: any;
  jobPost: any;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        setSelectedOpening(jobPost);
      }}
      className="min-w-[420px] cursor-pointer h-30 p-2 border-l-[2px]  bg-[#F9F9F9]  flex   rounded-lg"
    >
      <div
        onClick={() => {
          router.push("/dashboard/candidates");
        }}
        className="flex items-center text-white space-x-4 "
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <Image width={39} height={39} src={logo} alt="logo" />
        </div>
        <div className="flex flex-col">
          <p className="text-base font-medium text-black">{title}</p>
          <p className="text-sm text-gray-500">Posted {time}</p>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
