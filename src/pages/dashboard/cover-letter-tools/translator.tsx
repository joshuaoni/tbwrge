import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import { CircleXIcon, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Button } from "@/components/ui/button";

const Translator = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const [translated, setTranslated] = useState("");

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

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Cover Letter Translator</span>
      <section className="flex h-screen space-x-4">
        {/* Left Side */}
        <div className="w-[50%] flex flex-col">
          {/* File Upload */}
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here (up to 5 files)
            </span>
            <div className="relative w-full px-4 mt-3 flex flex-col items-start">
              <input
                multiple
                onChange={handleFileChange}
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="outline-dotted flex flex-col space-y-3 cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px]">
                <Image
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-10 h-10"
                />
                <span>
                  Drag your file(s) or <span className="font-bold">browse</span>
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB per file is allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only supports .pdf, .word, and .txt files
              </span>
            </div>

            {/* Uploaded Files */}
            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 border rounded-lg justify-between items-center"
              >
                <div className="flex items-start">
                  <Image src={pdfIcon} alt="File Icon" className="w-10 h-10" />
                  <div className="flex flex-col ml-2">
                    <span className="text-sm text-black">{file.name}</span>
                    <span className="text-sm text-textgray">
                      {fileSizes[index]} MB
                    </span>
                  </div>
                </div>
                <CircleXIcon
                  onClick={() => removeFile(index)}
                  className="cursor-pointer"
                  size={18}
                />
              </div>
            ))}
          </div>

          {/* Translate Button */}
          <Button
            disabled={files.length === 0}
            className="self-center bg-lightgreen mt-12 text-white"
          >
            Translate Cover Letter
          </Button>
        </div>

        {/* Right Side */}
        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-[200px] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Cover Letter Translator</span>
              <X size={20} />
            </div>
            <div className="flex items-center justify-center h-full">
              {translated === "" ? (
                <div>Upload Cover Letter to translate</div>
              ) : (
                translated
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Translator;
