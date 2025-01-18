import { generateCandidateReport } from "@/actions/job-tools/candidate-rep-gen";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { fileSizeToMb } from "@/lib/common";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { MetricScore } from "../cv-tools/vetting/metric-card";

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
      <span className="font-bold text-xl">Candidate report Generator</span>
      <section className="flex h-screen space-x-4">
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here (up to 5 files)
            </span>
            <div className="relative w-full px-4 mt-3 flex flex-col items-start">
              <input
                multiple
                onChange={handleFileChange}
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="outline-dotted flex flex-col space-y-3 cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px]">
                <Image
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-10 h-10"
                />
                <span>
                  Drag your file(s) or <span className="font-bold">browse</span>
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB per file is allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only supports .pdf, .word, and .txt files
              </span>
            </div>

            {/* Uploaded Files */}
            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 border rounded-lg justify-between items-center"
              >
                <div className="flex items-start">
                  <Image src={pdfIcon} alt="File Icon" className="w-10 h-10" />
                  <div className="flex flex-col ml-2">
                    <span className="text-sm text-black">{file.name}</span>
                    <span className="text-sm text-textgray">
                      {fileSizeToMb(file.size)} MB
                    </span>
                  </div>
                </div>
                <CircleXIcon
                  onClick={() => removeFile(index)}
                  className="cursor-pointer"
                  size={18}
                />
              </div>
            ))}
          </div>
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">Input Job Ad</span>
            </div>
            <Textarea
              placeholder="Input Prompt"
              value={jobAd}
              className="my-3 bg-white"
              onChange={(e) => setJobAd(e.target.value)}
            />
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
          <div className="rounded-xl shadow-xl h-fit mt-4 space-y-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Candidate report Generator</span>
              <X size={20} />
            </div>
            <div>
              <h3 className="text-xl">
                {isSuccess && report[0].candidate_name}
              </h3>
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* profile Overview */}
                <div className="shadow-lg border rounded-xl p-4 space-y-4 h-full">
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
                <div className="shadow-lg border rounded-xl p-4 space-y-6 h-full">
                  <h5 className="font-bold">Professional Summary</h5>
                  <p className="text-[#898989]">
                    {isSuccess
                      ? report[0].professional_summary
                      : "not available"}
                  </p>
                </div>

                {/* ai powered insights */}
                <div className="shadow-lg border rounded-xl p-4 h-full overflow-y-scroll">
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
                    { metric: "Relevance", score: 10 },
                    { metric: "Perfomance", score: 20 },
                    { metric: "Perfomance", score: 20 },
                    { metric: "Perfomance", score: 20 },
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

                <div className="col-span-2 shadow-lg border rounded-xl p-4">
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
