import { File, ShoppingBag, User } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { totalmem } from "os";
const CurrentOpenings = ({
  setCurrentView,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const jobs = [
    {
      selection: "",
      title: "Front End Developer",
      id: "4930",
      totalApplicant: "10",
      recruiter: "Angel",
      company: "Candivet.com",
      endDate: "31/30/2021",
    },
    {
      selection: "",
      title: "Product Designer",
      id: "4930",
      totalApplicant: "10",
      recruiter: "Angel",
      company: "Candivet.com",
      endDate: "31/30/2021",
    },
    {
      selection: "",
      title: "IOSDeveloper",
      id: "4930",
      totalApplicant: "10",
      recruiter: "Angel",
      company: "Candivet.com",
      endDate: "31/30/2021",
    },
  ];

  const [stats, setStats] = React.useState([
    {
      title: "Total Job Posts",
      value: 12,
      icon: <ShoppingBag />,
    },
    {
      title: "Qualified Applicants",
      value: 12,
      icon: <User />,
    },
    {
      title: "Total Applicants",
      value: 300,
      icon: <File />,
    },
  ]);
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
          {jobs.map((job) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                setCurrentView("details");
              }}
              key={job.id}
            >
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell width={200} className="font-medium">
                {job.title}
              </TableCell>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.totalApplicant}</TableCell>
              <TableCell>{job.recruiter}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-end">{job.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CurrentOpenings;
