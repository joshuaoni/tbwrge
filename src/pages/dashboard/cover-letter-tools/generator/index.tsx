import { generateCoverLetter } from "@/actions/cover-letter-tools/generate-cover-letter";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import {
  CircleXIcon,
  Loader2,
  Plus,
  StopCircleIcon,
  Trash,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import RecordIcon from "../../../../../public/images/icons/microphone.png";
import pdfIcon from "../../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../../public/images/icons/upload.png";
import { CoverLetterGeneratorResponse } from "./generator.interface";
import CoverLetterTemplate1 from "./template-1";
import CoverLetterTemplate from "./template-2";
import CoverLetterTemplate2 from "./template-3";

const Generator = () => {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const { userData } = useUserStore();
  const [files, setFiles] = useState<any>([]);
  const [prompts, setPrompts] = useState<any>([]);
  const {
    mutate: generateCvMutation,
    data: generatedCoverLetter,
    isPending,
    isSuccess,
  } = useMutation<CoverLetterGeneratorResponse>({
    mutationKey: ["generateCV"],
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

      const response = await generateCoverLetter(
        files,
        audioBlob,
        userData?.token as string,
        prompts,
        language,
        jobDescription
      );
      return response;
    },
  });
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access is required to record audio.");
    }
  };
  const removeFile = (index: number) => {
    setFiles((prevFiles: any) =>
      prevFiles.filter((_: any, i: number) => i !== index)
    );
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles: any[] = Array.from(event.target.files).map((file) => ({
      file,
      size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
    }));

    if (files.length + newFiles.length > 5) {
      alert("You can only upload up to 5 files.");
      return;
    }

    setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
    event.target.value = ""; // Reset file input
  };

  const clRef = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(clRef);
  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Cover Letter Generator</span>
      <section className="flex h-screen space-x-4 ">
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
                Only support .pdf, .word, and .txt
              </span>
            </div>

            {/* Display Uploaded Files */}
            {files.map((uploadedFile: any, index: number) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-start">
                  <Image
                    className="w-10 h-10 object-cover"
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
                Decribe your Education/Professional Background
              </span>
              <Plus
                className="cursor-pointer"
                onClick={() => {
                  return (
                    setPrompts((prevState: any) => [...prevState, value]),
                    setValue("")
                  );
                }}
              />
            </div>
            <Textarea
              placeholder="Input Prompt"
              value={value}
              className="my-3 bg-white"
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="">
              {prompts.map((prompt: string) => {
                return (
                  <div className="flex justify-between my-2">
                    <span>{prompt}</span>
                    <Trash
                      className="cursor-pointer"
                      onClick={() =>
                        setPrompts((prevState: string[]) =>
                          prevState.filter((p: string) => p !== prompt)
                        )
                      }
                      size={20}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-light text-sm">Record Voicenote </span>
              <X
                className="cursor-pointer"
                onClick={() => {
                  return (
                    setPrompts((prevState: any) => [...prevState, value]),
                    setValue("")
                  );
                }}
              />
            </div>

            <div className="h-12 bg-[#EDF2F7] w-full rounded-md flex items-center justify-between px-3 my-4 border">
              <span className="text-xs font-light">Record</span>
              {isRecording ? (
                <StopCircleIcon
                  color="red"
                  onClick={() => {
                    isRecording
                      ? handleStopRecording()
                      : handleStartRecording();
                  }}
                  className="animate-pulse cursor-pointer "
                />
              ) : (
                <Image
                  onClick={() => {
                    isRecording
                      ? handleStopRecording()
                      : handleStartRecording();
                  }}
                  className="cursor-pointer"
                  src={RecordIcon}
                  alt=""
                  width={20}
                  height={20}
                />
              )}
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
                disabled={prompts.length === 0 && audioBlob === null}
                variant="default"
                onClick={() => {
                  generateCvMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6  ">
            <div className="flex justify-between items-center">
              <span className="font-bold">Cover Letter Summary</span>
              <X onClick={() => null} size={20} />
            </div>
            <div className="flex items-center justify-center flex-1 h-full">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess && (
                <div className="h-full overflow-y-scroll space-y-4">
                  <CoverLetterTemplate1 />
                  <CoverLetterTemplate2 />
                  <CoverLetterTemplate />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Generator;
