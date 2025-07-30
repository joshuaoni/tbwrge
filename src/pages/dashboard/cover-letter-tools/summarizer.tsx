import { summarizeCoverLetter } from "@/actions/cover-letter-tools/summarizer";
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
import { PaymentRequiredModal } from "@/components/ui/payment-required-modal";
import toast from "react-hot-toast";

interface UploadedFile {
  file: File;
  size: string; // File size in MB
}

const Summarizer: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [value, setValue] = useState<string>("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { userData } = useUserStore();
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

      const response = await summarizeCoverLetter(
        files,
        language,
        userData?.token as string,
        prompts
      );
      return response;
    },
    onError: (error: any) => {
      if (error.message === "PAYMENT_REQUIRED") {
        setShowPaymentModal(true);
      } else {
        toast.error(
          error.message ||
            "An error occurred while summarizing the cover letter"
        );
      }
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles: UploadedFile[] = Array.from(event.target.files).map(
      (file) => ({
        file,
        size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
      })
    );

    if (files.length + newFiles.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    event.target.value = ""; // Reset file input
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("coverLetterTools.summarizer.title")}
      </span>
      <section
        className={`${outfit.className} flex h-screen space-x-4 text-sm`}
      >
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("coverLetterTools.summarizer.upload.title")}
            </span>
            <span className="font-light text-sm">
              {t("coverLetterTools.summarizer.upload.description")}
            </span>
            <div className="relative w-full justify-between flex flex-col items-start rounded-lg">
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
                  {t("coverLetterTools.generator.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("coverLetterTools.generator.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("coverLetterTools.generator.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("coverLetterTools.generator.supportedFormats")}
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

          {/* Prompts Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                {t("coverLetterTools.summarizer.customize.title")}
                <span className="text-sm font-medium">
                  {" "}
                  {t("coverLetterTools.summarizer.customize.subTitle")}
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
              placeholder={t(
                "coverLetterTools.summarizer.customize.inputPrompt"
              )}
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
                {" "}
                {t("coverLetterTools.summarizer.selectOutputLanguage")}
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
                  t("coverLetterTools.summarizer.generateSummary")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("coverLetterTools.summarizer.generatedSummary")}
              </span>
            </div>
            {summaries === undefined ? (
              <div className="my-4 text-center">
                {t("coverLetterTools.summarizer.summaryPlaceholder")}
              </div>
            ) : (
              <div className="flex mt-2 items-center justify-center flex-col flex-1 h-full p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] rounded-2xl">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : summaries === undefined ? (
                  <div>
                    {t("coverLetterTools.summarizer.summaryPlaceholder")}
                  </div>
                ) : (
                  summaries?.map(
                    (summary: { summarized_cl: string; name: string }) => (
                      <div className="">
                        <h5 className="text-lg font-bold">{summary.name}</h5>
                        <p className="text-sm text-[#898989]">
                          {summary.summarized_cl}
                        </p>
                      </div>
                    )
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Payment Required Modal */}
      <PaymentRequiredModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        featureName={t("coverLetterTools.summarizer.title")}
        featureDescription="Upgrade your plan to unlock this powerful tool and summarize cover letters with AI-powered analysis and insights."
      />
    </DashboardWrapper>
  );
};

export default Summarizer;
