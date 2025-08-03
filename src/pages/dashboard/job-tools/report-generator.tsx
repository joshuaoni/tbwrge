import { generateCandidateReport } from "@/actions/job-tools/candidate-rep-gen";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { fileSizeToMb } from "@/lib/common";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { outfit } from "@/constants/app";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { getJobDetail } from "@/actions/get-job-detail";
import { getApplicationItem } from "@/actions/get-application-item";
import { toast } from "react-hot-toast";
import { PaymentRequiredModal } from "@/components/ui/payment-required-modal";

export type JobReportGeneratorResponse = JobReportGenerator[];

export interface JobReportGenerator {
  date_of_birth?: string;
  linkedin: string;
  current_position: string;
  current_company: string;
  professional_summary: string;
  years_of_experience: number;
  fit_score: string | null;
  culture_fit_score: string | null;
  skills_summary: string;
  strength: string;
  areas_for_development: string | null;
  culture_fit: string | null;
  languages: string;
  key_skills: string | null;
  candidate_name: string;
  grammer: string;
  relevance: string;
}

const Generator = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [jobAd, setJobAd] = useState("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [value, setValue] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { userData } = useUserStore();
  const {
    mutate: generateReportMutation,
    data: report,
    isPending,
    isSuccess,
  } = useMutation<JobReportGeneratorResponse>({
    mutationKey: ["generateCV"],
    mutationFn: async () => {
      let language: string = "en";
      if (selectedLanguage === "English") {
        language = "en";
      } else if (selectedLanguage === "French") {
        language = "fr";
      } else if (selectedLanguage === "Spanish") {
        language = "es";
      } else if (selectedLanguage === "German") {
        language = "de";
      } else if (selectedLanguage === "Arabic") {
        language = "ar";
      } else if (selectedLanguage === "Portugese") {
        language = "pt";
      }

      const response = await generateCandidateReport(
        files,
        jobDescription,
        language,
        prompts,
        userData?.token as string
      );
      return response;
    },
    onError: (error: any) => {
      if (error.message === "PAYMENT_REQUIRED") {
        setShowPaymentModal(true);
      } else {
        toast.error(
          error.message ||
            "An error occurred while generating the candidate report"
        );
      }
    },
  });

  // Function to strip HTML tags from text
  const stripHtmlTags = (html: string): string => {
    // Create a temporary div element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Get the text content without HTML tags
    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Clean up extra whitespace and line breaks
    textContent = textContent
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, "\n") // Replace multiple line breaks with single line break
      .trim(); // Remove leading/trailing whitespace

    return textContent;
  };

  // Check for query parameters and pre-populate form
  useEffect(() => {
    const { candidateId, jobId, cvUrl, coverLetterUrl, applicantName } =
      router.query;

    if (candidateId && jobId && userData?.token) {
      setIsLoadingData(true);
      populateFormWithCandidateData(
        candidateId as string,
        jobId as string,
        cvUrl as string,
        coverLetterUrl as string
      );
    }
  }, [router.query, userData?.token]);

  const populateFormWithCandidateData = async (
    candidateId: string,
    jobId: string,
    cvUrl: string,
    coverLetterUrl: string
  ) => {
    try {
      let hasData = false;

      // Fetch job details to get job description
      if (jobId && userData?.token) {
        const jobDetails = await getJobDetail({
          job_id: jobId,
          token: userData.token,
        });
        if (jobDetails.job_description) {
          // Strip HTML tags from job description before setting it
          const cleanJobDescription = stripHtmlTags(jobDetails.job_description);
          setJobDescription(cleanJobDescription);
          hasData = true;
        }
      }

      // Convert CV URL to File object if available
      if (cvUrl) {
        await fetchFileFromUrl(cvUrl, "cv.pdf");
        hasData = true;
      }

      // Convert Cover Letter URL to File object if available
      if (coverLetterUrl) {
        await fetchFileFromUrl(coverLetterUrl, "cover_letter.pdf");
        hasData = true;
      }

      if (hasData) {
        toast.success(t("jobTools.reportGenerator.toastLoadSuccess"));
      }
    } catch (error) {
      console.error("Error populating form with candidate data:", error);
      toast.error(t("jobTools.reportGenerator.toastLoadError"));
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchFileFromUrl = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: blob.type });
      setFiles((prev) => [...prev, file]);
    } catch (error) {
      console.error(`Error fetching file from ${url}:`, error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).slice(
        0,
        5 - files.length
      ); // Limit to 5 files
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("jobTools.reportGenerator.title")}
      </span>

      {isLoadingData && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="animate-spin mr-2" />
          <span>{t("jobTools.reportGenerator.loadingCandidateData")}</span>
        </div>
      )}

      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.reportGenerator.documentUpload")}
            </span>
            <span className="font-light text-sm">
              {t("jobTools.reportGenerator.addDocuments")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                multiple
                onChange={handleFileChange}
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="relative flex flex-col space-y-3 cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px] z-0"
                style={{
                  borderRadius: "12px",
                  border: "none",
                  background: "white",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23285C44' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                }}
              >
                <Image
                  className="w-fit h-8 object-cover"
                  src={uploadIcon}
                  alt="Upload Icon"
                />
                <span>
                  {t("jobTools.reportGenerator.dragFiles")}
                  <span className="font-bold">
                    {t("jobTools.reportGenerator.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("jobTools.reportGenerator.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("jobTools.reportGenerator.supportedFormats")}
              </span>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                {files.map((file, index) => {
                  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
                  return (
                    <div
                      key={index}
                      className="flex h-14 w-full px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
                    >
                      <div className="flex items-center">
                        <Image
                          className="w-8 h-8 mr-2 object-cover"
                          src={pdfIcon}
                          alt="File Icon"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm text-black">
                            {file.name}
                          </span>
                          <span className="text-sm text-textgray">
                            {fileSizeInMB} MB
                          </span>
                        </div>
                      </div>
                      <CircleXIcon
                        onClick={() => removeFile(index)}
                        color="black"
                        size={14}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.reportGenerator.pasteJobDescription")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t(
                  "jobTools.reportGenerator.detailedJobDescription"
                )}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                {t("jobTools.reportGenerator.customizeResults")}
                <span className="text-sm font-medium">
                  {" "}
                  {t("jobTools.reportGenerator.addUpTo")} 20{" "}
                  {t("jobTools.reportGenerator.prompts")}
                </span>
              </span>
              <Plus
                className="cursor-pointer"
                onClick={() => {
                  if (value && prompts.length < 20) {
                    setPrompts((prev) => [...prev, value]);
                    setValue("");
                  }
                }}
              />
            </div>
            <Input
              placeholder={t("jobTools.reportGenerator.inputPrompt")}
              value={value}
              className="my-3 bg-[#F8F9FF]"
              onChange={(e) => setValue(e.target.value)}
            />

            <div>
              {prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="flex justify-between my-2 bg-gray-50 p-2 rounded-lg"
                >
                  <span>{prompt}</span>
                  <Trash
                    className="cursor-pointer"
                    onClick={() =>
                      setPrompts((prev) => prev.filter((_, i) => i !== index))
                    }
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Translate Button */}
          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("jobTools.reportGenerator.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={jobDescription === "" || files.length === 0}
                variant="default"
                onClick={() => {
                  generateReportMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("jobTools.reportGenerator.generateReport")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 space-y-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">
                {t("jobTools.reportGenerator.reportGenerator")}
              </span>
            </div>
            <div className="">
              <h3 className="text-xl">
                {isSuccess ? report[0].candidate_name : ""}
              </h3>
              {isPending ? (
                <div className="animate-pulse space-y-4 mt-4">
                  {/* Name skeleton */}
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>

                  {/* First row skeletons */}
                  <div className="flex space-x-6">
                    <div className="w-1/2 h-[200px] bg-gray-200 rounded-lg"></div>
                    <div className="w-1/2 h-[200px] bg-gray-200 rounded-lg"></div>
                  </div>

                  {/* Second row skeletons */}
                  <div className="flex space-x-6">
                    <div className="w-1/2 h-[250px] bg-gray-200 rounded-lg"></div>
                    <div className="w-1/2 grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-[120px] bg-gray-200 rounded-lg"
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Supporting documents skeleton */}
                  <div className="h-[100px] bg-gray-200 rounded-lg"></div>
                </div>
              ) : isSuccess ? (
                <div className="flex flex-col space-y-6 h-full mt-4">
                  <div className="flex space-x-6">
                    {/* Profile Overview */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] w-1/2">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-[12px] font-semibold">
                          Profile Overview
                        </h2>
                        <div className="flex flex-col items-center gap-2">
                          <h2 className="text-[12px] font-semibold">
                            Fit Score
                          </h2>
                          <div className="flex items-center justify-center">
                            <div className="relative w-16 h-16">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[16px] font-bold text-[#009379]">
                                  {isSuccess ? report[0].fit_score ?? 0 : 0}%
                                </span>
                              </div>
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 36 36"
                              >
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#E5E7EB"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#009379"
                                  strokeWidth="3"
                                  strokeDasharray={`${
                                    isSuccess ? report[0].fit_score ?? 0 : 0
                                  }, 100`}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { title: "Email", value_key: "email" },
                          { title: "Phone", value_key: "phone" },
                          { title: "DOB", value_key: "date_of_birth" },
                          { title: "LinkedIn", value_key: "linkedin" },
                          {
                            title: "Current Position",
                            value_key: "current_position",
                          },
                          { title: "Company", value_key: "current_company" },
                          { title: "Nationality", value_key: "nationality" },
                          {
                            title: "Location",
                            value_key: "location",
                          },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] text-black">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {isSuccess &&
                                report[0][
                                  item.value_key as keyof JobReportGenerator
                                ]
                                  ? report[0][
                                      item.value_key as keyof JobReportGenerator
                                    ]
                                  : "Not provided"}
                              </p>
                            </div>
                            <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Profile Summary */}
                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] w-1/2">
                      <h2 className="text-[12px] font-semibold mb-4">
                        Professional Summary
                      </h2>
                      <p className="text-[10px] text-gray-600 leading-relaxed">
                        {isSuccess
                          ? report[0].professional_summary
                          : "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    {/* AI-Powered Insights */}
                    <div className="flex w-full gap-6">
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] w-1/2">
                        <h2 className="text-[12px] font-semibold mb-4">
                          AI-Powered Insights
                        </h2>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-[10px] font-medium mb-2">
                              Key Skills
                            </h3>
                            <p className="text-[10px] text-gray-600">
                              {isSuccess
                                ? report[0].key_skills
                                : "Not available"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-[10px] font-medium mb-2">
                              Strengths
                            </h3>
                            <p className="text-[10px] text-gray-600">
                              {isSuccess ? report[0].strength : "Not available"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-[10px] font-medium mb-2">
                              Areas for Development
                            </h3>
                            <p className="text-[10px] text-gray-600">
                              {isSuccess
                                ? report[0].areas_for_development
                                : "Not available"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-[10px] font-medium mb-2">
                              Culture Fit Indicators
                            </h3>
                            <p className="text-[10px] text-gray-600">
                              {isSuccess
                                ? report[0].culture_fit
                                : "Not available"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-[10px] font-medium mb-2">
                              Languages
                            </h3>
                            <p className="text-[10px] text-gray-600">
                              {isSuccess
                                ? report[0].languages
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Score Cards */}
                      <div className="w-1/2 grid grid-cols-2 gap-4">
                        <div className="bg-[#004D40] text-white rounded-lg p-4 flex flex-col items-center">
                          <div className="rounded-full border border-white/20 p-2 mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                          </div>
                          <span className="text-xs mb-1">Relevance</span>
                          <span className="text-xl font-semibold">
                            {isSuccess
                              ? `${report[0].relevance}%`
                              : "Not available"}
                          </span>
                        </div>

                        <div className="bg-[#00C853] text-white rounded-lg p-4 flex flex-col items-center">
                          <div className="rounded-full border border-white/20 p-2 mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </div>
                          <span className="text-xs mb-1">Skills</span>
                          <span className="text-xl font-semibold">
                            {isSuccess
                              ? `${report[0].key_skills}%`
                              : "Not available"}
                          </span>
                        </div>

                        <div className="bg-[#2E7D32] text-white rounded-lg p-4 flex flex-col items-center">
                          <div className="rounded-full border border-white/20 p-2 mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                          </div>
                          <span className="text-xs mb-1">Grammar</span>
                          <span className="text-xl font-semibold">
                            {isSuccess
                              ? `${report[0].grammer}%`
                              : "Not available"}
                          </span>
                        </div>

                        <div className="bg-[#1B5E20] text-white rounded-lg p-4 flex flex-col items-center">
                          <div className="rounded-full border border-white/20 p-2 mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                          </div>
                          <span className="text-xs mb-1">Culture Fit</span>
                          <span className="text-xl font-semibold">
                            {isSuccess
                              ? `${report[0].culture_fit_score}%`
                              : "Not available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {/* Payment Required Modal */}
      <PaymentRequiredModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        featureName={t("jobTools.reportGenerator.title")}
        featureDescription="Upgrade your plan to unlock this powerful tool and generate comprehensive candidate reports with AI-powered insights."
      />
    </DashboardWrapper>
  );
};

export default Generator;
