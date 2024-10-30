import React, { useEffect, useMemo, useState } from "react";
import FrontEndLogo from "../../../public/images/react.png";
import ProductDesigner from "../../../public/images/figma-removebg-preview.png";
import ProjectManager from "../../../public/images/Jira_2-removebg-preview.png";
import Excel from "../../../public/images/Excel-removebg-preview.png";
import BackEnd from "../../../public/images/Node_js-removebg-preview.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image, { StaticImageData } from "next/image";
import { GraduationCap, MapPin, User2, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { jobPosts } from "@/constants/data";

const JobPostings = () => {
  const [selectedOpening, setSelectedOpening] = useState();
  const [filterOpenings, setFilterOpenings] = useState("latest");

  const [filterCandidate, setFilterCandidate] = useState("Fit Score");
  return (
    <div>
      <div className="flex w-full justify-between items-center  mb-4">
        <h1 className="text-xl font-bold">Current Postings</h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-12  px-3 w-fit rounded-full text-[#898989] bg-[#e1e1e1] flex items-center">
                <p className="text-sm"> Sort By: {filterOpenings}</p>
                <CaretDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6   w-full ">
        {jobPosts.map((jobPost, index) => (
          <JobPost
            jobPost={jobPost}
            setSelectedOpening={setSelectedOpening}
            key={index}
            {...jobPost}
          />
        ))}
      </div>

      <div className="flex w-full justify-between items-center mt-12  my-4">
        <h1 className="text-xl font-bold">Candidates</h1>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-12  px-3 w-fit rounded-full text-[#898989] bg-[#e1e1e1] flex items-center">
                <p className="text-sm"> Rank By: {filterCandidate}</p>
                <CaretDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setFilterCandidate("Years of Exp");
                }}
              >
                Years Of Experience
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setFilterCandidate("Key Skills");
                }}
              >
                Key Skills
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setFilterCandidate("Fit Score");
                }}
              >
                Fit Score
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-6   w-full ">
        <Candidates job={selectedOpening} filterCandidate={filterCandidate} />
      </div>
    </div>
  );
};

const JobPost = ({
  title,
  location,
  experience,
  applications,
  logo,
  time,
  setSelectedOpening,
  jobPost,
}: {
  title: string;
  location: string;
  experience: string;
  applications: number;
  logo: StaticImageData;
  time: string;
  setSelectedOpening: any;
  jobPost: any;
}) => {
  return (
    <div
      onClick={() => {
        setSelectedOpening(jobPost);
      }}
      className="min-w-[420px] cursor-pointer h-60 p-4 border-l-[4px] border-l-blue-500 bg-[#1e1e1e] flex-col flex  rounded-3xl"
    >
      <div className="flex items-center text-white space-x-4 ">
        <Image width={90} height={90} src={logo} alt="logo" />
        <div className="flex flex-col">
          <p className="text-xl font-medium">{title}</p>
          <p className="text-sm text-gray-500">Posted {time}</p>
        </div>
      </div>
      <div className="flex items-center text-gray-500 space-x-3 mt-2">
        <div className="rounded-full flex items-center space-x-2 bg-[#282828] px-2 py-[2px]  ">
          <MapPin color="#898989" size={15} />
          <p className="text-[#898989] text-sm">{location}</p>
        </div>
        <div className="rounded-full flex items-center bg-[#282828] space-x-2 px-2 py-[2px]  ">
          <GraduationCap color="#898989" size={15} />
          <p className="text-[#898989] text-sm">{experience}</p>
        </div>
      </div>
      <div className="inline-flex items-end  text-white mt-auto">
        <p className="font-extrabold text-[60px]">{applications}</p>
        <p className="text-gray-500 mb-4 ml-2">applications</p>
      </div>
    </div>
  );
};

const Candidates = ({ job, filterCandidate }: any) => {
  const [candidates, setCandidates] = useState<any[]>([]);

  // Load job candidates and calculate fit scores when the job data changes
  useEffect(() => {
    if (job) {
      const candidatesWithSkillsMatch = job.candidates.map(
        (candidate: any) => ({
          ...candidate,
          skillMatch: calculateFitScore(candidate.skills, job.skills),
        })
      );
      setCandidates(candidatesWithSkillsMatch);
    }
  }, [job]);

  // Calculate fit score based on matching skills
  const calculateFitScore = (
    candidateSkills: string[],
    keySkills: string[]
  ): number => {
    const matchedSkills = candidateSkills.filter((skill) =>
      keySkills.includes(skill)
    );
    return Math.round((matchedSkills.length / keySkills.length) * 100);
  };

  // Sort candidates based on the filter criteria
  const filteredCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      if (filterCandidate === "Years of Exp") {
        return b.experience - a.experience;
      }
      if (filterCandidate === "Key Skills") {
        return b.skillMatch - a.skillMatch;
      }
      if (filterCandidate === "Fit Score") {
        return b.fitScore - a.fitScore;
      }
      return 0;
    });
  }, [candidates, filterCandidate]);

  return (
    <div>
      <Table>
        <TableHeader className="bg-[#d6d6d6] text-[#898989]">
          <TableRow>
            <TableHead>CANDIDATE NAME</TableHead>
            <TableHead>FIT SCORE</TableHead>
            <TableHead>YOE</TableHead>
            <TableHead className="text-right">KEY SKILLS</TableHead>
            <TableHead className="text-right">APPLICATION DATE</TableHead>
            <TableHead className="text-right">ATTACHMENT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCandidates.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell
                className={`${
                  index < 5 ? "font-bold text-green-400" : "font-light"
                } flex items-center`}
              >
                <UserCircle2 size={20} className="mr-2" /> {candidate.name}
              </TableCell>
              <TableCell
                className={`${index < 5 ? "font-bold text-green-400" : "font-light"}`}
              >
                {candidate.fitScore}
              </TableCell>
              <TableCell
                className={`${index < 5 ? "font-bold text-green-400" : "font-light"}  `}
              >
                {candidate.experience}
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold text-green-400" : "font-light"
                } text-right `}
              >
                {candidate.skillMatch}%
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold text-green-400" : "font-light"
                } text-right `}
              >
                10 hours ago
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold text-green-400" : "font-light"
                } text-right `}
              >
                Resume.pdf
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobPostings;
