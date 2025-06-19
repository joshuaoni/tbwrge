import { useState, useRef } from "react";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { CircleXIcon, Loader2, Download } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import downloadIcon from "../../../../public/images/icons/file-download.png";
import Image from "next/image";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { generateInterviewPrep } from "@/actions/job-tools/interview-prep";
import "react-quill/dist/quill.snow.css";
import { outfit } from "@/constants/app";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import DocumentDownloadIcon from "@/components/icons/document-download";
import { useTranslation } from "react-i18next";

// Dynamic import for React Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

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

interface InterviewQuestion {
  question: string;
  best_answer: string;
}

interface InterviewPrepResponse {
  role: string;
  cv_insight: string;
  questions: InterviewQuestion[];
}

const AiInterviewPrep = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedLanguage, setSelectedValue] = useState<string>("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const { userData } = useUserStore();

  const downloadTxtFile = () => {
    if (!questions) return;

    let content = `Possible Interview Questions & Answers\n\n`;

    if (typeof questions === "object" && questions.role) {
      content += `Role: ${questions.role}\n\n`;

      if (questions.cv_insight && questions.cv_insight !== "null") {
        content += `CV Insights: ${questions.cv_insight}\n\n`;
      }

      content += `Likely Interview Questions & Suggested Answers:\n\n`;

      questions.questions.forEach((q: InterviewQuestion, idx: number) => {
        content += `${idx + 1}. "${q.question}"\n\n`;
        content += `✓ Best Answer: "${q.best_answer}"\n\n`;
      });
    } else if (Array.isArray(questions)) {
      // Fallback for legacy format
      questions.forEach((q: string, index: number) => {
        content += `${index + 1}. ${q}\n`;
      });
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-prep.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const downloadPDF = async () => {
    try {
      if (!questions) return;

      setIsGeneratingPDF(true);
      const toastId = toast.loading(
        t("jobTools.interviewPrep.generatingPDF", "Generating PDF...")
      );

      // Create a new PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = 20; // Starting Y position

      // Add title with better styling
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        t(
          "jobTools.interviewPrep.questionsTitle",
          "Possible Interview Questions & Answers"
        ),
        pageWidth / 2,
        y,
        {
          align: "center",
        }
      );
      y += 15;

      // Add role if available
      if (typeof questions === "object" && questions.role) {
        pdf.setFontSize(14);
        pdf.text(
          `${t("jobTools.interviewPrep.role", "Role:")} ${questions.role}`,
          margin,
          y
        );
        y += 10;
      }

      // Add CV Insights if available
      if (
        typeof questions === "object" &&
        questions.cv_insight &&
        questions.cv_insight !== "null"
      ) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(
          t("jobTools.interviewPrep.cvInsights", "CV Insights:"),
          margin,
          y
        );
        y += 6;

        pdf.setFont("helvetica", "normal");
        const insightText = questions.cv_insight;
        const splitInsight = pdf.splitTextToSize(insightText, contentWidth);
        pdf.text(splitInsight, margin, y);
        y += splitInsight.length * 6 + 6;
      }

      // Add "Likely Interview Questions & Suggested Answers" heading
      pdf.setFont("helvetica", "bold");
      pdf.text(
        t(
          "jobTools.interviewPrep.likelyQuestions",
          "Likely Interview Questions & Suggested Answers:"
        ),
        margin,
        y
      );
      y += 10;

      // Add horizontal line
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 10;

      if (typeof questions === "object" && questions.questions) {
        // Process each question and answer
        for (const [qIndex, q] of questions.questions.entries()) {
          // Check if we need a new page
          if (y > 250) {
            pdf.addPage();
            y = 20;
          }

          // Question number and text
          pdf.setFontSize(12);
          pdf.setTextColor(0, 0, 0);
          pdf.setFont("helvetica", "bold");

          // Split long questions into multiple lines
          const questionText = `${qIndex + 1}. "${q.question}"`;
          const splitQuestion = pdf.splitTextToSize(questionText, contentWidth);
          pdf.text(splitQuestion, margin, y);
          y += splitQuestion.length * 6 + 4;

          // Best Answer section with green checkmark
          const checkmarkX = margin + 4;
          const checkmarkY = y;

          // Create green box for checkmark
          pdf.setFillColor(0, 200, 83); // Green color for checkbox
          pdf.rect(checkmarkX, checkmarkY - 4, 6, 6, "F");

          // Add white checkmark symbol
          pdf.setTextColor(255, 255, 255);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9);
          pdf.text("✓", checkmarkX + 1.2, checkmarkY - 0.2);

          // Add "Best Answer:" text
          pdf.setTextColor(0, 0, 0);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.text("Best Answer:", checkmarkX + 10, checkmarkY);

          // Add the actual answer text
          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(60, 60, 60);

          // Split long answers into multiple lines with proper indentation
          const answerText = q.best_answer;
          const splitAnswer = pdf.splitTextToSize(
            `"${answerText}"`,
            contentWidth - 15
          );

          // Add answer text indented
          pdf.text(splitAnswer, checkmarkX + 10, checkmarkY + 6);
          y += splitAnswer.length * 5 + 15;
        }
      } else if (Array.isArray(questions)) {
        // Legacy format fallback
        pdf.setFontSize(11);
        for (let i = 0; i < questions.length; i++) {
          if (y > 270) {
            pdf.addPage();
            y = 20;
          }

          const text = `${i + 1}. ${questions[i]}`;
          const splitText = pdf.splitTextToSize(text, contentWidth);
          pdf.text(splitText, margin, y);
          y += splitText.length * 6 + 5;
        }
      }

      const fileName = `Interview_Prep_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success(
        t("jobTools.interviewPrep.pdfGenerated", "PDF generated successfully"),
        { id: toastId }
      );
      setIsGeneratingPDF(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error(
        t(
          "jobTools.interviewPrep.pdfError",
          "Failed to generate PDF. Please try again."
        )
      );
      setIsGeneratingPDF(false);
    }
  };

  const {
    mutate: generateQuestions,
    data: questions,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
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

      return generateInterviewPrep(
        files,
        language,
        userData?.token as string,
        jobDescription
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
            "jobTools.interviewPrep.maxFilesError",
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
      <span className={`${outfit.className} font-bold text-sm`}>
        {t("jobTools.interviewPrep.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.interviewPrep.cvUpload")}
            </span>
            <span className="font-light text-xs">
              {t("jobTools.interviewPrep.uploadRequired")}
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
                  {t("jobTools.interviewPrep.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("jobTools.interviewPrep.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("jobTools.interviewPrep.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("jobTools.interviewPrep.supportedFormats")}
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

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.interviewPrep.pasteJobDescription")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t("jobTools.interviewPrep.detailedJobDescription")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Language Selection & Generate Button */}
          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("jobTools.interviewPrep.selectOutputLanguage")}
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
                disabled={!files.length || !jobDescription || isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("jobTools.interviewPrep.generate")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%] mb-12">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold">
                {t("jobTools.interviewPrep.questionsTitle")}
              </h2>
              {isSuccess && questions && (
                <div className="flex gap-2">
                  <div className="relative download-button-container">
                    <button
                      onClick={downloadPDF}
                      className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all"
                      aria-label="Download questions as PDF"
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
                      Download as PDF
                    </div>
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
                {t("jobTools.interviewPrep.questionsPlaceholder")}
              </div>
            )}

            {isSuccess && questions && (
              <div
                className="mt-4 space-y-6 max-h-[600px] overflow-y-auto px-2"
                ref={resultsContainerRef}
              >
                {typeof questions === "object" && questions.role ? (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-bold">
                        {t("jobTools.interviewPrep.role")}:{" "}
                        <span className="font-normal">{questions.role}</span>
                      </h3>

                      {questions.cv_insight &&
                        questions.cv_insight !== "null" && (
                          <div className="mt-2">
                            <h3 className="font-bold">
                              {t("jobTools.interviewPrep.cvInsights")}:{" "}
                              <span className="font-normal">
                                {questions.cv_insight}
                              </span>
                            </h3>
                          </div>
                        )}
                    </div>

                    <h3 className="font-bold">
                      {t("jobTools.interviewPrep.likelyQuestions")}:
                    </h3>

                    <div className="space-y-6">
                      {questions.questions.map(
                        (q: InterviewQuestion, qIndex: number) => (
                          <div key={qIndex} className="space-y-2">
                            <p className="font-medium text-base">
                              {t("jobTools.interviewPrep.q")}
                              {qIndex + 1}. "{q.question}"
                            </p>

                            <div className="ml-2 pl-4 border-l-2 border-green-500">
                              <div className="flex items-start gap-2">
                                <div className="bg-green-500 text-white rounded-sm h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <div>
                                  <span className="font-medium">
                                    Best Answer:{" "}
                                  </span>
                                  <span>"{q.best_answer}"</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : Array.isArray(questions) ? (
                  // Fallback for legacy format
                  <div className="space-y-2">
                    {questions.map((question: string, index: number) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg border hover:bg-gray-50"
                      >
                        <p className="text-sm">{`${index + 1}. ${question}`}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}

            {isError && (
              <div className="text-red-500 mt-4 text-center p-4">
                An error occurred while generating interview preparation. Please
                try again.
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default AiInterviewPrep;
