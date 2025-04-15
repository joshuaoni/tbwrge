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
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { MetricScore } from "../../../components/dashboard/vetting/metric-card";
import { outfit } from "@/constants/app";
import { Input } from "@/components/ui/input";

export type JobReportGeneratorResponse = JobReportGenerator[];

export interface JobReportGenerator {
  date_of_birth?: string;
  linkedin: string;
  current_position: string;
  current_company: string;
  professional_summary: string;
  years_of_experience: number;
  fit_score: string | null;
  skills_summary: string;
  strength: string;
  areas_for_development: string | null;
  culture_fit: string | null;
  languages: string;
  key_skills: string | null;
  candidate_name: string;
}

const Generator = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobAd, setJobAd] = useState("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [value, setValue] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
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
        jobAd,
        language,
        userData?.token as string
      );
      return response;
    },
  });
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
      <span className={`${outfit.className} font-bold text-xl`}>
        Candidate Report Generator
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here (up to 5 files)
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
                  Drag your file(s) or <span className="font-bold">browse</span>
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB files are allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only supports .pdf, .doc, .docx, and .txt
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
            <span className="font-bold">Paste Your Job description here</span>
            <div className="my-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Detailed Job Description"
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Want to customize your results?
                <span className="text-sm font-medium">
                  &#40;Add up to 20 prompts&#41;
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
              placeholder="Input Prompt"
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
                {" "}
                Select Output language
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={jobAd === "" || files.length === 0}
                variant="default"
                onClick={() => {
                  generateReportMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Report "
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 space-y-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Report Generator</span>
              <X size={20} />
            </div>
            <div className="border border-gray-100 p-6 rounded-lg">
              <h3 className="text-xl">
                {isSuccess && report[0].candidate_name}
              </h3>
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* profile Overview */}
                <div className=" border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] border rounded-xl p-4 space-y-4 h-full">
                  <div className="flex justify-between font-bold text-sm">
                    <h5 className="">Profile Overview</h5>
                    <h5>Fit Score</h5>
                  </div>
                  <div className="w-full flex justify-end">
                    <span className="bg-lightgreen text-white text-center font-bold w-14 h-14 p-4 flex items-center justify-center rounded-full">
                      {isSuccess ? report[0].fit_score ?? 0 : 0}%
                    </span>
                  </div>
                  <div className="space-y-4 text-xs">
                    {[
                      { title: "Email", value_key: "email" },
                      { title: "Phone", value_key: "phone" },
                      { title: "DOB", value_key: "date_of_birth" },
                      { title: "Linkedin", value_key: "linkedin" },
                      {
                        title: "Current Position",
                        value_key: "current_position",
                      },
                      { title: "Company", value_key: "current_company" },
                      { title: "Nationality", value_key: "nationality" },
                      { title: "Location", value_key: "country_of_residence" },
                    ].map(
                      (item, i) =>
                        isSuccess &&
                        report[0][
                          item.value_key as keyof JobReportGenerator
                        ] && (
                          <div
                            key={i}
                            className="w-full flex justify-between items-end border-b-[0.5px] border-lightgreen"
                          >
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            {isPending ? (
                              <span className="h-4 w-36 bg-[#E7E7E7] rounded-lg animate-pulse" />
                            ) : (
                              <span className="text-xs font-medium text-[#898989]">
                                {isSuccess
                                  ? report[0][
                                      item.value_key as keyof JobReportGenerator
                                    ]
                                  : "not set"}
                              </span>
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>

                {/* profile summary */}
                <div className=" border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] border rounded-xl p-4 space-y-6 h-full">
                  <h5 className="font-bold">Professional Summary</h5>
                  <p className="text-[#898989]">
                    {isSuccess
                      ? report[0].professional_summary
                      : "not available"}
                  </p>
                </div>

                {/* ai powered insights */}
                <div className=" border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] border rounded-xl p-4 h-full overflow-y-scroll">
                  <h5 className="font-bold">AI Powered Insights</h5>
                  {isSuccess
                    ? [
                        { title: "Strengths", value: report[0].strength },
                        {
                          title: "Skills Summary",
                          value: report[0].skills_summary,
                        },
                        {
                          title: "Areas For Development",
                          value: report[0].areas_for_development,
                        },
                      ].map(
                        (item, i) =>
                          isSuccess &&
                          item.value !== null && (
                            <div key={i} className="flex flex-col mt-3 text-sm">
                              <span className="font-bold">{item.title}</span>
                              <p className="text-[#898989]">{item.value}</p>
                            </div>
                          )
                      )
                    : "not available"}
                </div>

                {/* metric scores */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "Relevance", score: 0 },
                    { metric: "Perfomance", score: 0 },
                    { metric: "Perfomance", score: 0 },
                    { metric: "Perfomance", score: 0 },
                  ].map((item, i) => (
                    <MetricScore
                      key={i}
                      Metric={item.metric}
                      Score={item.score}
                      size={{
                        className: "py-3 items-center",
                        iconSize: 24,
                        metricClass: "text-base",
                        scoreClass: "text-2xl",
                      }}
                    />
                  ))}
                </div>

                <div className="col-span-2 border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] border rounded-xl p-4">
                  <div className="flex justify-between">
                    <h6 className="font-bold">Supporting Documents</h6>
                    <a href="#" className="font-medium">
                      Portfolio Link
                    </a>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="border border-[#E7E7E7] px-4 py-2 rounded-2xl flex flex-col  gap-2">
                      <div className="flex justify-between gap-4">
                        <Image
                          src="/microphone.svg"
                          alt="mic"
                          width={14}
                          height={14}
                        />
                        <span className="font-medium text-xs">
                          Candiate Application voice note
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <div className="flex">
                          {[...new Array(10)].map(() => (
                            <Image
                              src="/wave-sound.png"
                              width={12}
                              height={12}
                              alt="wave sound"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">3:04</span>
                      </div>
                    </div>

                    {[
                      { fileName: "not set", fileSize: 500 },
                      { fileName: "not set", fileSize: 500 },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="border border-[#E7E7E7] px-4 py-2 rounded-2xl flex items-center gap-2"
                      >
                        <Image
                          src="/images/pdf-icon.png"
                          alt="pdf icon"
                          width={24}
                          height={24}
                        />
                        <div className="grid gap-0.5">
                          <button
                            onClick={() => {}}
                            className="font-semibold text-[#0B0B0B] text-sm cursor-pointer hover:underline"
                          >
                            {item.fileName?.split("/").pop()}
                          </button>
                          <span className="text-[#6D6D6D] text-xs">
                            {item.fileSize}kb
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Generator;
