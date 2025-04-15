import { translateJob } from "@/actions/job-tools/translator";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [value, setValue] = useState("");
  const { userData } = useUserStore();
  const {
    mutate: translateJobMutation,
    data: translated,
    isPending,
  } = useMutation({
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
      const response = await translateJob(
        files,
        value,
        language,
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
      ); // Limit to 5 filess

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Job Translator</span>
      <section className="flex h-screen space-x-4">
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
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">Input Job Ad</span>
            </div>
            <Textarea
              placeholder="Input Prompt"
              value={value}
              className="my-3 bg-white"
              onChange={(e) => setValue(e.target.value)}
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
                disabled={value.length === 0}
                variant="default"
                onClick={() => {
                  translateJobMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Translate Job "
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Job Translator</span>
              <X size={20} />
            </div>
            <div className="flex items-center justify-center h-full">
              {translated}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Translator;
