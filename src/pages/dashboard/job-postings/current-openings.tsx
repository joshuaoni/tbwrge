import { File, ShoppingBag, User } from "lucide-react";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobOpenings } from "@/actions/get-current-jobs";
import { useUserStore } from "@/hooks/use-user-store";
import { IJob } from "@/interfaces/job";
const CurrentOpenings = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { userData } = useUserStore();
  const { data: jobs, error } = useQuery({
    queryKey: ["job-openings"],
    queryFn: async () => {
      const response = await getJobOpenings({
        status: "open",
        token: userData?.token,
      });
      console.log("the current openings is", response);
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
    setStats((stat) => [
      {
        title: "Total Job Posts",
        value: jobs?.length,
        icon: <ShoppingBag />,
      },
      {
        title: "Qualified Applicants",
        value: 12,
        icon: <User />,
      },
      {
        title: "Total Applicants",
        value: jobs?.reduce((acc: number, job: IJob) => {
          return acc + job.total_applicants;
        }, 0),
        icon: <File />,
      },
    ]);
  }, [jobs]);
  return (
    <section>
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

      <Table className="mt-12">
        <TableHeader>
          <TableRow className="bg-[#D6D6D6] rounded-lg ">
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
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                setCurrentView("details");
              }}
              key={job.id}
            >
              <TableCell>
                <input type="checkbox" onClick={(e) => e.stopPropagation()} />
              </TableCell>
              <TableCell width={200} className="font-medium">
                {job.job_title}
              </TableCell>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.total_applicants}</TableCell>
              <TableCell>
                {job.user.role == "recruiter" && job.user.name}
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

export default CurrentOpenings;
