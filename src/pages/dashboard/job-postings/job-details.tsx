import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleEllipsis } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { BulkActionsCandidatesPopUp } from "@/components/bulk-actions-candidates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobApplications } from "@/actions/fetch-applications";
import { useUserStore } from "@/hooks/use-user-store";
import { ICandidate } from "@/interfaces/candidate";
const JobDetails = ({
  setCurrentView,
  selectedJob,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  selectedJob: any;
}) => {
  // const CANDIDATES = [
  //   {
  //     selection: "",
  //     name: "Amiolemen David",
  //     id: "4930",
  //     fitScore: "10",
  //     YOE: "2",
  //     keySkills: "89%",
  //     date: "31/12/2024",
  //     attachments: "Resume.pdf",
  //   },
  //   {
  //     selection: "",
  //     name: "Sinatra Frank",
  //     id: "4930",
  //     fitScore: "10",
  //     YOE: "2",
  //     keySkills: "89%",
  //     date: "31/12/2024",
  //     attachments: "Resume.pdf",
  //   },
  //   {
  //     selection: "",
  //     name: "Paul Walker",
  //     id: "4930",
  //     fitScore: "10",
  //     YOE: "2",
  //     keySkills: "89%",
  //     date: "31/12/2024",
  //     attachments: "Resume.pdf",
  //   },
  //   {
  //     selection: "",
  //     name: "Michael Davies",
  //     id: "4930",
  //     fitScore: "10",
  //     YOE: "2",
  //     keySkills: "89%",
  //     date: "31/12/2024",
  //     attachments: "Resume.pdf",
  //   },
  // ];
  const { userData } = useUserStore();
  const [applicants, setApplicants] = React.useState<ICandidate[]>([]);
  const [selectedApplications, setSelectedApplications] = React.useState<
    ICandidate[]
  >([]);
  const { mutate } = useMutation({
    mutationKey: ["job-details"],
    mutationFn: async (status: string) => {
      const response = await getJobApplications({
        job_id: selectedJob.id,
        token: userData?.token,
        status,
      });
      setApplicants(response);
      return response;
    },
  });
  useEffect(() => {
    mutate("all");
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <div className="flex items-center space-x-4">
            <ArrowLeft
              onClick={() => {
                setCurrentView("openings");
              }}
              className="cursor-pointer"
            />
            <div className="flex flex-col bg-[#F9F9F9] rounded-lg p-2">
              <span className="font-semibold">Jr. FrontEnd Engineer</span>
              <span className="text-xs text-[#8F8F8F]">
                Spotify, Singapore - 2 Days ago
              </span>
            </div>
            <EllipsisPopUp />
          </div>
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between space-x-12 mb-3">
            <span className="font-semibold text-lg">Tools</span>
            <TopCandidatesPopUp />
          </div>
          <div className="">
            <Button className="bg-lightgreen rounded-2xl text-white">
              <span>Summarize</span>
              <CaretDownIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 items-center space-x-16">
        <span className="text-2xl font-semibold ">All Candidates</span>
        <span
          onClick={() => {
            mutate("shortlisted");
          }}
          className="text-base cursor-pointer text-green-800 font-medium "
        >
          Shortlisted Candidates
        </span>
        <span
          onClick={() => {
            mutate("rejected");
          }}
          className="text-base cursor-pointer text-red font-medium "
        >
          Rejected Candidates
        </span>
        <span
          onClick={() => {
            mutate("screened");
          }}
          className="text-base cursor-pointer text-[#3F89AC] font-medium "
        >
          Screened Candidates
        </span>
        <span className="flex-1" />
        <RankPopUp />
      </div>
      <BulkActionsCandidatesPopUp
        applicationIds={selectedApplications.map((app) => app.id)}
      />
      <Table className="mt-6 bg-[#F0F0F0] p-5 rounded-md">
        <TableHeader>
          <TableRow className="bg-[#D6D6D6] rounded-lg ">
            <TableHead className="w-[100px] text-[#898989]" />
            <TableHead className="w-[100px] text-[#898989]">
              CANDIDATE NAME
            </TableHead>
            <TableHead className="text-[#898989]">ID</TableHead>
            <TableHead className="text-[#898989]">Fit Score</TableHead>
            <TableHead className="text-[#898989]">YOE</TableHead>
            <TableHead className="text-[#898989]">Key Skills</TableHead>
            <TableHead className=" text-[#898989]">APPLICATION DATE</TableHead>
            <TableHead className="text-right text-[#898989]">
              ATTACHMENT{" "}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.map((candidate) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                setCurrentView("candidatedetail");
              }}
              key={candidate.id}
            >
              <TableCell>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedApplications([
                      ...selectedApplications,
                      candidate,
                    ]);
                  }}
                />
              </TableCell>
              <TableCell width={200} className="font-medium">
                {candidate.applicant.name}
              </TableCell>
              <TableCell>{candidate.id}</TableCell>
              <TableCell>{candidate.fit_score}</TableCell>
              <TableCell>{candidate.years_of_experience}</TableCell>
              <TableCell>{candidate.key_skills}</TableCell>
              <TableCell>{candidate.created_at as any}</TableCell>
              <TableCell className="text-end">{candidate.cv}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

const EllipsisPopUp = () => {
  const [selectedOption, setSelectedOption] = React.useState("edit_job");
  return (
    <Popover>
      <PopoverTrigger>
        <CircleEllipsis color="#065844" className="ml-4 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg z-10 border-none w-fit">
        <div className="flex flex-col  w-fit  bg-white rounded-lg">
          <span
            onClick={() => setSelectedOption("edit_job")}
            className={` ${
              selectedOption === "edit_job"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-t-lg`}
          >
            Edit job{" "}
          </span>
          <span
            onClick={() => setSelectedOption("copy_job_link")}
            className={`${
              selectedOption === "copy_job_link"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Copy Job Link
          </span>
          <span
            onClick={() => setSelectedOption("copy_embed_code")}
            className={`${
              selectedOption === "copy_embed_code"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Copy Embed Code
          </span>
          <span
            onClick={() => setSelectedOption("close_job")}
            className={`${
              selectedOption === "close_job"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-b-lg`}
          >
            Close Job
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
const TopCandidatesPopUp = () => {
  const [selectedOption, setSelectedOption] = React.useState("top_5");
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-[#F0F0F0] ml-auto text-gray-300 rounded-full">
          <span>Top 5 Candidates</span>
          <CaretDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg z-10 border-none w-fit">
        <div className="flex flex-col  w-fit  bg-white rounded-lg">
          <span
            onClick={() => setSelectedOption("top_5")}
            className={` ${
              selectedOption === "top_5"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-t-lg`}
          >
            Top 5 Candidates
          </span>
          <span
            onClick={() => setSelectedOption("top_10")}
            className={`${
              selectedOption === "top_10"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Top 10 Candidates
          </span>
          <span
            onClick={() => setSelectedOption("top_15")}
            className={`${
              selectedOption === "copy_embed_code"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Top 15 Candidates
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
const RankPopUp = () => {
  const [selectedOption, setSelectedOption] = React.useState("fit_Score");
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-[#F0F0F0] ml-auto text-gray-300 rounded-full">
          <span>
            Rank By{" "}
            {selectedOption === "fit_Score"
              ? "Fit Score"
              : selectedOption === "key_skills"
              ? "Key Skills"
              : "Years Of Exp"}{" "}
          </span>
          <CaretDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-lg z-10 border-none w-fit">
        <div className="flex flex-col  w-[130px]  bg-white rounded-lg">
          <span
            onClick={() => setSelectedOption("fit_Score")}
            className={` ${
              selectedOption === "fit_score"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm rounded-t-lg`}
          >
            Fit Score
          </span>
          <span
            onClick={() => setSelectedOption("YOE")}
            className={`${
              selectedOption === "YOE"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            YOE
          </span>
          <span
            onClick={() => setSelectedOption("key_skills")}
            className={`${
              selectedOption === "key_skills"
                ? "text-white bg-lightgreen"
                : "text-[#898989]"
            } cursor-pointer p-3 text-sm`}
          >
            Key Skills
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobDetails;
