import React from "react";
import {
  BellDotIcon,
  Home,
  MessageSquareIcon,
  Search,
  Users2,
} from "lucide-react";
import { CreateJob } from "@/pages/dashboard/dashboard-home";
import { Input } from "../ui/input";
import Image from "next/image";
import candivetlogo from "../../../public/images/candivet-logo.png";

const CommunityDashHeader = () => {
  return (
    <div className=" w-full  border-b  h-20 bg-white flex items-center px-6 fixed top-0">
      <div className="flex items-center w-full   ">
        <div className="flex items-center  cursor-pointer">
          <Image src={candivetlogo} alt="" width={50} height={50} />
          <h1 className="text-3xl font-bold">Candivet</h1>
        </div>
        <div className="flex items-center ml-[100px] space-x-6">
          <Home />
          <Users2 fill="black" />
          <div className="border flex   px-2 bg-white items-center rounded-md">
            <Input
              placeholder="Search for jobs"
              className="bg-transparent rounded-md border-none placeholder:text-[#898989] w-[400px]  outline-none focus:outline-none"
            />
            <Search color="#898989" />
          </div>
        </div>
        <div className=" space-x-8  ml-[30px]   flex items-center">
          <BellDotIcon fill="black" />
          <MessageSquareIcon fill="black" />
        </div>
      </div>
    </div>
  );
};

export default CommunityDashHeader;
