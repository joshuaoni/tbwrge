import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  formatDateAndDifference,
  getJobOpen,
  IGetJobOpen,
  IGetJobOpenJobType,
  IGetJobOpenRes,
} from "@/actions/get-jobs-open";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useDebounce } from "@/hooks/debounce";
import JobBoardFilter from "./job-board-filter";

const JOB_TYPE = {
  full_time: "Full Time",
  hybrid: "Hybrid",
  part_time: "Part Time",
  internship: "Internship",
};

const JobBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<IGetJobOpenJobType>("full_time");
  const [skills, setSkills] = useState<string[]>([]);
  const debouncedSkills = useDebounce(skills, 1500);
  const debouncedLocation = useDebounce(location, 1500);
  const _ = require("lodash");
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

  return (
    <DashboardWrapper>
      <div>
        <h3 className="text-3xl font-bold">Job Board</h3>

        <div className="flex items-center gap-8 mt-8 mb-4 text-sm font-medium">
          <input
            className="w-52 py-3 px-4 rounded-lg bg-[#ebebeb] focus:outline-none"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <JobBoardFilter
            title={JOB_TYPE[jobType]}
            onChange={(val) => setJobType(val as IGetJobOpenJobType)}
            options={[
              { label: "Full Time", value: "full_time" },
              { label: "Hybrid", value: "hybrid" },
              { label: "Part Time", value: "part_time" },
              { label: "Internship", value: "internship" },
            ]}
          />
          <input
            className="w-52 py-3 px-4 rounded-lg bg-[#ebebeb] focus:outline-none"
            placeholder='Skills (seperate with ",")'
            onChange={(e) => setSkills(e.target.value.split(","))}
            value={skills}
          />
        </div>

        <div aria-roledescription="table" className="w-full">
          <div className="w-full bg-[#D6D6D6] text-[#898989] font-bold py-3 px-5 rounded-[7px] flex gap-6 items-end">
            {["Job Title", "Job Type", "Skills", "Languages", "Tags"].map(
              (text, i) => (
                <span
                  key={i}
                  className={twMerge(
                    "w-full block text-center",
                    i == 0 && "text-left"
                  )}
                >
                  {text}
                </span>
              )
            )}
          </div>
          <div>
            {/* we can improve the loading to use skeleton or sth */}
            {mutation.isPending && <>Posts are loading..</>}
            {mutation.isSuccess &&
              (mutation.data.length < 1 ? (
                <>There are no available posts</>
              ) : (
                mutation.data.map((item, i) => (
                  <div
                    key={i}
                    className="cursor-pointer w-full flex gap-4 px-5 py-3"
                  >
                    <div className="w-full flex justify-between items-center h-fit gap-2 p-2 rounded-lg bg-[#F9F9F9] ">
                      <div className="w-8 h-8 bg-slate-300 flex items-center justify-center  rounded-full">
                        <p>{item.job_title[0]}</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.job_title}</span>
                        <span className="text-xs text-[#8F8F8F]">
                          {_.truncate(item.company_name, { length: 12 })} •{" "}
                          {item.job_location_name} -
                          {formatDateAndDifference(item.start_date)}
                        </span>
                      </div>
                    </div>
                    <span className="w-4/5 block text-center">
                      {JOB_TYPE[item.job_type as keyof typeof JOB_TYPE]}
                    </span>
                    <span className="w-full block text-center">
                      {item.required_skills}
                    </span>
                    <span className="w-full block text-center">
                      {item.languages}
                    </span>
                    <span className="w-full block text-center">
                      {item.tags}
                    </span>
                  </div>
                ))
              ))}
            {mutation.isError && (
              <div>
                {mutation.error.message ??
                  (mutation.error as any)?.response?.data?.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default JobBoardPage;
