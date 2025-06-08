import { vetCoverLetter } from "@/actions/cover-letter-tools/vet-cover-letter";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { MetricCardsLoading } from "../../../components/dashboard/vetting/metric-card";
import VettingWrapper from "../../../components/dashboard/vetting/vetting-wrapper";
import { VettingResponse } from "../../../interfaces/vetting.interface";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

const Vetting = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const { userData } = useUserStore();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [vettingResults, setVettingResults] = useState<Array<any>>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      if (files.length + newFiles.length > 5) {
        alert("You can only upload a maximum of 5 files.");
      } else {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };
  const {
    mutate: vetClMutation,
    data: vets,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<VettingResponse>({
    mutationKey: ["vetCV"],
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

      const response = await vetCoverLetter(
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
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-xl`}>
        {t("coverLetterTools.vetting.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("coverLetterTools.vetting.upload.title")}
            </span>
            <span className="font-light text-xs">
              {t("coverLetterTools.vetting.upload.description")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                multiple
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
            <div className="flex items-center justify-between">
              <span className="font-bold">
                {t("coverLetterTools.vetting.jobDescription.title")}
                <span className="text-sm font-medium">
                  {" "}
                  {t("coverLetterTools.vetting.jobDescription.subTitle")}
                </span>
              </span>
            </div>
            <div className="mt-4 border border-gray-100 rounded-lg">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="w-full p-3 border-none outline-none rounded-lg resize-none"
                placeholder={t(
                  "coverLetterTools.vetting.jobDescriptionPlaceholder"
                )}
              />
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => {
                vetClMutation();
              }}
              disabled={files.length === 0 || jobDescription === ""}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("coverLetterTools.vetting.analyzing")}
                </>
              ) : (
                t("coverLetterTools.vetting.vetCoverLetter")
              )}
            </Button>
          </div>

          {/* Prompts Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Want to customize your results?{" "}
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
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("coverLetterTools.vetting.vettingResults")}
              </span>
            </div>
            {vettingResults === undefined ? (
              <div className="my-4 text-center">
                {t("coverLetterTools.vetting.resultsPlaceholder")}
              </div>
            ) : (
              <div className="my-4">
                {loading ? (
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  </div>
                ) : vettingResults === undefined ? (
                  <div>{t("coverLetterTools.vetting.resultsPlaceholder")}</div>
                ) : (
                  vettingResults?.map(
                    (
                      result: {
                        file_name: string;
                        analysis: string;
                        score: number;
                        recommendations: string[];
                      },
                      index: number
                    ) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm">
                            {result.file_name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              result.score >= 80
                                ? "bg-green-100 text-green-800"
                                : result.score >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t("coverLetterTools.vetting.score")}:{" "}
                            {result.score}/100
                          </span>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="mb-3">
                            <h4 className="font-medium text-sm mb-2">
                              {t("coverLetterTools.vetting.analysis")}
                            </h4>
                            <p className="text-sm text-gray-700">
                              {result.analysis}
                            </p>
                          </div>
                          {result.recommendations &&
                            result.recommendations.length > 0 && (
                              <div>
                                <h4 className="font-medium text-sm mb-2">
                                  {t(
                                    "coverLetterTools.vetting.recommendations"
                                  )}
                                </h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {result.recommendations.map((rec, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-gray-700"
                                    >
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Vetting;
