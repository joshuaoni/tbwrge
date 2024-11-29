import { ArrowLeft } from "lucide-react";
import React from "react";

const CandidateDetail = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            setCurrentView("details");
          }}
        />
        <span className="text-2xl font-semibold">Babalola Emmanuel</span>
      </div>
    </div>
  );
};

export default CandidateDetail;
