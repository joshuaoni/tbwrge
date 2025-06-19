import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

import { rewriteCV } from "@/actions/cv-tools/rewrite-cv";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Resume from "@/components/dashboard/cv-tools/resume";
import ResumeTwo from "@/components/dashboard/cv-tools/resume-2";
import DocumentDownloadIcon from "@/components/icons/document-download";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { CVRewriterResponse } from "@/interfaces/rewriter.interface";
import { fileSizeToMb } from "@/lib/common";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

const langSelector: Record<string, string> = {
  English: "en",
  French: "fr",
  Spanish: "es",
  German: "de",
  Arabic: "ar",
  Portugese: "pt",
};

const Translator = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<any[]>([]);
  const [jobAd, setJobAd] = useState("");
  const { userData } = useUserStore();
  const [selectedLanguage, setSelectedValue] = useState("English");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const rewriterMutation = useMutation<CVRewriterResponse>({
    mutationKey: ["rewriteCV"],
    mutationFn: async () => {
      const response = await rewriteCV(
        files,
        langSelector[selectedLanguage],
        jobAd,
        userData?.token
      );
      return response;
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).slice(
        0,
        5 - files.length
      ); // Limit to 5 files

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const rewriterRef1 = useRef<HTMLDivElement>(null);
  const rewriterRef2 = useRef<HTMLDivElement>(null);

  const downloadPDF = async (template: string) => {
    let templateRef;
    let templateName;

    if (template === "template1") {
      templateRef = rewriterRef1.current;
      templateName = "CV_Template_1";
    } else {
      templateRef = rewriterRef2.current;
      templateName = "CV_Template_2";
    }

    if (!templateRef) {
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
      const candidateName = rewriterMutation.data?.[0]?.cv_data?.name || "CV";
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
        {t("cvTools.rewriter.title")}
      </span>
      <section className={`${outfit.className} flex space-x-4 text-sm`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold text-sm">
              {t("cvTools.common.cvUpload")}
            </span>
            <span className="font-light text-sm">
              {t("cvTools.common.cvUploadDescription")}
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                multiple
                accept=".pdf, .doc, .docx, .txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 text-sm"
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
                  src="/images/icons/upload.png"
                  alt="Upload Icon"
                  width={40}
                  height={40}
                />
                <span>
                  {t("cvTools.common.dragFiles")}{" "}
                  <span className="font-bold">
                    {t("cvTools.common.browse")}
                  </span>
                </span>
                <span className="text-textgray text-sm">
                  {t("cvTools.common.maxFileSize")}
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                {t("cvTools.common.supportedFormats")}
              </span>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex h-14 w-full px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
                  >
                    <div className="flex items-center">
                      <Image
                        className="w-8 h-8 mr-2 object-cover"
                        src="/images/icons/pdf-icon.png"
                        alt="File Icon"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-black">{file.name}</span>
                        <span className="text-sm text-textgray">
                          {fileSizeToMb(file.size)} MB
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
            )}
          </div>

          {/* Job Description Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold text-sm">
              {t("cvTools.common.jobDescriptionTitle")}
            </span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobAd}
                onChange={(e) => setJobAd(e.target.value)}
                placeholder={t("cvTools.common.jobDescriptionPlaceholder")}
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Translate Button */}
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
                disabled={files.length === 0 || jobAd === ""}
                variant="default"
                onClick={() => {
                  rewriterMutation.mutate();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {rewriterMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("cvTools.rewriter.rewrite")
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">
                {t("cvTools.rewriter.resultTitle")}
              </span>
            </div>
            <div className="h-full">
              {rewriterMutation.isPending && (
                <div className="flex items-center justify-center h-[300px]">
                  <Loader2 className="animate-spin h-8 w-8" />
                </div>
              )}
              {rewriterMutation.isSuccess && (
                <div className="space-y-8 mt-4">
                  <div className="relative">
                    <div className="flex justify-end mb-2">
                      <div className="relative group">
                        <button
                          onClick={() => downloadPDF("template1")}
                          className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                          aria-label="Download resume as PDF"
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF && activeTemplate === "template1" ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <DocumentDownloadIcon />
                          )}
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                          {t("cvTools.common.downloadTemplate", { number: 1 })}
                          <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      ref={rewriterRef1}
                      className="bg-white w-full rounded-lg min-h-[500px] overflow-hidden template-container border border-gray-200"
                    >
                      <Resume
                        name={rewriterMutation.data[0].cv_data.name}
                        title={"Product Designer"}
                        contactInfo={{
                          email: "kate.bishop@katedesign.com",
                          linkedin: rewriterMutation.data[0].cv_data.linkedin,
                          phone: "+46 98-215 4231",
                        }}
                        workExperience={
                          rewriterMutation.data[0].cv_data.experience
                        }
                        education={rewriterMutation.data[0].cv_data.education}
                        skills={rewriterMutation.data[0].cv_data.skills}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-end mb-2">
                      <div className="relative group">
                        <button
                          onClick={() => downloadPDF("template2")}
                          className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                          aria-label="Download resume as PDF"
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF && activeTemplate === "template2" ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <DocumentDownloadIcon />
                          )}
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                          {t("cvTools.common.downloadTemplate", { number: 2 })}
                          <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      ref={rewriterRef2}
                      className="bg-white w-full rounded-lg min-h-[500px] overflow-hidden template-container border border-gray-200"
                    >
                      <ResumeTwo
                        name={rewriterMutation.data[0].cv_data.name}
                        title={"Product Designer"}
                        contactInfo={{
                          email: "kate.bishop@katedesign.com",
                          linkedin: rewriterMutation.data[0].cv_data.linkedin,
                          phone: "+46 98-215 4231",
                        }}
                        workExperience={
                          rewriterMutation.data[0].cv_data.experience
                        }
                        education={rewriterMutation.data[0].cv_data.education}
                        skills={rewriterMutation.data[0].cv_data.skills}
                      />
                    </div>
                  </div>

                  {/* Add global styles for templates in PDF mode */}
                  <style jsx global>{`
                    @media print {
                      .template-container {
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        margin: 0;
                      }
                    }
                  `}</style>
                </div>
              )}

              {!rewriterMutation.isPending && !rewriterMutation.isSuccess && (
                <div className="h-[500px] flex items-center justify-center text-gray-400">
                  {t("cvTools.rewriter.uploadAndRewrite")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Translator;
