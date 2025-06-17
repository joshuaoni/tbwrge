import { summarizeCV } from "@/actions/cv-tools/summarize-cv";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

interface UploadedFile {
  file: File;
  size: string; // File size in MB
}

const Summarizer: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const { userData } = useUserStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles: UploadedFile[] = Array.from(event.target.files).map(
      (file) => ({
        file,
        size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
      })
    );

    if (files.length + newFiles.length > 5) {
      alert(t("cvTools.common.maxFilesError", { max: 5 }));
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = ""; // Reset file input
  };
  const {
    mutate: summarizeCvMutation,
    data: summaries,
    isPending,
  } = useMutation({
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

      const response = await summarizeCV(
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
  console.log(summaries);

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("cvTools.summarizer.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold text-sm">
              {t("cvTools.common.cvUpload")}
            </span>
            <span className="font-light text-sm">
              {t("cvTools.common.cvUploadDescription")}
            </span>
            <div className="relative w-full justify-between flex flex-col items-start rounded-lg">
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

            {/* Display Uploaded Files */}
            {files.map((uploadedFile, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-center">
                  <Image
                    className="w-8 h-8 mr-2 object-cover"
                    src={pdfIcon}
                    alt="File Icon"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-black">
                      {uploadedFile.file.name}
                    </span>
                    <span className="text-sm text-textgray">
                      {uploadedFile.size} MB
                    </span>
                  </div>
                </div>
                <CircleXIcon
                  onClick={() => removeFile(index)}
                  color="black"
                  size={14}
                />
              </div>
            ))}
          </div>

          {/* Job Description Section */}
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
                disabled={files.length === 0}
                variant="default"
                onClick={() => {
                  summarizeCvMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("cvTools.summarizer.summarizeCV")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] min-h-[200px] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("cvTools.summarizer.resultTitle")}
              </span>
            </div>
            <div className="flex mt-2 items-center justify-center flex-col flex-1 h-full p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : summaries === undefined ? (
                <div className="text-center text-sm text-gray-500 pt-10">
                  {t("cvTools.summarizer.summaryPlaceholder")}
                </div>
              ) : (
                summaries?.map(
                  (summary: { summarized_cv: string; name: string }) => (
                    <div className="my-4">
                      <h5 className="text-lg font-bold">{summary.name}</h5>
                      <p className="text-sm text-[#898989]">
                        {summary.summarized_cv}
                      </p>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Summarizer;
