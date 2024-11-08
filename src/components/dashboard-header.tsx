import React from "react";
import { Input } from "./ui/input";
import { BellDotIcon, Search } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const DashboardHeader = () => {
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

        {/* <div className=" space-x-4    flex items-center">
          <BellDotIcon color="#e1e1e1" />
          <ChatBubbleIcon color="#e1e1e1" />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
