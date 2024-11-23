import { ArrowLeft } from "lucide-react";
import React from "react";
import JobDetail from "./job-detail";
import JobDescription from "./job-description";
import AdvancedOptions from "./components/advanced-options";

const CreateJobFlow = ({
  setStartCreateJobFlow,
}: {
  setStartCreateJobFlow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  return (
    <div className=" h-screen pl-4  w-screen pt-[100px]">
      <div className="flex items-center space-x-3">
        <ArrowLeft
          onClick={() => setStartCreateJobFlow(false)}
          className="w-6 h-6 cursor-pointer"
        />
        <h1 className="text-xl font-bold ">Create Job Post</h1>
      </div>
      {currentStep === 1 && <JobDetail setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <JobDescription setCurrentStep={setCurrentStep} />}
      {currentStep === 3 && <AdvancedOptions setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default CreateJobFlow;
