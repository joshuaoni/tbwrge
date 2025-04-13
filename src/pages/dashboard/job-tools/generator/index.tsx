import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, StopCircleIcon, Trash, X, Mic } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const audioChunksRef = useRef<Blob[]>([]);
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

  // Clean up timers and audio resources when component unmounts
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

  const handleClearSummary = () => {
    setSummary("");
  };

  // Update audio visualization
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

  // Start recording with visualization and timer
  const handleStartRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up audio context for visualization
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));

        // Reset recording state
        setIsRecording(false);

        // Stop timers and visualization
        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setAudioVisualization([]);
      };

      mediaRecorder.start();
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

  // Clear recording function
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
      // Stop all tracks on the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
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
      <h2 className={`${outfit.className} font-bold text-[24px]`}>
        Job Post Generator
      </h2>
      <section className={`${outfit.className} flex space-x-4 `}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
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
            <div className="my-7 bg-white">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Detailed Job Description"
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none"
              />
            </div>

            <div className="">
              {prompts.map((prompt: string, index: number) => (
                <div
                  key={index}
                  className="flex justify-between my-2 bg-gray-50 p-2 rounded-lg"
                >
                  <div className="whitespace-pre-wrap break-words max-w-[90%]">
                    {prompt}
                  </div>
                  <Trash
                    className="cursor-pointer"
                    onClick={() =>
                      setPrompts((prevState: string[]) =>
                        prevState.filter((_, i) => i !== index)
                      )
                    }
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="mb-4">
              <span className="font-medium text-base">Record Voicenote</span>
            </div>

            {!audioBlob ? (
              isRecording ? (
                <div className="bg-gray-50 rounded-lg p-2 mt-2">
                  <div className="flex items-center w-full">
                    <span className="text-xs text-gray-600 mr-1 whitespace-nowrap shrink-0">
                      Recording...
                    </span>
                    <div className="flex-1 mx-1 overflow-hidden">
                      <div className="flex items-center gap-0 justify-between">
                        {Array.from({ length: 100 }).map((_, index) => (
                          <div
                            key={index}
                            className="w-[1px] bg-[#009379]"
                            style={{
                              height:
                                index < audioVisualization.length * 10
                                  ? `${Math.max(
                                      3,
                                      audioVisualization[
                                        index % audioVisualization.length
                                      ] * 16
                                    )}px`
                                  : "3px",
                              opacity:
                                index < audioVisualization.length * 10
                                  ? 1
                                  : 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 ml-1 mr-1 whitespace-nowrap shrink-0">
                      {formatDuration(recordingDuration)}
                    </span>
                    <button
                      onClick={handleStopRecording}
                      className="shrink-0 text-red-500 hover:text-red-600"
                    >
                      <StopCircleIcon className="text-red w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="h-[38px] bg-[#F8F9FF] w-full rounded-lg flex items-center px-3 cursor-pointer hover:bg-[#F0F2FF] transition-colors"
                  onClick={handleStartRecording}
                >
                  <span className="text-sm text-gray-500 flex-1">Record</span>
                  <Mic className="w-4 h-4 text-[#009379]" />
                </div>
              )
            ) : (
              <div className="mt-2">
                <div className="flex items-center bg-gray-50 rounded-lg p-2 w-full">
                  <button
                    onClick={handlePlayRecording}
                    className="shrink-0 text-gray-600 hover:text-gray-800 mr-1"
                  >
                    {isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                        width="18"
                        height="18"
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
                  <div className="flex-1 overflow-hidden mx-1">
                    <div className="flex items-center gap-0 justify-between">
                      {Array.from({ length: 100 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-[1px] bg-[#009379]"
                          style={{
                            height: `${Math.max(3, Math.random() * 12)}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 ml-1 mr-1 whitespace-nowrap shrink-0">
                    {isPlaying
                      ? formatDuration(currentTime)
                      : formatDuration(recordingDuration)}
                  </span>
                  <button
                    onClick={clearRecording}
                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            )}
            <audio ref={audioRef} src={audioUrl || ""} />
          </div>

          <div className="flex items-center h-fit mt-4 justify-between">
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
                className="self-center bg-primary min-w-[100px] text-white"
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

        <div className="w-[50%] mb-12">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Job Post Generator</span>
            </div>
            <div className="flex items-center rounded-[4px] border border-gray-100 p-2 mt-4">
              {isSuccess && <JobPost {...data} />}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Generator;
