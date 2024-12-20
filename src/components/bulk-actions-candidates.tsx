import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "./ui/button";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { bulkCandidatesAction } from "@/actions/bulk-candidate-action";
import { useUserStore } from "@/hooks/use-user-store";
export const BulkActionsCandidatesPopUp = ({
  applicationIds,
}: {
  applicationIds: string[];
}) => {
  const [selectedOption, setSelectedOption] = React.useState(
    "send_screening_email"
  );
  const { userData } = useUserStore();
  const bulkActionMutation = useMutation({
    mutationKey: ["bulk-candidate-action"],
    mutationFn: async () => {
      await bulkCandidatesAction({
        status: selectedOption,
        applicationIds,
        token: userData?.token,
      });
    },
  });
  return (
    <Popover>
      <PopoverTrigger className="w-fit mt-2">
        <Button className="bg-[#F0F0F0] flex items-center ml-auto space-x-4 text-gray-300 rounded-full">
          <span>Bulk Actions</span>
          <CaretDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg z-10 border-none w-fit">
        <div className="flex flex-col  w-fit  bg-white rounded-lg">
          <span
            onClick={() => setSelectedOption("fit_Score")}
            className={` ${
              selectedOption === "send_screening_email"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-t-lg`}
          >
            Send Screening Email
          </span>
          <span
            onClick={() => setSelectedOption("send_interview_email")}
            className={`${
              selectedOption === "send_interview_email"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Send Interview Email
          </span>
          <span
            onClick={() => setSelectedOption("reject_candidate")}
            className={`${
              selectedOption === "reject_candidate"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Reject Candidate
          </span>
          <span
            onClick={() => setSelectedOption("send_rejection_mail")}
            className={`${
              selectedOption === "send_rejection_mail"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Send Reject Candidate
          </span>
          <span
            onClick={() => setSelectedOption("shortlist_candidates")}
            className={`${
              selectedOption === "shortlist_candidates"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Shortlist Candidates
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
