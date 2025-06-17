import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus, StopCircleIcon, Trash, X, Mic } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

import { generateCV } from "@/actions/cv-tools/generate-cv";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Resume from "@/components/dashboard/cv-tools/resume";
import ResumeTwo from "@/components/dashboard/cv-tools/resume-2";
import ResumeThree from "@/components/dashboard/cv-tools/resume-3";
import ResumeFour from "@/components/dashboard/cv-tools/resume-4";
import ResumeFive from "@/components/dashboard/cv-tools/resume-5";
import DocumentDownloadIcon from "@/components/icons/document-download";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDownloadPDF } from "@/hooks/download-pdf";
import { useUserStore } from "@/hooks/use-user-store";
import { CVGeneratorResponse } from "@/interfaces/cv-generator.interface";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

const Generator = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioVisualization, setAudioVisualization] = useState<number[]>([]);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { userData } = useUserStore();
  const [prompts, setPrompts] = useState<any>([]);
  const [summary, setSummary] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

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

  // Audio playback event handlers
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

      const response = await generateCV(
        userData?.token as string,
        prompts,
        language,
        audioBlob
      );
      return response;
    },
  });

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

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all tracks on the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
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

  // FIXME: refactor this to use a single function
  const resumeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const downloadPDFs = [
    useDownloadPDF(resumeRefs[0], "resume-1").downloadPDF,
    useDownloadPDF(resumeRefs[1], "resume-2").downloadPDF,
    useDownloadPDF(resumeRefs[2], "resume-3").downloadPDF,
    useDownloadPDF(resumeRefs[3], "resume-4").downloadPDF,
    useDownloadPDF(resumeRefs[4], "resume-5").downloadPDF,
  ];

  const resumeComponents = [
    Resume,
    ResumeTwo,
    ResumeFour,
    ResumeFive,
    ResumeThree,
  ];

  const downloadPDF = async (template: string) => {
    let templateRef;
    let templateName;

    if (template === "template1") {
      templateRef = resumeRefs[0].current;
      templateName = "CV_Template_1";
    } else if (template === "template2") {
      templateRef = resumeRefs[1].current;
      templateName = "CV_Template_2";
    } else if (template === "template3") {
      templateRef = resumeRefs[2].current;
      templateName = "CV_Template_3";
    } else if (template === "template4") {
      templateRef = resumeRefs[3].current;
      templateName = "CV_Template_4";
    } else {
      templateRef = resumeRefs[4].current;
      templateName = "CV_Template_5";
    }

    if (!templateRef || !isSuccess) {
      toast.error(t("cvTools.common.templateNotAvailable"));
      return;
    }

    try {
      setIsGeneratingPDF(true);
      setActiveTemplate(template);
      const toastId = toast.loading(t("cvTools.common.generatingPDF"));

      // Create a container for the content with exact dimensions of a US Letter page
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "816px"; // 8.5 inches at 96 DPI
      container.style.height = "1056px"; // 11 inches at 96 DPI
      container.style.backgroundColor = "white";
      container.style.overflow = "hidden";
      document.body.appendChild(container);

      // Clone the template and add it to the container
      const clone = templateRef.cloneNode(true) as HTMLElement;
      clone.style.width = "100%";
      clone.style.height = "auto";
      clone.style.margin = "0";
      clone.style.padding = "20px";
      clone.style.boxSizing = "border-box";
      clone.style.border = "none";
      clone.style.borderRadius = "0";
      clone.style.boxShadow = "none";

      // Increase font size
      clone.style.fontSize = "16px";

      container.appendChild(clone);

      // Wait briefly for any internal rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Use html2canvas with optimal settings
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 15000,
        onclone: (document, element) => {
          // Ensure all content is properly visible
          const allElements = element.getElementsByTagName("*");
          for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i] as HTMLElement;
            if (el.style) {
              el.style.overflow = "visible";
            }
          }

          // Enhance specific template elements
          // Find text elements and ensure they have proper size and contrast
          const textElements = element.querySelectorAll(
            "p, span, h1, h2, h3, h4, h5, h6"
          );
          textElements.forEach((textEl: Element) => {
            const el = textEl as HTMLElement;
            if (parseInt(window.getComputedStyle(el).fontSize) < 12) {
              el.style.fontSize = "12px";
            }

            // Ensure proper contrast for text
            const color = window.getComputedStyle(el).color;
            if (
              color === "rgb(156, 163, 175)" ||
              color === "rgb(107, 114, 128)"
            ) {
              el.style.color = "#444444";
            }
          });
        },
      });

      // Clean up DOM
      document.body.removeChild(container);

      // Create PDF with US Letter size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
      });

      // Add title and metadata
      pdf.setFontSize(16);
      const candidateName = generatedCv?.cv_data?.name || "CV";
      const title = `${candidateName} - Resume`;
      pdf.text(title, 216 / 2, 15, { align: "center" });

      // Add job title if available
      pdf.setFontSize(12);
      pdf.text("Product Designer", 216 / 2, 22, {
        align: "center",
      });

      // Add date
      pdf.setFontSize(10);
      pdf.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        216 / 2,
        28,
        {
          align: "center",
        }
      );

      // Add horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, 30, 201, 30);

      // Add canvas as image
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Make image fill the page with proper margins
      const contentWidth = 186; // 216mm - 30mm margins
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      const startY = 35;
      const startX = 15;

      pdf.addImage(imgData, "PNG", startX, startY, contentWidth, contentHeight);

      // Save the PDF
      const fileName = `${templateName}_${candidateName.replace(
        /\s+/g,
        "-"
      )}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success(t("cvTools.common.pdfSuccess"), { id: toastId });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error(t("cvTools.common.pdfError"));
    } finally {
      setIsGeneratingPDF(false);
      setActiveTemplate(null);
    }
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("cvTools.generator.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">
                {t("cvTools.generator.profileDescription")}{" "}
                <span className="text-sm font-normal">
                  {t("cvTools.generator.profileDescriptionSubtext")}
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
            <div className="mt-5 bg-white">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t(
                  "cvTools.generator.profileDescriptionPlaceholder"
                )}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm text-sm"
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
              <span className="font-medium text-sm">
                {t("cvTools.generator.recordVoicenote")}
              </span>
            </div>

            {!audioBlob ? (
              isRecording ? (
                <div className="bg-gray-50 rounded-lg p-2 mt-2">
                  <div className="flex items-center w-full">
                    <span className="text-xs text-gray-600 mr-1 whitespace-nowrap shrink-0">
                      {t("cvTools.generator.recording")}
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
                  <span className="text-sm text-gray-500 flex-1">
                    {t("cvTools.generator.record")}
                  </span>
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

          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("cvTools.common.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={prompts.length === 0 && !audioBlob}
                variant="default"
                onClick={() => {
                  generateCvMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("cvTools.generator.generateCV")
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit min-w-full w-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("cvTools.generator.resultTitle")}
              </span>
            </div>
            <div className="h-full">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess && (
                <div className="space-y-6 mt-4 h-[100vh] overflow-y-auto overflow-x-hidden">
                  {resumeComponents.map((ResumeComponent, index) => {
                    return (
                      <div key={index} className="flex items-start">
                        <div className="border border-gray-200 rounded-lg">
                          <ResumeComponent
                            ref={resumeRefs[index]}
                            name={generatedCv.cv_data.name}
                            title={"Product Designer"}
                            contactInfo={{
                              email: "kate.bishop@katedesign.com",
                              linkedin: generatedCv.cv_data.linkedin
                                ? generatedCv.cv_data.linkedin
                                : `https://www.linkedin.com/in/${generatedCv.cv_data.name
                                    .replaceAll(" ", "-")
                                    .toLowerCase()}`,
                              phone: "+46 98-215 4231",
                            }}
                            workExperience={generatedCv.cv_data.experience}
                            education={generatedCv.cv_data.education}
                            skills={generatedCv.cv_data.skills}
                          />
                        </div>
                        <div className="relative group ml-2">
                          <button
                            onClick={() => downloadPDF(`template${index + 1}`)}
                            className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                            aria-label="Download resume as PDF"
                            disabled={isGeneratingPDF}
                          >
                            {isGeneratingPDF &&
                            activeTemplate === `template${index + 1}` ? (
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <DocumentDownloadIcon />
                            )}
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                            {t("cvTools.common.downloadTemplate", {
                              number: index + 1,
                            })}
                            <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                          </div>
                        </div>
                      </div>
                    );
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

export default Generator;
