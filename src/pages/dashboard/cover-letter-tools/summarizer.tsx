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

interface UploadedFile {
  file: File;
  size: string; // File size in MB
}

const Summarizer: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [value, setValue] = useState<string>("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
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
      <span className="font-bold text-xl">Cover Letter Summarizer</span>
      <section className="flex h-screen space-x-4">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here. You can upload up to 5 files max.
            </span>
            <div className="relative w-full px-4 mt-3 justify-between flex flex-col items-start rounded-lg">
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
                  setPrompts((prevState) => [...prevState, value]);
                  setValue("");
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
                      setPrompts((prevState) =>
                        prevState.filter((_, i) => i !== index)
                      )
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
                  summarizeCvMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Summarize Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl">Cover Letter Summary</span>
            </div>
            <div className="flex items-center justify-center flex-col flex-1 h-full p-4 shadow-lg rounded-2xl">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : summaries === undefined ? (
                <div>Your summary will appear here</div>
              ) : (
                summaries?.map(
                  (summary: { summarized_cl: string; name: string }) => (
                    <div className="my-4">
                      <h5 className="text-lg font-bold">{summary.name}</h5>
                      <p className="text-sm text-[#898989]">
                        {summary.summarized_cl}
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
