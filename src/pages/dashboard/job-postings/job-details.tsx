import React from "react";
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
const JobDetails = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const CANDIDATES = [
    {
      selection: "",
      name: "Amiolemen David",
      id: "4930",
      fitScore: "10",
      YOE: "2",
      keySkills: "89%",
      date: "31/12/2024",
      attachments: "Resume.pdf",
    },
    {
      selection: "",
      name: "Sinatra Frank",
      id: "4930",
      fitScore: "10",
      YOE: "2",
      keySkills: "89%",
      date: "31/12/2024",
      attachments: "Resume.pdf",
    },
    {
      selection: "",
      name: "Paul Walker",
      id: "4930",
      fitScore: "10",
      YOE: "2",
      keySkills: "89%",
      date: "31/12/2024",
      attachments: "Resume.pdf",
    },
    {
      selection: "",
      name: "Michael Davies",
      id: "4930",
      fitScore: "10",
      YOE: "2",
      keySkills: "89%",
      date: "31/12/2024",
      attachments: "Resume.pdf",
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-between">
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
          <CircleEllipsis color="#065844" className="ml-4 cursor-pointer" />
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between space-x-12 mb-3">
            <span className="font-semibold text-lg">Tools</span>
            <Button className="bg-[#F0F0F0] text-gray-300 rounded-full">
              Top 5 Candidates
            </Button>
          </div>
          <div className="">
            <Button className="bg-primary rounded-2xl text-white">
              Summarize
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 items-center space-x-16">
        <span className="text-2xl font-semibold ">All Candidates</span>
        <span className="text-base cursor-pointer text-green-800 font-medium ">
          Shortlisted Candidates
        </span>
        <span className="text-base cursor-pointer text-red font-medium ">
          Rejected Candidates
        </span>
        <span className="text-base cursor-pointer text-[#3F89AC] font-medium ">
          Screen Candidates
        </span>
        <span className="flex-1" />
        <Button className="bg-[#F0F0F0] ml-auto text-gray-300 rounded-full">
          Top 5 Candidates
        </Button>
      </div>
      <Table className="mt-12 bg-[#F0F0F0] p-5 rounded-md">
        <TableHeader>
          <TableRow className="bg-[#D6D6D6] rounded-lg ">
            <TableHead className="w-[100px] text-[#898989]" />
            <TableHead className="w-[100px] text-[#898989]">
              CANDIDATE NAME
            </TableHead>
            <TableHead className="text-[#898989]"> ID</TableHead>
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
          {CANDIDATES.map((candidate) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                setCurrentView("candidatedetail");
              }}
              key={candidate.id}
            >
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell width={200} className="font-medium">
                {candidate.name}
              </TableCell>
              <TableCell>{candidate.id}</TableCell>
              <TableCell>{candidate.fitScore}</TableCell>
              <TableCell>{candidate.YOE}</TableCell>
              <TableCell>{candidate.keySkills}</TableCell>
              <TableCell>{candidate.date}</TableCell>
              <TableCell className="text-end">
                {candidate.attachments}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default JobDetails;
