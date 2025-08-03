import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Loader2,
  Plus,
  StopCircleIcon,
  Trash,
  Mic,
  PlusCircle,
  Download,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { z } from "zod";
import DocumentDownloadIcon from "@/components/icons/document-download";
import { generateJob } from "@/actions/job-tools/generator";
import { Company, getCompanies } from "@/actions/get-companies";
import DashboardWrapper from "@/components/dashboard-wrapper";
import JobPost from "@/components/dashboard/job-tools/job-post";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { PaymentRequiredModal } from "@/components/ui/payment-required-modal";
import { useUserStore } from "@/hooks/use-user-store";
import RecordIcon from "../../../../../public/images/icons/microphone.png";
import { JobPostGeneratorResponse } from "../../../../interfaces/job-tools-generator.interface";
import { outfit } from "@/constants/app";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Generator = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Company selection state
  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownUpward, setOpenDropdownUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const jobPostRef = useRef<HTMLDivElement>(null);

  const jobFormSchema = z.object({
    // ... existing code ...
  });

  const [showForm, setShowForm] = useState(true);
  const [jobPost, setJobPost] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        dropdownTriggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownTriggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isDropdownOpen && dropdownTriggerRef.current) {
      const triggerElement = dropdownTriggerRef.current;
      const triggerRect = triggerElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if there's enough space below (need at least 200px for dropdown)
      const spaceBelow = viewportHeight - triggerRect.bottom;

      // If there's not enough space below, open upward
      setOpenDropdownUpward(spaceBelow < 200);
    }
  }, [isDropdownOpen]);

  // Fetch companies
  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(userData?.token ?? ""),
    enabled: !!userData?.token,
  });

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

  // Company selection handler
  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setCompanyName(company.name);
    setCompanyWebsite(company.website);
    setCompanyDescription(company.description);
    setIsDropdownOpen(false);
  };

  // Handle company logo file upload
  const handleCompanyLogoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setCompanyLogo(event.target.files[0]);
    }
  };

  // Function to download job post as PDF
  const downloadJobPostAsPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const toastId = toast.loading(t("jobTools.generator.generatingPDF"));

      if (!jobPostRef.current) {
        toast.error(t("jobTools.generator.pdfNotAvailable"), {
          id: toastId,
        });
        setIsGeneratingPDF(false);
        return;
      }

      // Use html2canvas to take a screenshot of the job post
      const canvas = await html2canvas(jobPostRef.current as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // To handle cross-origin images
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Calculate PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Add title
      pdf.setFontSize(16);
      const jobTitle = data?.job_title || "Job Post";
      pdf.text(jobTitle, 105, 15, { align: "center" });

      // Add company name
      if (data?.company) {
        pdf.setFontSize(12);
        pdf.text(data.company, 105, 22, { align: "center" });
      }

      // Add date
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 28, {
        align: "center",
      });

      // Add horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, 30, 190, 30);

      // Add image content with pagination support
      const imgData = canvas.toDataURL("image/png");

      // Position for the image (after our header)
      let position = 35;

      // Handle multi-page content
      if (imgHeight > pageHeight - position) {
        // Content spans multiple pages
        let heightLeft = imgHeight;
        let page = 1;

        // Add first page content
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position - page * pageHeight,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight - position;

        // Add subsequent pages
        while (heightLeft > 0) {
          pdf.addPage();
          page++;
          pdf.addImage(
            imgData,
            "PNG",
            0,
            -(position + pageHeight - page * pageHeight),
            imgWidth,
            imgHeight
          );
          heightLeft -= pageHeight;
        }
      } else {
        // Content fits on one page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      }

      // Save the PDF
      const fileName = `${data?.job_title || "Job_Post"}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success(t("jobTools.generator.pdfGenerated"), { id: toastId });
      setIsGeneratingPDF(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error(t("jobTools.generator.pdfError"));
      setIsGeneratingPDF(false);
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

  // Check if form is valid for job generation
  const isFormValid = () => {
    const baseValidation = prompts.length !== 0 || audioBlob !== null;

    // Additional company validation
    if (showNewCompanyForm) {
      // If adding a new company, check all company fields
      return (
        baseValidation &&
        !!(
          companyName.trim() &&
          companyWebsite.trim() &&
          companyDescription.trim()
        )
      );
    } else {
      // If selecting existing company, check if one is selected
      return baseValidation && !!selectedCompany;
    }
  };

  const {
    mutate: generateJobMutation,
    data,
    isPending,
    isSuccess: mutationIsSuccess,
    reset: resetMutation,
    error: mutationError,
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

      // Add company info to prompts
      let companyPrompts = [...prompts];

      // Add company information to prompts
      if (showNewCompanyForm) {
        // Using new company details
        companyPrompts.push(`Company Name: ${companyName}`);
        companyPrompts.push(`Company Website: ${companyWebsite}`);
        companyPrompts.push(`Company Description: ${companyDescription}`);
      } else if (selectedCompany) {
        // Using selected company details
        companyPrompts.push(`Company Name: ${selectedCompany.name}`);
        companyPrompts.push(`Company Website: ${selectedCompany.website}`);
        companyPrompts.push(
          `Company Description: ${selectedCompany.description}`
        );
      }

      const response = await generateJob(
        audioBlob,
        userData?.token,
        companyPrompts,
        language
      );
      return response;
    },
    onError: (error: any) => {
      if (error.message === "PAYMENT_REQUIRED") {
        setShowPaymentModal(true);
      } else {
        toast.error(
          error.message || "An error occurred while generating the job post"
        );
      }
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
      <h2 className={`${outfit.className} font-bold text-[14px]`}>
        {t("jobTools.generator.title")}
      </h2>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                {t("jobTools.generator.describeJob")}{" "}
                <span className="font-normal text-sm">
                  {t("jobTools.generator.addPrompts")}
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
                placeholder={t("jobTools.generator.detailedJobDescription")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
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
                {t("jobTools.generator.recordVoicenote")}
              </span>
            </div>

            {!audioBlob ? (
              isRecording ? (
                <div className="bg-gray-50 rounded-lg p-2 mt-2">
                  <div className="flex items-center w-full">
                    <span className="text-xs text-gray-600 mr-1 whitespace-nowrap shrink-0">
                      {t("jobTools.generator.recording")}
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
                    {t("jobTools.generator.record")}
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

          {/* Add Company Information Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="mb-4">
              <span className="font-medium text-sm">
                {t("jobTools.generator.companyInformation")}
              </span>
            </div>

            {!showNewCompanyForm ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {t("jobTools.generator.selectCompany")}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCompanyForm(true);
                      setIsDropdownOpen(false);
                      setCompanyName("");
                      setCompanyWebsite("");
                      setCompanyDescription("");
                      setCompanyLogo(null);
                    }}
                    className="text-sm text-primary flex items-center hover:underline"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    {t("jobTools.generator.addNewCompany")}
                  </button>
                </div>

                <div className="relative">
                  <div
                    ref={dropdownTriggerRef}
                    className="h-[38px] bg-[#F8F9FF] w-full rounded-lg flex items-center px-3 cursor-pointer hover:bg-[#F0F2FF] transition-colors justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedCompany ? (
                      <div className="flex items-center gap-2">
                        {selectedCompany.logo ? (
                          <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                            <Image
                              src={selectedCompany.logo}
                              alt={selectedCompany.name}
                              width={20}
                              height={20}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs">
                              {selectedCompany.name[0]}
                            </span>
                          </div>
                        )}
                        <span className="text-sm">{selectedCompany.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {t("jobTools.generator.selectCompany")}
                      </span>
                    )}
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className={`absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md ${
                        openDropdownUpward
                          ? "bottom-full mb-1"
                          : "top-full mt-1"
                      }`}
                    >
                      {isLoadingCompanies ? (
                        <div className="p-2 text-sm text-center text-gray-500">
                          {t("jobTools.generator.loadingCompanies")}
                        </div>
                      ) : companies.length > 0 ? (
                        <div
                          className="overflow-y-auto"
                          style={{ maxHeight: "200px" }}
                        >
                          {companies.map((company) => (
                            <div
                              key={company.id}
                              className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                              onClick={() => handleCompanySelect(company)}
                            >
                              {company.logo ? (
                                <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                                  <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={20}
                                    height={20}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs">
                                    {company.name[0]}
                                  </span>
                                </div>
                              )}
                              <span className="text-sm">{company.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 text-sm text-center text-gray-500">
                          {t("jobTools.generator.noCompaniesFound")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    {t("jobTools.generator.companyName")}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t("jobTools.generator.enterCompanyName")}
                    className="h-[38px] w-full bg-[#F8F9FF] border border-gray-200 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#009379]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    {t("jobTools.generator.companyWebsite")}
                  </label>
                  <input
                    type="text"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder={t("jobTools.generator.enterCompanyWebsite")}
                    className="h-[38px] w-full bg-[#F8F9FF] border border-gray-200 rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#009379]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    {t("jobTools.generator.companyDescription")}
                  </label>
                  <textarea
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    placeholder={t(
                      "jobTools.generator.enterCompanyDescription"
                    )}
                    className="w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#009379] resize-none h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    {t("jobTools.generator.companyLogo")}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCompanyLogoUpload}
                      className="hidden"
                      id="company-logo-upload"
                    />
                    <label
                      htmlFor="company-logo-upload"
                      className="cursor-pointer h-[38px] px-3 flex items-center bg-[#F8F9FF] border border-gray-200 rounded-lg hover:bg-[#F0F2FF]"
                    >
                      {t("jobTools.generator.chooseFile")}
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      {companyLogo
                        ? companyLogo.name
                        : t("jobTools.generator.noFileChosen")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowNewCompanyForm(false);
                    setSelectedCompany(null);
                  }}
                  className="text-sm text-primary hover:underline mt-2"
                >
                  {t("jobTools.generator.backToSelecting")}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center h-fit mt-4 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("jobTools.generator.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={!isFormValid()}
                variant="default"
                onClick={() => {
                  generateJobMutation();
                }}
                className="self-center bg-primary min-w-[100px] text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("jobTools.generator.generateJobPost")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%] mb-12">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">
                {t("jobTools.generator.jobPostGenerator")}
              </span>
              {mutationIsSuccess && (
                <div className="relative download-button-container group">
                  <button
                    onClick={downloadJobPostAsPDF}
                    className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                    aria-label={t("jobTools.generator.downloadPDF")}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <DocumentDownloadIcon />
                    )}
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {t("jobTools.generator.downloadPDF")}
                    <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex items-center rounded-[4px] border border-gray-100 p-2 mt-4"
              ref={mutationIsSuccess ? jobPostRef : null}
            >
              {mutationIsSuccess && <JobPost {...data} />}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Required Modal */}
      <PaymentRequiredModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        featureName={t("jobTools.generator.featureName")}
        featureDescription={t("jobTools.generator.featureDescription")}
      />
    </DashboardWrapper>
  );
};

export default Generator;
