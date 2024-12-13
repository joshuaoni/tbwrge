import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleXIcon, Loader2, Plus, Trash, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { vetCV } from "@/actions/cv-tools/vet-cv";
import { useUserStore } from "@/hooks/use-user-store";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Textarea } from "@/components/ui/textarea";
import { div } from "framer-motion/client";

const Vetting = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");

  const { userData } = useUserStore();
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
    mutate: vetCvMutation,
    data: vets,
    isPending,
  } = useMutation({
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

      const response = await vetCV(
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
      <span className="font-bold text-xl">CV Vetting</span>
      <section className="flex h-screen space-x-4">
        <div className="w-[50%] flex flex-col">
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
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Post Job Ad</span>
            <Textarea
              placeholder="Input Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="my-3 bg-white border"
            />
          </div>

          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
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
                    alert("You can only add up to 20 prompts.");
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
                <div key={index} className="flex justify-between my-2">
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
                  vetCvMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Vet CV"}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Vetting</span>
              <X onClick={() => null} size={20} />
            </div>
            <div className="flex items-center justify-center flex-1 h-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : vets === undefined ? (
                <div>Your vet will appear here</div>
              ) : (
                <div className="flex flex-col h-full">
                  {vets.map((vet: any) => {
                    return JSON.stringify(vet.metrics);
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Vetting;
