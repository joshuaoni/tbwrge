import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
const AllActivityDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-8  px-3 w-fit rounded-full text-black border flex items-center">
          <p className="text-sm"> All Activity</p>
          <CaretDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuSeparator />
        <DropdownMenuItem>Years Of Experience</DropdownMenuItem>
        <DropdownMenuItem>Key Skills</DropdownMenuItem>
        <DropdownMenuItem>Fit Score</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AllActivityDropDown;
