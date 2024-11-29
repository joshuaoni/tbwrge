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
const CurrentOpenings = () => {
  const invoices = [
    {
      selection: "",
      title: "Front End Developer",
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">Job Title</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Total Applicants</TableHead>
            <TableHead>Recruiter</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell width={300} className="font-medium">
                {invoice.title}
              </TableCell>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.totalApplicant}</TableCell>
              <TableCell>{invoice.recruiter}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell className="text-end">{invoice.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CurrentOpenings;
