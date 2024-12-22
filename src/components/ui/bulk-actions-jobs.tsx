import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { bulkAction } from "@/actions/bulk-action";
import { Button } from "./button";
import { useUserStore } from "@/hooks/use-user-store";
export const BulkActionsJobsPopUp = ({ jobIds }: { jobIds: string[] }) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const { userData } = useUserStore();
  const [showPopUp, setShowPopUp] = React.useState(false);
  const bulkActionMutation = useMutation({
    mutationKey: ["bulk-action"],
    mutationFn: async () => {
      const response = await bulkAction({
        status: selectedOption === "close" ? "closed" : "open",
        jobIds,
        token: userData?.token,
      });
      console.log("done bulk action", response);
    },
  });
  return (
    <Popover open={showPopUp} onOpenChange={setShowPopUp}>
      <PopoverTrigger className="w-fit mt-2">
        <div className="bg-[#F0F0F0] mt-6 flex p-3 items-center ml-auto space-x-4 text-gray-300 rounded-full">
          <span>Bulk Actions</span>
          <CaretDownIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg z-10 border-none w-fit">
        <div className="flex flex-col  w-fit  bg-white rounded-lg">
          <span
            onClick={() => {
              setSelectedOption("close"),
                bulkActionMutation.mutate(),
                setShowPopUp(false);
            }}
            className={` ${
              selectedOption === "close"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-t-lg`}
          >
            Close Job
          </span>
          <span
            onClick={() => {
              setSelectedOption("open"),
                bulkActionMutation.mutate(),
                setShowPopUp(false);
            }}
            className={`${
              selectedOption === "open"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Open Job
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
