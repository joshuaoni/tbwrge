import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { rewriteCV } from "@/actions/cv-tools/rewrite-cv";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Resume from "@/components/dashboard/cv-tools/resume";
import ResumeTwo from "@/components/dashboard/cv-tools/resume-2";
import DocumentDownloadIcon from "@/components/icons/document-download";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { useUserStore } from "@/hooks/use-user-store";
import { CVRewriterResponse } from "@/interfaces/rewriter.interface";
import { fileSizeToMb } from "@/lib/common";

const langSelector: Record<string, string> = {
  English: "en",
  French: "fr",
  Spanish: "es",
  German: "de",
  Arabic: "ar",
  Portugese: "pt",
};

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [jobAd, setJobAd] = useState("");
  const { userData } = useUserStore();

  const [selectedLanguage, setSelectedValue] = useState("English");

  const rewriterMutation = useMutation<CVRewriterResponse>({
    mutationKey: ["rewriteCV"],
    mutationFn: async () => {
      const response = await rewriteCV(
        files,
        langSelector[selectedLanguage],
        jobAd,
        userData?.token
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

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const rewriterRef1 = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(
    rewriterRef1,
    rewriterMutation.isSuccess
      ? `${rewriterMutation.data[0].cv_data.name.replaceAll(" ", "-")}-resume`
      : ""
  );

  const rewriterRef2 = useRef<HTMLDivElement>(null);
  const { downloadPDF: downloadPDF2 } = useDownloadPDF(
    rewriterRef2,
    rewriterMutation.isSuccess
      ? `${rewriterMutation.data[0].cv_data.name.replaceAll(" ", "-")}-resume-2`
      : ""
  );

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Rewriter</span>
      <section className="flex h-screen space-x-4">
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">CV Upload</span>
            <span className="font-light text-xs">
              Add your CVs here, and you can upload up to 5 files max
            </span>
            <div className="relative w-full px-4 mt-3 flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                multiple
                accept=".pdf, .doc, .docx, .txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="outline-dotted flex flex-col space-y-3 cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px]">
                <Image
                  className="w-fit h-10 object-cover"
                  src="/images/icons/upload.png"
                  alt="Upload Icon"
                  width={40}
                  height={40}
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
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex h-14 w-full px-4 border rounded-lg justify-between items-center space-x-2"
                  >
                    <div className="flex items-start">
                      <Image
                        className="w-10 h-10 object-cover"
                        src="/images/icons/pdf-icon.png"
                        alt="File Icon"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-black">{file.name}</span>
                        <span className="text-sm text-textgray">
                          {fileSizeToMb(file.size)} MB
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
            )}
          </div>

          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Paste your Job Descriptiion Here</span>
            <Textarea
              placeholder="(optional)"
              value={jobAd}
              onChange={(e) => setJobAd(e.target.value)}
              rows={10}
              className="my-3 bg-gray-50 border"
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
                disabled={files.length === 0}
                variant="default"
                onClick={() => {
                  rewriterMutation.mutate();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {rewriterMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Rewrite"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Rewriter</span>
              <X size={20} />
            </div>
            <div className="h-full">
              {rewriterMutation.isPending && (
                <Loader2 className="animate-spin" />
              )}
              {rewriterMutation.isSuccess && (
                <div className="space-y-6 mt-4">
                  <div className="flex items-start">
                    <Resume
                      ref={rewriterRef1}
                      name={rewriterMutation.data[0].cv_data.name}
                      title={"Product Designer"}
                      contactInfo={{
                        email: "kate.bishop@katedesign.com",
                        linkedin: rewriterMutation.data[0].cv_data.linkedin,
                        phone: "+46 98-215 4231",
                      }}
                      workExperience={
                        rewriterMutation.data[0].cv_data.experience
                      }
                      education={rewriterMutation.data[0].cv_data.education}
                      skills={rewriterMutation.data[0].cv_data.skills}
                    />
                    <button className="w-1/12" onClick={downloadPDF}>
                      <DocumentDownloadIcon />
                    </button>
                  </div>
                  <div className="flex items-start">
                    <ResumeTwo
                      ref={rewriterRef2}
                      name={rewriterMutation.data[0].cv_data.name}
                      title={"Product Designer"}
                      contactInfo={{
                        email: "kate.bishop@katedesign.com",
                        linkedin: rewriterMutation.data[0].cv_data.linkedin,
                        phone: "+46 98-215 4231",
                      }}
                      workExperience={
                        rewriterMutation.data[0].cv_data.experience
                      }
                    />
                    <button className="w-1/12" onClick={downloadPDF2}>
                      <DocumentDownloadIcon />
                    </button>
                  </div>
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
