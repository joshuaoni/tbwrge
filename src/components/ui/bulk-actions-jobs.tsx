import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";

import { bulkAction } from "@/actions/bulk-action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/hooks/use-user-store";

interface BulkActionsJobsPopUpProps {
  jobIds: string[];
  status: "open" | "closed";
}

export const BulkActionsJobsPopUp = (props: BulkActionsJobsPopUpProps) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const { userData } = useUserStore();
  const [showPopUp, setShowPopUp] = React.useState(false);
  const bulkActionMutation = useMutation({
    mutationKey: ["bulk-action"],
    mutationFn: async () => {
      const response = await bulkAction({
        status: selectedOption === "close" ? "closed" : "open",
        jobIds: props.jobIds,
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
        <div className="flex flex-col w-fit bg-white rounded-lg">
          <button
            onClick={() => {
              setSelectedOption("close"),
                bulkActionMutation.mutate(),
                setShowPopUp(false);
            }}
            className={classNames(
              selectedOption === "close"
                ? "text-white bg-lightgreen"
                : "text-[#898989]",
              props.status === "closed"
                ? "cursor-not-allowed"
                : "cursor-pointer",
              "p-3 text-sm rounded-t-lg"
            )}
            disabled={props.status === "closed"}
          >
            Close Job
          </button>
          <button
            onClick={() => {
              setSelectedOption("open"),
                bulkActionMutation.mutate(),
                setShowPopUp(false);
            }}
            className={classNames(
              selectedOption === "open"
                ? "text-white bg-lightgreen"
                : "text-[#898989]",
              props.status === "open" ? "cursor-not-allowed" : "cursor-pointer",
              "p-3 text-sm"
            )}
            disabled={props.status === "open"}
          >
            Open Job
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
