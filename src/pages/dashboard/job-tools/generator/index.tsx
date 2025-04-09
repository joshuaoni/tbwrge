import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, StopCircleIcon, Trash, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});
import "react-quill/dist/quill.snow.css";

import { generateJob } from "@/actions/job-tools/generator";
import DashboardWrapper from "@/components/dashboard-wrapper";
import JobPost from "@/components/dashboard/job-tools/job-post";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-user-store";
import RecordIcon from "../../../../../public/images/icons/microphone.png";
import { JobPostGeneratorResponse } from "../../../../interfaces/job-tools-generator.interface";
import { outfit } from "@/constants/app";

const Generator = () => {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [prompts, setPrompts] = useState<any>([]);
  const [summary, setSummary] = useState("");
  const { userData } = useUserStore();
  const [currentTime, setCurrentTime] = useState(0);

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
  ];

  const handleClearSummary = () => {
    setSummary("");
  };

  const updateAudioVisualization = () => {
    if (analyzerRef.current) {
      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
      analyzerRef.current.getByteFrequencyData(dataArray);

      // Get average of frequencies for visualization
      const values = Array.from(dataArray)
        .slice(0, 10)
        .map((value) => value / 255);
      setAudioVisualization(values);

      animationFrameRef.current = requestAnimationFrame(
        updateAudioVisualization
      );
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setAudioVisualization([]);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      // Start visualization
      updateAudioVisualization();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access is required to record audio.");
    }
  };

  const clearRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);
    setAudioVisualization([]);
  };

  const {
    mutate: generateJobMutation,
    data,
    isPending,
    isSuccess,
    reset: resetMutation,
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

  const handlePlayRecording = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(Math.floor(audioRef.current?.currentTime || 0));
      };
    }
  }, [audioUrl]);

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-xl`}>
        Job Post Generator
      </span>
      <section className={`${outfit.className} flex h-screen space-x-4 `}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Please Describe the Job Below{" "}
                <span className="text-xs text-gray-500">
                  (you can add up to 20 prompts)
                </span>
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
            <div className="my-7 bg-white mb-24">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="Detailed Job Description"
                className="h-32"
              />
            </div>

            <div className="">
              {prompts.map((prompt: string) => {
                return (
                  <div className="flex justify-between my-2">
                    <div dangerouslySetInnerHTML={{ __html: prompt }} />
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
            <div className="mb-4">
              <span className="font-medium text-base">Record Voicenote</span>
            </div>

            {!audioBlob ? (
              <div
                className="h-[60px] bg-[#F8F9FF] w-full rounded-lg flex items-center px-4 cursor-pointer hover:bg-[#F0F2FF] transition-colors"
                onClick={
                  !isRecording ? handleStartRecording : handleStopRecording
                }
              >
                <span className="text-gray-500 flex-1">
                  {isRecording ? "Recording..." : "Record"}
                </span>
                {isRecording ? (
                  <>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 h-8">
                        {audioVisualization.map((value, index) => (
                          <div
                            key={index}
                            className="w-1 bg-[#009379]"
                            style={{
                              height: `${Math.max(4, value * 32)}px`,
                              transition: "height 0.1s ease",
                            }}
                          />
                        ))}
                        {/* Fill remaining space with placeholder bars */}
                        {Array.from({
                          length: Math.max(0, 50 - audioVisualization.length),
                        }).map((_, index) => (
                          <div
                            key={`placeholder-${index}`}
                            className="w-1 bg-[#009379] opacity-20"
                            style={{
                              height: "4px",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 min-w-[48px] ml-2">
                      {formatDuration(recordingDuration)}
                    </span>
                    <StopCircleIcon
                      color="red"
                      className="animate-pulse ml-2"
                    />
                  </>
                ) : (
                  <Image
                    src={RecordIcon}
                    alt="Record"
                    width={24}
                    height={24}
                    className="text-[#009379]"
                  />
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayRecording}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 h-8">
                      {Array.from({ length: 50 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-1 bg-[#009379]"
                          style={{
                            height: `${Math.max(4, Math.random() * 32)}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 min-w-[48px]">
                    {isPlaying
                      ? formatDuration(currentTime)
                      : formatDuration(recordingDuration)}
                  </span>
                  <button
                    onClick={clearRecording}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            )}
            <audio ref={audioRef} src={audioUrl || ""} />
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
                  generateJobMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px] text-white"
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
          <div className="rounded-xl shadow-xl mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Job Post Generator</span>
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
