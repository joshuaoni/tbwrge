import { getJobApplications } from "@/actions/fetch-applications";
import { BulkActionsCandidatesPopUp } from "@/components/bulk-actions-candidates";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/hooks/use-user-store";
import { ICandidate } from "@/interfaces/candidate";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import JobDetailsOptions from "./job-details-options";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { BulkActionsJobsPopUp } from "@/components/ui/bulk-actions-jobs";
import { IJob } from "@/interfaces/job";
import CandidateDetails from "./candidate-details";

const DUMMY_CANDIDATES = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: `214${i}`,
    applicant: {
      name: `Candidate ${i + 1}`,
      avatar: null,
    },
    fit_score: Math.floor(Math.random() * (95 - 75) + 75),
    years_of_experience: Math.floor(Math.random() * 8) + 2,
    key_skills: "React, TypeScript, Node.js, GraphQL",
    created_at: "2024-10-31",
    cv: "Resume.pdf",
    status:
      i < 3 ? "shortlisted" : i < 6 ? "rejected" : i < 8 ? "screened" : "new",
  }));

const JobDetails = ({
  setCurrentView,
  selectedJob,
  setApplicationId,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  selectedJob: any;
  setApplicationId: (val: string) => void;
}) => {
  const { userData } = useUserStore();
  const [applicants, setApplicants] = React.useState(DUMMY_CANDIDATES);
  const [selectedJobs, setSelectedJobs] = React.useState<IJob[]>([]);
  const [selectedApplications, setSelectedApplications] = React.useState<
    string[]
  >([]);
  const [selectedTab, setSelectedTab] = React.useState<
    "all" | "shortlisted" | "rejected" | "screened"
  >("all");
  const [view, setView] = React.useState<"list" | "candidate">("list");
  const [selectedCandidate, setSelectedCandidate] = React.useState<any>(null);

  const filteredApplicants = React.useMemo(() => {
    if (selectedTab === "all") return applicants;
    return applicants.filter((app) => app.status === selectedTab);
  }, [applicants, selectedTab]);

  if (view === "candidate") {
    return (
      <CandidateDetails
        setCurrentView={() => setView("list")}
        candidate={selectedCandidate}
      />
    );
  }

  const TabButton = ({
    tab,
    label,
    color,
  }: {
    tab: "all" | "shortlisted" | "rejected" | "screened";
    label: string;
    color: string;
  }) => (
    <button
      onClick={() => setSelectedTab(tab)}
      className={`font-medium transition-all duration-200 ${
        selectedTab === tab
          ? `text-${color} text-[20px] font-semibold`
          : `text-${color} text-[12px] font-semibold opacity-60`
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="px-6 py-4 bg-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView("openings")}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 bg-[#F9F9F9] py-[4px] px-[16px] rounded-[10px]">
            {selectedJob.company_logo ? (
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                <Image
                  src={selectedJob.company_logo}
                  alt={selectedJob.job_title || ""}
                  width={35}
                  height={35}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-[35px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center">
                <p className="text-white font-medium">
                  {selectedJob.company_name?.[0]}
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="text-base font-medium">{selectedJob.job_title}</h2>
              <p className="text-sm text-gray-500">
                {selectedJob.company_name} -{" "}
                {formatDistanceToNow(new Date(selectedJob.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-auto p-1 rounded-full hover:bg-gray-100 border-2 border-[#009379]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 8.75C2.91421 8.75 3.25 8.41421 3.25 8C3.25 7.58579 2.91421 7.25 2.5 7.25C2.08579 7.25 1.75 7.58579 1.75 8C1.75 8.41421 2.08579 8.75 2.5 8.75Z"
                    stroke="#898989"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
                    stroke="#898989"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 8.75C13.9142 8.75 14.25 8.41421 14.25 8C14.25 7.58579 13.9142 7.25 13.5 7.25C13.0858 7.25 12.75 7.58579 12.75 8C12.75 8.41421 13.0858 8.75 13.5 8.75Z"
                    stroke="#898989"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] rounded-[10px] border-none">
              <div className="flex flex-col bg-white rounded-[10px]">
                <button className="pl-4 py-2 text-[12px] text-left border-b border-gray-200 hover:bg-[#009379] hover:text-white text-gray-700 rounded-t-[10px]">
                  Edit Job
                </button>
                <button className="pl-4 py-2 text-[12px] text-left border-b border-gray-200 hover:bg-[#009379] hover:text-white text-gray-700">
                  Copy Job link
                </button>
                <button className="pl-4 py-2 text-[12px] text-left border-b border-gray-200 hover:bg-[#009379] hover:text-white text-gray-700">
                  Copy Job embed code
                </button>
                <button className="pl-4 py-2 text-[12px] text-left border-b border-gray-200 hover:bg-[#009379] hover:text-white text-gray-700">
                  Copy Screening Link
                </button>
                <button className="pl-4 py-2 text-[12px] text-left border-b border-gray-200 hover:bg-[#009379] hover:text-white text-gray-700 rounded-b-[10px]">
                  Close Job
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.12)] p-2 rounded-[10px] bg-white">
          <div className="flex items-center gap-[50px] justify-between">
            <span className="text-[24px] font-extrabold">Tools</span>
            <Button
              variant="ghost"
              className="bg-[#F0F0F0] text-gray-500 h-[35px] px-4 w-[120px] text-[10px] rounded-full hover:bg-gray-200"
            >
              Top 5 Candidates <CaretDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-[#009379] w-fit text-white font-semibold hover:bg-[#009379] hover:text-white/90 h-[40px] px-[18px] text-sm rounded-[16px] mt-4 mr-auto">
            Summarize <CaretDownIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-[40px] mb-4">
        <TabButton tab="all" label="All Candidates" color="black" />
        <TabButton
          tab="shortlisted"
          label="Shortlisted Candidates"
          color="[#009379]"
        />
        <TabButton tab="rejected" label="Rejected Candidates" color="red" />
        <TabButton
          tab="screened"
          label="Screened Candidates"
          color="[#2B95D7]"
        />
        <div className="flex-1" />
        <Button
          variant="ghost"
          className="bg-[#F0F0F0] text-gray-500 h-[35px] px-4 w-[150px] text-[10px] rounded-full hover:bg-gray-200"
        >
          Rank By: Years of Exp <CaretDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="mb-2">
        <BulkActionsJobsPopUp
          jobIds={selectedJobs.map((job) => job.id)}
          status="open"
        />
      </div>

      <div className="bg-[#F0F0F0] rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#D6D6D6] h-[39.292px] rounded-lg">
              <TableHead className="w-[40px] pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                <input type="checkbox" className="rounded-sm" />
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                CANDIDATE NAME
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                ID
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                FIT SCORE
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                YOE
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                KEY SKILLS
              </TableHead>
              <TableHead className="px-0 pl-4 text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg">
                APPLICATION DATE
              </TableHead>
              <TableHead className=" text-xs font-medium text-[#898989] h-[39.292px] first:rounded-l-lg last:rounded-r-lg ">
                ATTACHMENTS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((candidate, index) => (
              <TableRow
                key={index}
                className="bg-[#F0F0F0] border-b border-white hover:bg-[#F0F0F0]/80 cursor-pointer  hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
                onClick={() => {
                  setSelectedCandidate(candidate);
                  setView("candidate");
                }}
              >
                <TableCell className="py-4 pl-4 align-middle">
                  <input
                    type="checkbox"
                    className={`rounded-sm ${
                      selectedTab === "rejected" ? "opacity-40" : ""
                    }`}
                    checked={selectedApplications.includes(candidate.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedApplications([
                          ...selectedApplications,
                          candidate.id,
                        ]);
                      } else {
                        setSelectedApplications(
                          selectedApplications.filter(
                            (id) => id !== candidate.id
                          )
                        );
                      }
                      e.stopPropagation();
                    }}
                  />
                </TableCell>
                <TableCell className="py-4 align-middle">
                  <span
                    className={`font-medium text-sm ${
                      selectedTab === "rejected" ? "opacity-40" : ""
                    }`}
                  >
                    {candidate.applicant.name}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm align-middle">
                  <span
                    className={selectedTab === "rejected" ? "opacity-40" : ""}
                  >
                    {candidate.id}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm align-middle">
                  <span
                    className={selectedTab === "rejected" ? "opacity-40" : ""}
                  >
                    {candidate.fit_score}%
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm align-middle">
                  <span
                    className={selectedTab === "rejected" ? "opacity-40" : ""}
                  >
                    {candidate.years_of_experience}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm max-w-[200px] truncate align-middle">
                  <span
                    className={selectedTab === "rejected" ? "opacity-40" : ""}
                  >
                    {candidate.key_skills}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm align-middle">
                  <span
                    className={selectedTab === "rejected" ? "opacity-40" : ""}
                  >
                    31/10/24
                  </span>
                </TableCell>
                <TableCell className="py-4 text-sm align-middle">
                  <div
                    className={`flex items-center gap-1  ${
                      selectedTab === "rejected" ? "opacity-40" : ""
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.75 2.5V5H16.25"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 10H12.5"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 12.5H12.5"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-600">Resume.pdf</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
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
