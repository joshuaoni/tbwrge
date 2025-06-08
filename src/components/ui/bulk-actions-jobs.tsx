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
import { toast } from "react-hot-toast";

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
    onSuccess: () => {
      toast.success("Bulk action successful");
    },
    onError: () => {
      toast.error("Bulk action failed");
    },
  });
  return (
    <Popover open={showPopUp} onOpenChange={setShowPopUp}>
      <PopoverTrigger className="w-fit">
        <div className="bg-[#F0F0F0] flex h-[35px] px-4 w-[150px] justify-between items-center ml-auto space-x-4 text-gray-500 text-[12px] rounded-full">
          <span>Bulk Actions</span>
          <CaretDownIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="rounded-lg z-10 border-none p-0 w-[150px]">
        <div className="flex flex-col w-full bg-white rounded-lg">
          <button
            onClick={() => {
              setSelectedOption("close"),
                bulkActionMutation.mutate(),
                setShowPopUp(false);
            }}
            className={classNames(
              selectedOption === "close"
                ? "text-white bg-lightgreen"
                : "text-[#898989] hover:bg-gray-50",
              props.status === "closed"
                ? "cursor-not-allowed"
                : "cursor-pointer",
              "p-3 text-sm rounded-t-lg w-full transition-colors"
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
                : "text-[#898989] hover:bg-gray-50",
              props.status === "open" ? "cursor-not-allowed" : "cursor-pointer",
              "p-3 text-sm w-full rounded-b-lg transition-colors"
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
