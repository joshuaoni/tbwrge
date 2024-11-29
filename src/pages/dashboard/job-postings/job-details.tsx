import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ArrowLeft, CircleEllipsis } from "lucide-react";
import React from "react";

const JobDetails = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            onClick={() => {
              setCurrentView("openings");
            }}
            className="cursor-pointer"
          />
          <div className="flex flex-col bg-[#F9F9F9] rounded-lg p-2">
            <span className="font-semibold">Jr. FrontEnd Engineer</span>
            <span className="text-xs text-[#8F8F8F]">
              Spotify, Singapore - 2 Days ago
            </span>
          </div>
          <CircleEllipsis color="#065844" className="ml-4 cursor-pointer" />
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between space-x-12 mb-3">
            <span className="font-semibold text-lg">Tools</span>
            <Button className="bg-[#F0F0F0] text-gray-300 rounded-full">
              Top 5 Candidates
            </Button>
          </div>
          <div className="">
            <Button className="bg-primary rounded-2xl text-white">
              Summarize
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 items-center space-x-16">
        <span className="text-2xl font-semibold ">All Candidates</span>
        <span className="text-base cursor-pointer text-green-800 font-medium ">
          Shortlisted Candidates
        </span>
        <span className="text-base cursor-pointer text-red font-medium ">
          Rejected Candidates
        </span>
        <span className="text-base cursor-pointer text-[#3F89AC] font-medium ">
          Screen Candidates
        </span>
        <span className="flex-1" />
        <Button className="bg-[#F0F0F0] ml-auto text-gray-300 rounded-full">
          Top 5 Candidates
        </Button>
      </div>
    </section>
  );
};

export default JobDetails;
