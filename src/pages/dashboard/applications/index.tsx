"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { outfit } from "@/constants/app";
import { useUserStore } from "@/hooks/use-user-store";
import DashboardWrapper from "@/components/dashboard-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppliedJobs, AppliedJob } from "@/actions/get-applied-jobs";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 25;

const ApplicationsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { userData } = useUserStore();
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!userData?.token) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await getAppliedJobs(userData.token, currentPage);
        setJobs(response);
        // If we get exactly ITEMS_PER_PAGE items, there might be more
        setHasMore(response.length === ITEMS_PER_PAGE);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch applications"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [userData?.token, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardWrapper>
    );
  }

  if (error) {
    return (
      <DashboardWrapper>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardWrapper>
    );
  }

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} w-full mx-auto`}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold">{t("applications.title")}</h1>
          {/* <div className="text-sm text-gray-500">
            {t("applications.showingApplications", { count: jobs.length })}
          </div> */}
        </div>

        <Table className="mt-2">
          <TableHeader className="h-[39.292px] mb-4">
            <TableRow className="bg-[#D6D6D6]">
              <TableHead className="w-[25%] text-[#898989] h-[39.292px] first:rounded-l-[7.76px]">
                {t("jobBoard.jobTitle")}
              </TableHead>
              <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
                {t("applications.applicationId")}
              </TableHead>
              <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
                {t("jobs.status")}
              </TableHead>
              <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
                {t("applications.appliedDate")}
              </TableHead>
              <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
                {t("applications.company")}
              </TableHead>
              <TableHead className="w-[15%] text-[#898989] h-[39.292px] last:rounded-r-[7.76px]">
                {t("applications.fitScore")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.map((job) => (
              <TableRow
                className="cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
                onClick={() =>
                  router.push(`/dashboard/applications/${job.job.id}`)
                }
                key={job.id}
              >
                <TableCell>
                  <div className="flex gap-[10px] items-center justify-center bg-[#F9F9F9] py-[5px] rounded-[6px]">
                    <div className="flex items-center justify-center w-[35px] ml-[6px]">
                      {job.job.company_logo ? (
                        <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                          <Image
                            src={job.job.company_logo}
                            alt={job.job.job_title || ""}
                            width={35}
                            height={35}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-[35px] h-[35px] bg-slate-300 rounded-full flex items-center justify-center">
                          <p className="text-white font-medium">
                            {job.job.company_name?.[0]}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-[217px] gap-[4px]">
                      <h3 className="font-medium tracking-[0%] truncate text-[14px] leading-[15px] text-black">
                        {job.job.job_title}
                      </h3>
                      <div className="text-[12px] tracking-[0%] truncate leading-[15px] text-gray-500">
                        {job.job.company_name}, {job.job.job_location_name} -{" "}
                        {formatDistanceToNow(new Date(job.created_at), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{job.id.slice(0, 4)}...</TableCell>
                <TableCell>
                  <span
                    style={
                      job.status === "rejected"
                        ? { background: "#fde2e1" }
                        : { background: "fff" }
                    }
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : job.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : job.status === "shortlisted"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(`jobBoard.${job.status}`) ||
                      job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(job.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>{job.job.company_name}</TableCell>
                <TableCell>{job.fit_score}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              {t("applications.noApplicationsFound")}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("jobBoard.previous")}
          </button>
          <div className="text-sm text-gray-700">
            {t("applications.page")} {currentPage + 1}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasMore}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("jobBoard.next")}
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ApplicationsPage;
