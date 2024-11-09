import React, { useEffect, useMemo, useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { UserCircle2 } from "lucide-react";
const index = () => {
  const [filterCandidate, setFilterCandidate] = useState("Fit Score");
  const [selectedOpening, setSelectedOpening] = useState(null);

  return (
    <DashboardWrapper>
      {" "}
      <>
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
          {selectedOpening ? (
            <Candidates
              job={selectedOpening}
              filterCandidate={filterCandidate}
            />
          ) : (
            <div className="flex items-center w-full h-full justify-center ">
              <p className="font-semibold text-base mt-24">
                Select an active opening
              </p>
            </div>
          )}
        </div>
      </>
    </DashboardWrapper>
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
              <CandidateDetail index={index} candidate={candidate} />
              <TableCell
                className={`${index < 5 ? "font-bold " : "font-light"}`}
              >
                {candidate.fitScore}
              </TableCell>
              <TableCell
                className={`${index < 5 ? "font-bold " : "font-light"}  `}
              >
                {candidate.experience}
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold " : "font-light"
                } text-right `}
              >
                {candidate.skillMatch}%
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold " : "font-light"
                } text-right `}
              >
                10 hours ago
              </TableCell>
              <TableCell
                className={`${
                  index < 5 ? "font-bold " : "font-light"
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

const CandidateDetail = ({ index, candidate }: any) => {
  const [stage, setStage] = useState("resume");
  return (
    <Dialog>
      <DialogTrigger>
        <TableCell
          className={`${index < 5 ? "font-bold " : "font-light"} flex`}
        >
          <UserCircle2 size={20} className="mr-2" /> {candidate.name}
        </TableCell>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">Candidate Summary</DialogTitle>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="cursor-pointer">
                <BreadcrumbLink onClick={() => setStage("resume")}>
                  Resume
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="cursor-pointer">
                <BreadcrumbLink onClick={() => setStage("cover")}>
                  Cover Letter
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </DialogHeader>

        {stage === "resume" ? (
          <div className="flex flex-col min-h-[500px]">
            <h1 className="text-base font-semibold">Summary </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi rem
              cum odio nam necessitatibus exercitationem earum accusantium quas
              reiciendis a incidunt laboriosam distinctio dolore vitae, ipsa
              molestias suscipit fugit? Unde!
            </p>
            <div className="mt-3">
              <h1 className="text-base font-semibold">Experience </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                rem cum odio nam necessitatibus exercitationem earum accusantium
                quas reiciendis a incidunt laboriosam distinctio dolore vitae,
                ipsa molestias suscipit fugit? Unde!
              </p>
            </div>
          </div>
        ) : stage === "cover" ? (
          <div className="min-h-[500px]">
            <div className="mt-3">
              <h1 className="text-base font-semibold">Cover Letter </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                rem cum odio nam necessitatibus exercitationem earum accusantium
                quas reiciendis a incidunt laboriosam distinctio dolore vitae,
                ipsa molestias suscipit fugit? Unde! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptatum odit porro accusamus
                omnis sint, ullam ipsum, fuga sit sunt animi laboriosam odio
                dolorum. Laboriosam dolore deserunt impedit, corrupti ad
                adipisci!
              </p>
            </div>
          </div>
        ) : (
          <>skills</>
        )}
        <Button
          onClick={() => setStage("cover")}
          className="bg-primary text-white"
        >
          Next
        </Button>
        <Button
          variant="outline"
          onClick={() => setStage("cover")}
          className=" bg-white "
        >
          Contact Candidate
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default index;
