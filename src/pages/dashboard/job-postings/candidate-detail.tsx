import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import React from "react";

const CandidateDetail = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => {
              setCurrentView("details");
            }}
          />
          <span className="text-2xl font-semibold">Babalola Emmanuel</span>
        </div>
        <div className="ml-auto space-x-6">
          <span className="text-[#2D62A8]  cursor-pointer text-sm">
            Generate Candidate Report
          </span>
          <span className="text-[#E83B3B]  cursor-pointer text-sm">Report Candidate</span>
          <Button className="bg-lightgreen text-white rounded-full">
            Mark As Fit
          </Button>
        </div>
      </div>
      <section className="w-full h-screen  flex space-x-6  mt-6">
        <div className="w-[30%] h-full flex flex-col space-y-6">
          <div className="shadow-lg border rounded-xl p-4 h-[400px] ">
            {" "}
            <div className="flex justify-between">
              <span className="font-bold text-lg">Profile Overview</span>
              <span className="font-bold text-base ">Fit Score</span>
            </div>
          </div>
          <div className="shadow-lg border rounded-xl p-4 h-[300px] ">
            <span className="font-bold text-lg">Supporting Document</span>
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-col space-y-6">
          <div className="flex items-center justify-between w-full">
            <div className="shadow-lg border w-[47%] rounded-xl p-4 h-[400px] ">
              {" "}
              <span className="font-bold text-lg">Profile Summary</span>
            </div>
            <div className="shadow-lg border w-[47%]  rounded-xl p-4 h-[400px] ">
              <span className="font-bold text-lg">AI Powered Insights</span>
            </div>
          </div>
          <div className="shadow-lg border w-full rounded-xl p-4 h-[300px] ">
            <div className=" flex items-center">
              <span className="font-bold text-lg">Add Notes</span>
              <PlusCircle className="ml-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateDetail;
