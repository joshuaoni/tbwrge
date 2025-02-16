import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import LanguageSelectorDropDown from "./language-selector-dropdown";
import { Input } from "./ui/input";

const DashboardHeader = () => {
  return (
    <div className=" ml-[200px] w-full pl-16  border-b h-20 b z-20 bg-white flex flex-wrap items-center px-2 fixed top-0">
      <div className="flex items-center w-screen justify-between flex-wrap  pr-[200px]">
        <div className="border flex mr-auto  px-2 bg-[#F0F0F0] items-center rounded-full">
          <Search color="#898989" />
          <Input
            placeholder="Search for jobs"
            className="bg-[#F0F0F0] border-none placeholder:text-[#898989] w-52 rounded-full outline-none focus:outline-none"
          />
        </div>
        {/* <CreateJob /> */}
        <div className="flex items-center space-x-4">
          <LanguageSelectorDropDown />
          <Link
            href="/dashboard/create"
            className="bg-primary cursor-pointer hover:bg-primary/90 transition-colors transform duration-300 flex items-center py-3 space-x-2 rounded-lg w-fit px-2 font-medium text-white mt-auto"
          >
            <PlusCircle />
            <p className="text-sm font-bold">Create New Job Post</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
