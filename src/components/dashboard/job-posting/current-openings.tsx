import { getJobOpenings } from "@/actions/get-current-jobs";
import { getDashboardStats } from "@/actions/get-dashboard-stats";
import { BulkActionsJobsPopUp } from "@/components/ui/bulk-actions-jobs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/hooks/use-user-store";
import { IJob } from "@/interfaces/job";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, File, ShoppingBag, User } from "lucide-react";
import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const CurrentOpenings = ({
  setCurrentView,
  setSelectedJob,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { userData } = useUserStore();
  const [selectedJobs, setSelectedJobs] = React.useState<IJob[]>([]);
  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await getDashboardStats({
        token: userData?.token,
      });
      return response;
    },
  });
  const { data: jobs, error } = useQuery({
    queryKey: ["job-openings"],
    queryFn: async () => {
      const response = await getJobOpenings({
        status: "open",
        token: userData?.token,
      });
      console.log({ response });
      return response;
    },
  });
  const [stats, setStats] = React.useState([
    {
      title: "Total Job Posts",
      value: 0,
      icon: <BriefcaseBusiness size={20} className="text-primary" />,
    },
    {
      title: "Qualified Applicants",
      value: 0,
      icon: <User />,
    },
    {
      title: "Total Applicants",
      value: 0,
      icon: <File />,
    },
  ]);
  useEffect(() => {
    setStats(() => [
      {
        title: "Total Job Posts",
        value: data?.total_job_posts,
        icon: <BriefcaseBusiness size={20} className="text-primary" />,
      },
      {
        title: "Qualified Applicants",
        value: data?.qualified_candidates,
        icon: <User />,
      },
      {
        title: "Total Applicants",
        value: data?.total_applications,
        icon: <File />,
      },
    ]);
  }, [data]);
  return (
    <section>
      <div className="flex items-center space-x-8">
        {stats.map((stat, index) => (
          <div className="shadow-[0px_4px_50px_rgba(0,0,0,0.2)] rounded-2xl   justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-sm font-light ">{stat.title}</span>
            </div>
            <h1 className="text-2xl font-bold mt-4">{stat.value}</h1>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {/* <BulkActionsJobsPopUp
          jobIds={selectedJobs.map((job) => job.id)}
          status="open"
        /> */}
      </div>
      <Table className="mt-2">
        <TableHeader className="h-[39.292px] mb-4">
          <TableRow className="bg-[#D6D6D6]">
            <TableHead className="w-[50px] text-[#898989] h-[39.292px] first:rounded-l-[7.76px]" />
            <TableHead className="w-[25%] text-[#898989] h-[39.292px]">
              Job Title
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              Job ID
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              Total Applicants
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              Recruiter
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              Company
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px] last:rounded-r-[7.76px]">
              End Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job: IJob) => (
            <TableRow
              className="cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
              onClick={() => {
                setCurrentView("details"), setSelectedJob(job);
              }}
              key={job.id}
            >
              <TableCell>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(),
                      setSelectedJobs([...selectedJobs, job]);
                  }}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-[10px] items-center justify-startbg-[#F9F9F9] py-[5px] rounded-[6px]">
                  <div className="flex items-center justify-center w-[35px] ml-[6px]">
                    {job.company_logo ? (
                      <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                        <Image
                          src={job.company_logo}
                          alt={job.job_title || ""}
                          width={35}
                          height={35}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-[35px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center">
                        <p className="text-white font-medium">
                          {job.company_name?.[0]}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-[217px]  gap-[4px]">
                    <h3 className="font-medium tracking-[0%] truncate text-[14px] leading-[15px] text-black">
                      {job.job_title}
                    </h3>
                    <div className="text-[12px] tracking-[0%] truncate leading-[15px] text-gray-500">
                      {job.company_name}, {job.job_location_name} -{" "}
                      {formatDistanceToNow(new Date(job.created_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{job.id.slice(0, 4)}...</TableCell>
              <TableCell>{job.total_applicants}</TableCell>
              <TableCell>
                {job.user.role == "recruiter" && job.user.name}
              </TableCell>
              <TableCell>{job.company_name}</TableCell>
              <TableCell className="">{job.end_date as any}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CurrentOpenings;
