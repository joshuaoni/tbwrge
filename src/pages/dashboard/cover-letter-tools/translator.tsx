import { translateCoverLetter } from "@/actions/cover-letter-tools/translate-cover-letter";
import DashboardWrapper from "@/components/dashboard-wrapper";
import CoverLetterTemplate1 from "@/components/dashboard/cover-letter-tools/template-1";
import CoverLetterTemplate from "@/components/dashboard/cover-letter-tools/template-2";
import CoverLetterTemplate2 from "@/components/dashboard/cover-letter-tools/template-3";
import DocumentDownloadIcon from "@/components/icons/document-download";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CircleXIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { outfit } from "@/constants/app";

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const { userData } = useUserStore();

  // Add template refs
  const template1Ref = useRef<HTMLDivElement>(null);
  const template2Ref = useRef<HTMLDivElement>(null);
  const template3Ref = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).slice(
        0,
        5 - files.length
      ); // Limit to 5 files
      const newSizes = newFiles.map((file) =>
        (file.size / (1024 * 1024)).toFixed(2)
      ); // Sizes in MB

      setFiles((prev) => [...prev, ...newFiles]);
      setFileSizes((prev) => [...prev, ...newSizes]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileSizes((prev) => prev.filter((_, i) => i !== index));
  };
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const {
    mutate: translateCoverLetterMutation,
    data: translated,
    isPending,
    isSuccess,
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
      const response = await translateCoverLetter(
        files,
        language,
        userData?.token,
        jobDescription
      );
      return response;
    },
  });

  const downloadPDF = async (template: string) => {
    let templateRef;
    let templateName;

    if (template === "template1") {
      templateRef = template1Ref.current;
      templateName = "Cover_Letter_Template_1";
    } else if (template === "template2") {
      templateRef = template2Ref.current;
      templateName = "Cover_Letter_Template_2";
    } else {
      templateRef = template3Ref.current;
      templateName = "Cover_Letter_Template_3";
    }

    if (!templateRef) {
      toast.error("Cannot generate PDF - template not available");
      return;
    }

    try {
      setIsGeneratingPDF(true);
      setActiveTemplate(template);
      const toastId = toast.loading("Generating PDF...");

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
      const title = translated?.candidate_name
        ? `${translated.candidate_name} - Cover Letter`
        : "Translated Cover Letter";
      pdf.text(title, 216 / 2, 15, { align: "center" });

      // Add company name if available
      if (translated?.company) {
        pdf.setFontSize(12);
        pdf.text(translated.company, 216 / 2, 22, {
          align: "center",
        });
      }

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
      const fileName = `${templateName}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      toast.success("PDF generated successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
      setActiveTemplate(null);
    }
  };

  return (
    <DashboardWrapper>
      <span className={`${outfit.className} font-bold text-xl`}>
        Cover Letter Translator
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Cover Letter Upload</span>
            <span className="font-light text-xs">
              Add your Cover Letter here, you can upload up to 5 files max
            </span>
            <div className="relative w-full flex flex-col items-start">
              <input
                multiple
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
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-fit h-8 object-cover"
                />
                <span>
                  Drag your file(s) or <span className="font-bold">browse</span>
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB per file is allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only supports .pdf, .doc, .docx, and .txt
              </span>
            </div>

            {/* Uploaded Files */}
            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-center">
                  <Image
                    src={pdfIcon}
                    alt="File Icon"
                    className="w-8 h-8 mr-2 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-black">{file.name}</span>
                    <span className="text-sm text-textgray">
                      {fileSizes[index]} MB
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

          {/* Job Description Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Input Cover Letter</span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Input Cover Letter"
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Translate Button */}
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
                disabled={files.length === 0 && jobDescription.length === 0}
                variant="default"
                onClick={() => {
                  translateCoverLetterMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Translate Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Cover Letter Translator</span>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 h-full">
              {isPending && <Loader2 className="animate-spin" />}
              {isSuccess && translated && (
                <div className="h-full space-y-8">
                  <div className="relative">
                    <div className="flex justify-end mb-2">
                      <div className="relative group">
                        <button
                          onClick={() => downloadPDF("template1")}
                          className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                          aria-label="Download cover letter as PDF"
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF && activeTemplate === "template1" ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <DocumentDownloadIcon />
                          )}
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                          Download Template 1 as PDF
                          <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      ref={template1Ref}
                      className="bg-white w-full rounded-lg overflow-hidden template-container"
                    >
                      <CoverLetterTemplate1 data={translated} />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-end mb-2">
                      <div className="relative group">
                        <button
                          onClick={() => downloadPDF("template2")}
                          className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                          aria-label="Download cover letter as PDF"
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF && activeTemplate === "template2" ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <DocumentDownloadIcon />
                          )}
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                          Download Template 2 as PDF
                          <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      ref={template2Ref}
                      className="bg-white w-full rounded-lg overflow-hidden template-container"
                    >
                      <CoverLetterTemplate data={translated} />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-end mb-2">
                      <div className="relative group">
                        <button
                          onClick={() => downloadPDF("template3")}
                          className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center"
                          aria-label="Download cover letter as PDF"
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF && activeTemplate === "template3" ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          ) : (
                            <DocumentDownloadIcon />
                          )}
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs rounded py-1.5 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 download-tooltip">
                          Download Template 3 as PDF
                          <div className="absolute h-2 w-2 top-full left-1/2 transform -translate-x-1/2 -mt-1 rotate-45 bg-black/90"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      ref={template3Ref}
                      className="bg-white w-full rounded-lg overflow-hidden template-container"
                    >
                      <CoverLetterTemplate2 data={translated} />
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

              {!isPending && !isSuccess && (
                <div className="h-[500px] flex items-center justify-center text-gray-400">
                  Upload a cover letter and click "Translate" to see results
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
