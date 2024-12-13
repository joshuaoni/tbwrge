import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import { CircleXIcon, Loader2, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { translateCV } from "@/actions/cv-tools/translate-cv";
import { useUserStore } from "@/hooks/use-user-store";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const { userData } = useUserStore();

  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const {
    mutate: translateCvMutation,
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
      const response = await translateCV(files, language, userData?.token);
      return response;
    },
  });
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

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Translator</span>
      <section className="flex h-screen space-x-4">
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here, and you can upload up to 5 files max
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
                      className="flex h-14 w-full px-4 border rounded-lg justify-between items-center space-x-2"
                    >
                      <div className="flex items-start">
                        <Image
                          className="w-10 h-10 object-cover"
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
                  translateCvMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Translate CV"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl min-h-[200px] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Translator</span>
              <X size={20} />
            </div>
            <div className="flex items-center justify-center h-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : translated === undefined ? (
                <div>Your head to head will appear here</div>
              ) : (
                <div className="w-fit  h-[400px] overflow-y-scroll">
                  {translated.map((tran: any) =>
                    JSON.stringify(tran.translated_cv)
                  )}
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
