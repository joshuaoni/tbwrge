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
import { BriefcaseBusiness, File, ShoppingBag, User, Code } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const CurrentOpenings = ({
  setCurrentView,
  setSelectedJob,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const { t } = useTranslation();
  const { userData } = useUserStore();
  const router = useRouter();
  const [selectedJobs, setSelectedJobs] = React.useState<IJob[]>([]);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [jobsToEmbed, setJobsToEmbed] = useState<string[]>([]);
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
      title: t("jobPostings.stats.totalJobPosts"),
      value: 0,
      icon: <BriefcaseBusiness size={20} className="text-primary" />,
    },
    {
      title: t("jobPostings.stats.qualifiedApplicants"),
      value: 0,
      icon: <User />,
    },
    {
      title: t("jobPostings.stats.totalApplicants"),
      value: 0,
      icon: <File />,
    },
  ]);
  useEffect(() => {
    setStats(() => [
      {
        title: t("jobPostings.stats.totalJobPosts"),
        value: data?.total_job_posts,
        icon: <BriefcaseBusiness size={20} className="text-primary" />,
      },
      {
        title: t("jobPostings.stats.qualifiedApplicants"),
        value: data?.qualified_candidates,
        icon: <User />,
      },
      {
        title: t("jobPostings.stats.totalApplicants"),
        value: data?.total_applications,
        icon: <File />,
      },
    ]);
  }, [data, t]);

  const handleJobSelection = (jobId: string, isSelected: boolean) => {
    if (isSelected) {
      setJobsToEmbed((prev) => [...prev, jobId]);
    } else {
      setJobsToEmbed((prev) => prev.filter((id) => id !== jobId));
    }
  };

  const generateEmbedCode = () => {
    if (jobsToEmbed.length === 0) {
      toast.error(t("jobPostings.embed.pleaseSelectJob"));
      return;
    }

    const jobIds = jobsToEmbed.join(",");
    console.log({ jobIds });
    const embedUrl = `${window.location.origin}/embedded-jobs?jobs=${jobIds}`;
    const embedCode = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="600" src="${embedUrl}"></iframe>`;

    navigator.clipboard.writeText(embedCode);
    toast.success(t("jobPostings.embed.embedCodeCopied"));
    setShowEmbedDialog(false);
    setJobsToEmbed([]);
  };

  return (
    <section>
      <div className="flex items-center space-x-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="shadow-[0px_4px_50px_rgba(0,0,0,0.2)] rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-full md:w-80"
          >
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-sm font-light ">{stat.title}</span>
            </div>
            <h1 className="text-2xl font-bold mt-4">{stat.value}</h1>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          {/* <BulkActionsJobsPopUp
            jobIds={selectedJobs.map((job) => job.id)}
            status="open"
          /> */}
        </div>
        <Button
          onClick={() => setShowEmbedDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        >
          <Code size={16} />
          {t("jobPostings.embed.embedJobs")}
        </Button>
      </div>

      <Table className="mt-2">
        <TableHeader className="h-[39.292px] mb-4">
          <TableRow className="bg-[#D6D6D6]">
            <TableHead className="w-[50px] text-[#898989] h-[39.292px] first:rounded-l-[7.76px]" />
            <TableHead className="w-[25%] text-[#898989] h-[39.292px]">
              {t("jobPostings.table.jobTitle")}
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              {t("jobPostings.table.jobId")}
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              {t("jobPostings.table.totalApplicants")}
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              {t("jobPostings.table.recruiter")}
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
              {t("jobPostings.table.company")}
            </TableHead>
            <TableHead className="w-[15%] text-[#898989] h-[39.292px] last:rounded-r-[7.76px]">
              {t("jobPostings.table.endDate")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job: IJob) => (
            <TableRow
              className="cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
              onClick={() => {
                setSelectedJob(job);
                router.push(
                  `/dashboard/job-postings?jobId=${job.id}&view=details`
                );
                setCurrentView("details");
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

      {/* Embed Jobs Dialog */}
      <Dialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog}>
        <DialogContent className="bg-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t("jobPostings.embed.selectJobsToEmbed")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-600">
              {t("jobPostings.embed.selectJobsDescription")}
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {jobs?.map((job: IJob) => (
                <div
                  key={job.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={jobsToEmbed.includes(job.id)}
                    onChange={(e) =>
                      handleJobSelection(job.id, e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    {job.company_logo ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={job.company_logo}
                          alt={job.job_title || ""}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {job.company_name?.[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{job.job_title}</h4>
                      <p className="text-xs text-gray-500">
                        {job.company_name} • {job.job_location_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {t("jobPostings.embed.selected")}: {jobsToEmbed.length}{" "}
                {jobsToEmbed.length !== 1
                  ? t("jobPostings.embed.jobs")
                  : t("jobPostings.embed.job")}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEmbedDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
                >
                  {t("jobPostings.embed.cancel")}
                </button>
                <button
                  onClick={generateEmbedCode}
                  className="px-6 py-2 bg-[#009379] hover:bg-[#007a66] text-white rounded-lg transition-colors duration-200 font-medium shadow-sm"
                >
                  {t("jobPostings.embed.generateEmbedCode")}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CurrentOpenings;
