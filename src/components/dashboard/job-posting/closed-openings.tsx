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
import { File, ShoppingBag, User } from "lucide-react";
import React, { useEffect } from "react";

const ClosedOpenings = () => {
  const { userData } = useUserStore();
  const [selectedJobs, setSelectedJobs] = React.useState<IJob[]>([]);
  const { data: jobs, error } = useQuery({
    queryKey: ["job-closed"],
    queryFn: async () => {
      const response = await getJobOpenings({
        status: "close",
        token: userData?.token,
      });
      console.log("the closed openings is", response);
      return response;
    },
  });
  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await getDashboardStats({
        token: userData?.token,
      });
      return response;
    },
  });
  const [stats, setStats] = React.useState([
    {
      title: "Total Job Posts",
      value: 0,
      icon: <ShoppingBag />,
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
        icon: <ShoppingBag />,
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
    <section className="">
      <div className="flex items-center space-x-8">
        {stats.map((stat, index) => (
          <div className="shadow-md rounded-2xl  justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-sm font-light ">{stat.title}</span>
            </div>
            <h1 className="text-2xl font-bold mt-4">{stat.value}</h1>
          </div>
        ))}
      </div>
      <BulkActionsJobsPopUp
        jobIds={selectedJobs.map((job) => job.id)}
        status="closed"
      />
      <Table className="mt-12">
        <TableHeader>
          <TableRow className="bg-[#D6D6D6] rounded-lg">
            <TableHead className="w-[100px] text-[#898989]" />
            <TableHead className="w-[100px] text-[#898989]">
              Job Title
            </TableHead>
            <TableHead className="text-[#898989]">Job ID</TableHead>
            <TableHead className="text-[#898989]">Total Applicants</TableHead>
            <TableHead className="text-[#898989]">Recruiter</TableHead>
            <TableHead className="text-[#898989]">Company</TableHead>
            <TableHead className="text-right text-[#898989]">
              End Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job: IJob) => (
            <TableRow key={job.id}>
              <TableCell>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(),
                      setSelectedJobs([...selectedJobs, job]);
                  }}
                />
              </TableCell>
              <TableCell width={200} className="font-medium">
                {job.job_title}
              </TableCell>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.total_applicants}</TableCell>
              <TableCell>
                {job.user.role === "recruiter" && job.user.name}
              </TableCell>
              <TableCell>{job.company_name}</TableCell>
              <TableCell className="text-end">{job.end_date as any}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ClosedOpenings;
