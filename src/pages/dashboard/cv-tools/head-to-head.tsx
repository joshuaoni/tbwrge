import { headToHead } from "@/actions/cv-tools/head-to-head";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inter, outfit } from "@/constants/app";
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [jobDescription, setJobDescription] = useState("");
  const { userData } = useUserStore();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 2) {
      alert(t("cvTools.common.maxFilesError", { max: 2 }));
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
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("cvTools.headToHead.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold text-sm">
              {t("cvTools.common.cvUpload")}
            </span>
            <span className="font-light text-sm">
              {t("cvTools.common.cvUploadDescription2Files")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 text-sm"
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
                  {t("cvTools.common.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("cvTools.common.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("cvTools.common.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("cvTools.common.supportedFormats")}
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
            <span className="font-bold text-sm">
              {t("cvTools.common.jobDescriptionTitle")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t("cvTools.common.jobDescriptionPlaceholder")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Prompts Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">
                {t("cvTools.common.customizeResults")}{" "}
                <span className="text-sm font-medium">
                  {t("cvTools.common.addPrompts")}
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
              placeholder={t("cvTools.common.inputPrompt")}
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

          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("cvTools.common.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={files.length === 0 || jobDescription === ""}
                variant="default"
                onClick={() => {
                  headToHeadMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("cvTools.headToHead.generateReport")
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] min-h-[200px] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("cvTools.headToHead.resultTitle")}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4  h-full mt-4">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess &&
                Object.keys(
                  includeKeys(H2H.candidates_info[0], [
                    "overall_score",
                    "relevance_of_experience",
                    "skills_alignment",
                    "educational_background",
                    "industry_experience",
                    "project_portfolio_quality",
                    "certifications",
                    "soft_skills",
                    "technical_competencies",
                    "career_progression",
                    "cultural_fit",
                    "accomplishments_and_impact",
                    "longevity_and_stability",
                  ])
                ).map((item, i) => (
                  <div
                    key={i}
                    className={classNames(
                      "flex items-center gap-6 px-6 py-6 min-w-96 bg-[#065844] text-white rounded-xl min-h-[140px]",
                      outfit.className,
                      item === "overall_score" ? "bg-[#009379]" : "bg-[#065844]"
                    )}
                  >
                    <div className="w-[100px] flex justify-end">
                      <span className="w-[70px] h-[70px] flex items-center justify-center p-3 rounded-full border border-white/50">
                        <TbCircles
                          size={32}
                          color="white"
                          className="rotate-12"
                        />
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                      <span className={`${inter.className} text-sm capitalize`}>
                        {item.replaceAll("_", " ")}
                      </span>
                      <div className="flex gap-8">
                        {H2H.candidates_info.map((cand, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <p className="text-[#747474] text-sm">
                              {cand.candidate_name}
                            </p>
                            <p className="font-bold text-3xl leading-none">
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
