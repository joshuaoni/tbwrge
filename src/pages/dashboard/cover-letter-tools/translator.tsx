import { translateCoverLetter } from "@/actions/cover-letter-tools/translate-cover-letter";
import DashboardWrapper from "@/components/dashboard-wrapper";
import CoverLetterTemplate1 from "@/components/dashboard/cover-letter-tools/template-1";
import CoverLetterTemplate from "@/components/dashboard/cover-letter-tools/template-2";
import CoverLetterTemplate2 from "@/components/dashboard/cover-letter-tools/template-3";
import TemplateWrapper from "@/components/dashboard/cover-letter-tools/template-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const { userData } = useUserStore();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).slice(
        0,
        5 - files.length
      ); // Limit to 5 files
      const newSizes = newFiles.map((file) =>
        (file.size / (1024 * 1024)).toFixed(2)
      ); // Sizes in MB

      setFiles((prev) => [...prev, ...newFiles]);
      setFileSizes((prev) => [...prev, ...newSizes]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileSizes((prev) => prev.filter((_, i) => i !== index));
  };
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const {
    mutate: translateCoverLetterMutation,
    data: translated,
    isPending,
    isSuccess,
  } = useMutation<string>({
    mutationKey: ["translateCV"],
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
      const response = await translateCoverLetter(
        files,
        language,
        userData?.token
      );
      return response;
    },
  });

  const clRef = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(clRef);

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Cover Letter Translator</span>
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
                      {fileSizes[index]} MB
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
                disabled={files.length === 0}
                variant="default"
                onClick={() => {
                  translateCoverLetterMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Translate Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Cover Letter Translator</span>
              <X size={20} />
            </div>
            <div className="flex items-center justify-center h-full">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess && (
                <div className="h-full overflow-y-scroll space-y-4">
                  <TemplateWrapper template={CoverLetterTemplate1} />
                  <TemplateWrapper template={CoverLetterTemplate} />
                  <TemplateWrapper template={CoverLetterTemplate2} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Translator;
