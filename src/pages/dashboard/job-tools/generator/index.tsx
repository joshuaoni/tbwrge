import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, StopCircleIcon, Trash, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { generateJob } from "@/actions/job-tools/generator";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import RecordIcon from "../../../../../public/images/icons/microphone.png";
import { JobPostGeneratorResponse } from "../../../../interfaces/job-tools-generator.interface";
import JobPost from "./job-post";

const Generator = () => {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [prompts, setPrompts] = useState<any>([]);
  const [summary, setSummary] = useState("");
  const { userData } = useUserStore();
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
  const {
    mutate: generateJobMutation,
    data,
    isPending,
    isSuccess,
  } = useMutation<JobPostGeneratorResponse>({
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

      const response = await generateJob(
        audioBlob,
        userData?.token,
        prompts,
        language
      );
      return response;
    },
  });
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Job Post Generator</span>
      <section className="flex h-screen space-x-4 ">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">Describe Job Post</span>
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
              <span className="text-xs font-light">Record Voicenote</span>
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
                disabled={prompts.length === 0}
                variant="default"
                onClick={() => {
                  generateJobMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Job "
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl mt-4 p-6  ">
            <div className="flex justify-between items-center">
              <span className="font-bold">Job Post Generator</span>
              <X onClick={() => null} size={20} />
            </div>
            <div className="flex items-center">
              {isSuccess && <JobPost {...data} />}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Generator;
