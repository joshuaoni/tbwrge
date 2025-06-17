import { translateJob } from "@/actions/job-tools/translator";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X, Download } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { outfit } from "@/constants/app";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import DocumentDownloadIcon from "@/components/icons/document-download";
import { useTranslation } from "react-i18next";

const Translator = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<any[]>([]);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const [jobDescription, setJobDescription] = useState("");
  const [value, setValue] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const translatedContentRef = useRef<HTMLDivElement>(null);
  const { userData } = useUserStore();
  const {
    mutate: translateJobMutation,
    data: translated,
    isPending,
  } = useMutation({
    mutationKey: ["translateCV"],
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
      const response = await translateJob(
        files,
        jobDescription,
        language,
        userData?.token
      );
      return response;
    },
  });

  // Function to download translated content as PDF
  const downloadTranslatedContentAsPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      const toastId = toast.loading(t("jobTools.translator.generatingPDF"));

      if (!translatedContentRef.current || !translated) {
        toast.error(t("jobTools.translator.pdfNotAvailable"), {
          id: toastId,
        });
        setIsGeneratingPDF(false);
        return;
      }

      // Use html2canvas to take a screenshot of the translated content
      const canvas = await html2canvas(
        translatedContentRef.current as HTMLElement,
        {
          scale: 2, // Higher scale for better quality
          useCORS: true, // To handle cross-origin images
          logging: false,
          backgroundColor: "#ffffff",
        }
      );

      // Calculate PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Add title
      pdf.setFontSize(16);
      pdf.text("Translated Job Description", 105, 15, { align: "center" });

      // Add language info
      pdf.setFontSize(12);
      pdf.text(`Language: ${selectedLanguage}`, 105, 22, { align: "center" });

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
      const fileName = `Translated_Job_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success(t("jobTools.translator.pdfGenerated"), { id: toastId });
      setIsGeneratingPDF(false);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error(t("jobTools.translator.pdfError"));
      setIsGeneratingPDF(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).slice(
        0,
        5 - files.length
      ); // Limit to 5 filess

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-xl`}>
        {t("jobTools.translator.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">
              {t("jobTools.translator.jobAdUpload")}
            </span>
            <span className="font-light text-xs">
              {t("jobTools.translator.addJobDescription")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                type="file"
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
                  {t("jobTools.translator.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("jobTools.translator.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("jobTools.translator.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("jobTools.translator.supportedFormats")}
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
              {t("jobTools.translator.pasteJobDescription")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t("jobTools.translator.detailedJobDescription")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Translate Button */}
          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
                {t("jobTools.translator.selectOutputLanguage")}
              </span>
              <LanguageSelectorDropDown
                outputLanguage={true}
                value={selectedLanguage}
                setValue={setSelectedValue}
              />
            </div>
            <div className="flex flex-col">
              <Button
                disabled={jobDescription.length === 0 && files.length === 0}
                variant="default"
                onClick={() => {
                  translateJobMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("jobTools.translator.translateJob")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">
                {t("jobTools.translator.title")}
              </span>
              {translated && (
                <div className="relative download-button-container">
                  <button
                    onClick={downloadTranslatedContentAsPDF}
                    className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all"
                    aria-label={t("jobTools.translator.downloadPDF")}
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
                    {t("jobTools.translator.downloadPDF")}
                  </div>
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
              )}
            </div>
            <div
              ref={translatedContentRef}
              className="flex items-start text-sm justify-start h-full mt-4 p-4 rounded-lg border border-gray-100 min-h-[200px]"
            >
              {translated}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Translator;
