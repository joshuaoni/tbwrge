import React from "react";
import { Input } from "./ui/input";
import { PlusCircle, Search } from "lucide-react";
import LanguageSelectorDropDown from "./language-selector-dropdown";

const DashboardHeader = ({
  setStartCreateJobFlow,
}: {
  setStartCreateJobFlow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className=" w-full pl-[300px] border-b left-[100px] h-20 bg-white flex items-center px-2 fixed top-0">
      <div className="flex items-center w-[1000px] justify-between ">
        <div className="border flex   px-2 bg-[#F0F0F0] items-center rounded-full">
          <Search color="#898989" />
          <Input
            placeholder="Search for jobs"
            className="bg-[#F0F0F0] border-none placeholder:text-[#898989] w-52 rounded-full outline-none focus:outline-none"
          />
        </div>
        {/* <CreateJob /> */}
        <div className="flex items-center space-x-4">
          <LanguageSelectorDropDown />
          <div
            onClick={() => setStartCreateJobFlow(true)}
            className="bg-primary cursor-pointer hover:bg-primary/90 transition-colors transform duration-300 flex items-center py-3 space-x-2 rounded-lg w-fit px-2 font-medium text-white mt-auto"
          >
            <PlusCircle />
            <p className="text-sm font-bold">Create New Job Post</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
