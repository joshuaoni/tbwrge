import { useState, useRef } from "react";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { CircleXIcon, Loader2, Download, CheckCircle2 } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import downloadIcon from "../../../../public/images/icons/file-download.png";
import Image from "next/image";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { generateInterviewQuestions } from "@/actions/job-tools/generate-interview-questions";
import "react-quill/dist/quill.snow.css";
import { outfit } from "@/constants/app";
import { screenInterviewQuestions } from "@/actions/job-tools/screening-question";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import DocumentDownloadIcon from "@/components/icons/document-download";
import { useTranslation } from "react-i18next";
// import './style.css'
// import '@/styles/globals.css'
//
// Dynamic import for React Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

// Define response interface
interface ScreeningResponse {
  role: string;
  questions: {
    question: string;
    suggested_answer: string;
  }[];
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
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
  "link",
];

const AiScreeningAssistant = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [screeningQuestion, setScreeningQuestion] = useState("");
  const [jobAd, setJobAd] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { userData } = useUserStore();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!data) return;

    try {
      setIsGeneratingPDF(true);
      const toastId = toast.loading(
        t("jobTools.screeningAssistant.generatingPDF", "Generating PDF...")
      );

      if (!resultsRef.current) {
        toast.error(
          t(
            "jobTools.screeningAssistant.pdfNotAvailable",
            "Cannot generate PDF - content not available"
          ),
          {
            id: toastId,
          }
        );
        setIsGeneratingPDF(false);
        return;
      }

      // Create a clean clone for PDF rendering
      const contentClone = resultsRef.current.cloneNode(true) as HTMLElement;
      contentClone.style.width = "800px";
      contentClone.style.padding = "20px";
      contentClone.style.backgroundColor = "white";
      contentClone.style.position = "absolute";
      contentClone.style.left = "-9999px";
      contentClone.style.fontSize = "14px";

      // Add the clone to the document
      document.body.appendChild(contentClone);

      // Create PDF document (letter size)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter", // 8.5" x 11"
      });

      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40; // margin in pt

      // Add title
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        t(
          "jobTools.screeningAssistant.responsesTitle",
          "Screening Questions Responses"
        ),
        pageWidth / 2,
        margin,
        {
          align: "center",
        }
      );

      // Add job role if available
      let yPosition = margin + 30;
      if (data.role) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text(
          t("jobTools.screeningAssistant.jobRole", "Job Role:") + " ",
          margin,
          yPosition
        );
        pdf.setFont("helvetica", "normal");
        const roleText = data.role;
        pdf.text(roleText, margin + 70, yPosition);
        yPosition += 25;
      }

      // Directly create content for each question and answer
      for (let i = 0; i < data.questions.length; i++) {
        const question = data.questions[i];

        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }

        // Question text
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        const questionLabel = `Q${i + 1}. "${question.question}"`;

        // Handle line breaks for long questions
        const splitQuestion = pdf.splitTextToSize(
          questionLabel,
          pageWidth - margin * 2
        );
        pdf.text(splitQuestion, margin, yPosition);
        yPosition += splitQuestion.length * 15;

        // Add some spacing before answer
        yPosition += 10;

        // Green indicator for answer
        pdf.setFillColor(39, 174, 96); // Green color
        pdf.rect(margin, yPosition - 10, 5, 40, "F");

        // Answer heading
        pdf.setFontSize(11);
        pdf.setTextColor(39, 174, 96);
        pdf.text(
          t("jobTools.screeningAssistant.suggestedAnswer", "Suggested Answer:"),
          margin + 15,
          yPosition
        );
        yPosition += 20;

        // Answer text
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        const answerText = `"${question.suggested_answer}"`;
        const splitAnswer = pdf.splitTextToSize(
          answerText,
          pageWidth - margin * 2 - 20
        );
        pdf.text(splitAnswer, margin + 15, yPosition);

        // Move position based on answer length
        yPosition += splitAnswer.length * 15 + 30;

        // Check if we need a new page for the next question
        if (yPosition > pageHeight - 100 && i < data.questions.length - 1) {
          pdf.addPage();
          yPosition = margin;
        }
      }

      // Remove the clone
      document.body.removeChild(contentClone);

      // Save the PDF
      const fileName = `Screening_Questions_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success(
        t(
          "jobTools.screeningAssistant.pdfGenerated",
          "PDF generated successfully"
        ),
        { id: toastId }
      );
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error(
        t(
          "jobTools.screeningAssistant.pdfError",
          "Failed to generate PDF. Please try again."
        )
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const {
    mutate: generateQuestions,
    data,
    isPending,
    isSuccess,
    isError,
  } = useMutation<ScreeningResponse>({
    mutationKey: ["generateInterviewQuestions"],
    mutationFn: async () => {
      let language = "en";
      switch (selectedLanguage) {
        case "French":
          language = "fr";
          break;
        case "Spanish":
          language = "es";
          break;
        case "German":
          language = "de";
          break;
        case "Arabic":
          language = "ar";
          break;
        case "Portuguese":
          language = "pt";
          break;
      }

      return screenInterviewQuestions(
        files,
        language,
        userData?.token as string,
        screeningQuestion,
        jobAd
      );
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      if (files.length + newFiles.length > 5) {
        alert(
          t(
            "jobTools.screeningAssistant.maxFilesError",
            "You can only upload a maximum of 5 files."
          )
        );
      } else {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const clearResults = () => {
    // Reset the mutation state by invalidating the query
    window.location.reload();
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-xl`}>
        {t("jobTools.screeningAssistant.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.screeningAssistant.cvUpload")}
            </span>
            <span className="font-light text-xs">
              {t("jobTools.screeningAssistant.uploadRequired")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                type="file"
                multiple
                accept=".pdf, .doc, .docx, .txt"
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
                  {t("jobTools.screeningAssistant.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("jobTools.screeningAssistant.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("jobTools.screeningAssistant.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("jobTools.screeningAssistant.supportedFormats")}
              </span>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                {files.map((file, index) => {
                  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
                  return (
                    <div
                      key={index}
                      className="flex h-14 w-full px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
                    >
                      <div className="flex items-center">
                        <Image
                          className="w-8 h-8 mr-2 object-cover"
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

          {/* Screening Questions */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.screeningAssistant.pasteScreeningQuestions")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={screeningQuestion}
                onChange={(e) => setScreeningQuestion(e.target.value)}
                placeholder={t(
                  "jobTools.screeningAssistant.inputScreeningQuestions"
                )}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Job Ad */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.screeningAssistant.pasteJobAd")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobAd}
                onChange={(e) => setJobAd(e.target.value)}
                placeholder={t("jobTools.screeningAssistant.inputJobAd")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Language Selection & Generate Button */}
          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("jobTools.screeningAssistant.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                className="self-center bg-primary min-w-[100px] text-white"
                onClick={() => generateQuestions()}
                disabled={
                  !files.length ||
                  screeningQuestion === "" ||
                  jobAd === "" ||
                  isPending
                }
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("jobTools.screeningAssistant.generate")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {t("jobTools.screeningAssistant.responsesTitle")}
              </h2>
              {isSuccess && data && (
                <div className="relative download-button-container">
                  <button
                    onClick={handleDownload}
                    className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all"
                    aria-label={t("jobTools.screeningAssistant.downloadPDF")}
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <DocumentDownloadIcon />
                    )}
                  </button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded p-2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 download-tooltip">
                    <div className="tooltip-arrow absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black"></div>
                    {t("jobTools.screeningAssistant.downloadPDF")}
                  </div>
                </div>
              )}
              <style jsx>{`
                .download-button-container {
                  position: relative;
                }
                .download-button-container:hover .download-tooltip {
                  opacity: 0.9;
                  visibility: visible;
                }
                .download-tooltip {
                  opacity: 0;
                  visibility: hidden;
                  transition: opacity 0.2s, visibility 0.2s;
                  text-align: center;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                  z-index: 50;
                }
                .tooltip-arrow {
                  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
                }
              `}</style>
            </div>

            {isPending && (
              <div className="flex items-center justify-center h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

            {!isPending && !isSuccess && !isError && (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm text-center px-4">
                {t("jobTools.screeningAssistant.responsesPlaceholder")}
              </div>
            )}

            {isSuccess && data && (
              <div
                ref={resultsRef}
                className="mt-4 space-y-6 max-h-[600px] overflow-y-auto px-2"
              >
                {data.role && (
                  <div>
                    <h3 className="font-bold">
                      {t("jobTools.screeningAssistant.jobRole")}{" "}
                      <span className="font-normal">{data.role}</span>
                    </h3>
                  </div>
                )}

                <div className="space-y-6">
                  {data.questions.map((item, qIndex) => (
                    <div key={qIndex} className="space-y-2">
                      <p className="font-medium text-base">
                        Q{qIndex + 1}. "{item.question}"
                      </p>

                      <div className="ml-2 pl-4 border-l-2 border-green-500">
                        <div className="flex items-start gap-2">
                          <div className="bg-green-500 text-white rounded-sm h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs">✓</span>
                          </div>
                          <div>
                            <span className="font-medium">
                              {t("jobTools.screeningAssistant.suggestedAnswer")}{" "}
                            </span>
                            <span>"{item.suggested_answer}"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isError && (
              <div className="text-red-500 mt-4 text-center p-4">
                {t("jobTools.screeningAssistant.errorGenerating")}
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default AiScreeningAssistant;
