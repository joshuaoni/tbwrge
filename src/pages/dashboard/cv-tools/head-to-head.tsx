import { headToHead } from "@/actions/cv-tools/head-to-head";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inter } from "@/constants/app";
import { useUserStore } from "@/hooks/use-user-store";
import { includeKeys } from "@/lib/common";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { CircleXIcon, Loader2, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { TbCircles } from "react-icons/tb";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";

interface CandidateInfo {
  relevance_of_experience: number;
  skills_alignment: number;
  educational_background: number;
  industry_experience: number;
  project_portfolio_quality: number;
  certifications: number;
  soft_skills: number;
  technical_competencies: number;
  career_progression: number;
  cultural_fit: number;
  accomplishments_and_impact: number;
  longevity_and_stability: number;
  summary: string;
  overall_score: number;
  candidate_name: string;
}

interface ReportData {
  candidates_info: CandidateInfo[];
}

const HeadToHead = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [jobDescription, setJobDescription] = useState("");
  const { userData } = useUserStore();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 2) {
      alert("You can only upload up to 2 files.");
      return;
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
  };
  const {
    mutate: headToHeadMutation,
    data: H2H,
    isPending,
    isSuccess,
  } = useMutation<ReportData>({
    mutationKey: ["summarizeCV"],
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

      const response = await headToHead(
        files,
        language,
        userData?.token as string,
        prompts,
        jobDescription
      );
      return response;
    },
  });
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Head to Head</span>
      <section className="flex h-screen space-x-4">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here, and you can upload up to 2 files max
            </span>
            <div className="relative w-full px-4 mt-3 flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
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

            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-center">
                  <Image
                    className="w-8 h-8 mr-2 object-cover"
                    src={pdfIcon}
                    alt="PDF Icon"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-black">{file.name}</span>
                    <span className="text-sm text-textgray">
                      {(file.size / (1024 * 1024)).toFixed(2) + "MB"}
                    </span>
                  </div>
                </div>
                <CircleXIcon
                  onClick={() => removeFile(index)}
                  color="black"
                  size={14}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Post Job Ad</span>
            <Textarea
              placeholder="Input Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="my-3 bg-white border"
            />
          </div>

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Prompts{" "}
                <span className="text-sm font-medium">
                  (Add up to 20 prompts)
                </span>
              </span>
              <Plus
                className="cursor-pointer"
                onClick={() => {
                  if (prompts.length < 20) {
                    setPrompts((prev) => [...prev, value]);
                    setValue("");
                  } else {
                    alert("You can add a maximum of 20 prompts.");
                  }
                }}
              />
            </div>
            <Input
              placeholder="Input Prompt"
              value={value}
              className="my-3"
              onChange={(e) => setValue(e.target.value)}
            />
            <div>
              {prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="flex justify-between my-2 items-center"
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

          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
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
                disabled={files.length === 0}
                variant="default"
                onClick={() => {
                  headToHeadMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Report"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] min-h-[200px] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Head To Head</span>
              <X size={20} />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 h-full mt-4">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess &&
                Object.keys(
                  includeKeys(H2H.candidates_info[0], [
                    "relevance_of_experience",
                    "educational_background",
                    "industry_experience",
                    "skills_alignment",
                  ])
                ).map((item, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "flex items-center gap-6 px-5 py-4 min-w-96 bg-[#065844] text-white rounded-xl",
                      inter.className
                    )}
                  >
                    <span className="w-fit h-fit p-3 rounded-full border border-white">
                      <TbCircles
                        size={32}
                        color="white"
                        className="rotate-12"
                      />
                    </span>

                    <div className="flex flex-col gap-6">
                      <span className="text-xl capitalize">
                        {item.replaceAll("_", " ")}
                      </span>
                      <div className="flex gap-6">
                        {H2H.candidates_info.map((cand, i) => (
                          <div key={i} className="space-y-2">
                            <p className="text-[#EBEBEB]">
                              {cand.candidate_name}
                            </p>
                            <p className="font-bold text-4xl">
                              {cand[item as keyof CandidateInfo]}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default HeadToHead;
