import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  formatDateAndDifference,
  getJobOpen,
  IGetJobOpen,
  IGetJobOpenJobType,
  IGetJobOpenRes,
} from "@/actions/get-jobs-open";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useDebounce } from "@/hooks/debounce";
import { Table } from "./components/Table/Table";

const JOB_TYPE = {
  full_time: "Full Time",
  hybrid: "Hybrid",
  part_time: "Part Time",
  internship: "Internship",
};

const ITEMS_PER_PAGE = 10;

const JobBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<IGetJobOpenJobType>("full_time");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSkills = useDebounce(skills, 1500);
  const debouncedLocation = useDebounce(location, 1500);
  const _ = require("lodash");
  const [skillInput, setSkillInput] = useState("");

  const mutation = useMutation<IGetJobOpenRes[], Error, IGetJobOpen>({
    mutationKey: ["get-jobs-open"],
    mutationFn: async (data) => await getJobOpen(data),
  });

  useEffect(() => {
    mutation.mutate({
      search_term: searchTerm,
      job_type: jobType,
      skills: debouncedSkills,
      location: debouncedLocation,
    });
  }, [searchTerm, jobType, debouncedSkills, debouncedLocation]);

  // Pagination logic
  const totalItems = mutation.data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageItems = mutation.data?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardWrapper searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className="min-h-screen bg-white">
        <div className="max-w-screen-xl w-full mx-auto">
          {/* Filters */}
          <div className="w-full max-w-screen-lg flex flex-wrap gap-4 mt-4">
            <div className="relative w-[200px]">
              <input
                className="w-full py-3 px-4 rounded-lg bg-[#F2F2F2] focus:outline-none text-[#333] placeholder-[#333]"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="relative w-[200px]">
              <select
                className="w-full py-3 px-4 rounded-lg bg-[#F2F2F2] focus:outline-none text-[#333] appearance-none cursor-pointer"
                value={jobType}
                onChange={(e) =>
                  setJobType(e.target.value as IGetJobOpenJobType)
                }
              >
                {Object.entries(JOB_TYPE).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-[200px]">
              <div className="w-full min-h-[48px] py-2 px-4 rounded-lg bg-[#F2F2F2] focus-within:outline-none flex flex-wrap gap-2 items-center">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setSkills(skills.filter((_, i) => i !== index))
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[#333]">Skills</span>
                )}
                <input
                  className="flex-1 bg-transparent focus:outline-none min-w-[100px]"
                  placeholder={skills.length > 0 ? "" : "Press enter to add"}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && skillInput.trim()) {
                      e.preventDefault();
                      setSkills([...skills, skillInput.trim()]);
                      setSkillInput("");
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Job Table */}
          <div className="w-full mt-8">
            <Table data={currentPageItems} isLoading={mutation.isPending} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#ebebeb] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#ebebeb] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default JobBoardPage;
