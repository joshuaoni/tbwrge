import DashboardWrapper from "@/components/dashboard-wrapper";
import CandidateDetail from "@/components/dashboard/job-posting/candidate-detail";
import ClosedOpenings from "@/components/dashboard/job-posting/closed-openings";
import CurrentOpenings from "@/components/dashboard/job-posting/current-openings";
import JobDetails from "@/components/dashboard/job-posting/job-details";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { outfit } from "@/constants/app";
import { CaretDownIcon } from "@radix-ui/react-icons";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JobPostings = () => {
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [filterOpenings, setFilterOpenings] = useState("latest");
  const [currentView, setCurrentView] = useState("openings");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationId, setApplicationId] = useState("");

  return (
    <DashboardWrapper>
      <div
        className={`${outfit.className} pb-[30px] flex flex-col min-h-full w-full max-w-full`}
      >
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          {currentView != "details" && currentView != "candidatedetail" && (
            <>
              <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap">
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
                  className="border-[1.5px] border-[#009379] text-black bg-white whitespace-nowrap"
                >
                  {currentView === "openings"
                    ? "Closed Jobs"
                    : "Current Openings"}
                </Button>
              </div>

              {currentView === "openings" ? (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="rounded-full bg-[#F0F0F0] text-gray-500 h-[35px] px-4 w-[150px] justify-between flex items-center gap-2">
                        <p className="text-sm">Sort By: {filterOpenings}</p>
                        <CaretDownIcon />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white w-[150px] p-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] rounded-lg border-none">
                      <DropdownMenuItem className="w-full px-4 py-3 cursor-pointer hover:bg-gray-50 focus:bg-gray-50">
                        Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <button className=" bg-[#F0F0F0] flex h-[35px] px-4 w-[100px] justify-between items-center ml-auto space-x-4 text-gray-500 text-[12px] rounded-full">
                  Repost Job
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex-1">
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
              setApplicationId={(id) => setApplicationId(id)}
            />
          )}
          {currentView === "candidatedetail" && (
            <CandidateDetail
              applicationId={applicationId}
              setCurrentView={setCurrentView}
            />
          )}
        </div>
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
