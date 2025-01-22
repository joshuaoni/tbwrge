import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, StopCircleIcon, Trash, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { generateCV } from "@/actions/cv-tools/generate-cv";
import DashboardWrapper from "@/components/dashboard-wrapper";
import DocumentDownloadIcon from "@/components/icons/document-download";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { useUserStore } from "@/hooks/use-user-store";
import RecordIcon from "../../../../../public/images/icons/microphone.png";
import { CVGeneratorResponse } from "../../../../interfaces/cv-generator.interface";
import Resume from "./resume";
import ResumeTwo from "./resume-2";

const Generator = () => {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { userData } = useUserStore();
  const [prompts, setPrompts] = useState<any>([]);
  const [summary, setSummary] = useState("");
  const {
    mutate: generateCvMutation,
    data: generatedCv,
    isPending,
    isSuccess,
  } = useMutation<CVGeneratorResponse>({
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

      const response = await generateCV(userData?.token as string, prompts);
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
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const resumeRef = useRef<HTMLDivElement>(null);
  const { downloadPDF } = useDownloadPDF(
    resumeRef,
    isSuccess ? `${generatedCv.cv_data.name.replaceAll(" ", "-")}-resume` : ""
  );

  const resumeRef2 = useRef<HTMLDivElement>(null);
  const { downloadPDF: downloadPDF2 } = useDownloadPDF(
    resumeRef2,
    isSuccess ? `${generatedCv.cv_data.name.replaceAll(" ", "-")}-resume-2` : ""
  );

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Generator</span>
      <section className="flex h-screen space-x-4 ">
        <div className="w-[50%] flex flex-col">
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
                disabled={prompts.length === 0}
                variant="default"
                onClick={() => {
                  generateCvMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate CV"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-fit min-w-full w-fit mt-4 p-6  ">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">CV Generator</span>
            </div>
            <div className="h-full">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess && (
                <div className="space-y-6 mt-4">
                  <div className="flex items-start">
                    <Resume
                      ref={resumeRef}
                      name={generatedCv.cv_data.name}
                      title={"Product Designer"}
                      contactInfo={{
                        email: "kate.bishop@katedesign.com",
                        linkedin: generatedCv.cv_data.linkedin,
                        phone: "+46 98-215 4231",
                      }}
                      workExperience={generatedCv.cv_data.experience}
                      education={generatedCv.cv_data.education}
                      skills={generatedCv.cv_data.skills}
                    />
                    <button className="w-1/12" onClick={downloadPDF}>
                      <DocumentDownloadIcon />
                    </button>
                  </div>
                  <div className="flex items-start">
                    <ResumeTwo
                      ref={resumeRef2}
                      name={generatedCv.cv_data.name}
                      title={"Product Designer"}
                      contactInfo={{
                        email: "kate.bishop@katedesign.com",
                        linkedin: generatedCv.cv_data.linkedin,
                        phone: "+46 98-215 4231",
                      }}
                      workExperience={generatedCv.cv_data.experience}
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

export default Generator;
