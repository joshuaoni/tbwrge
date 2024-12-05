import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import OrDivider from "../../../../public/images/or-divider.png";
import { Button } from "@/components/ui/button";
import { CircleXIcon, Plus, Trash, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Input } from "@/components/ui/input";

const Summarizer = () => {
  const [file, setFile] = useState<any>(null);
  const [fileSize, setFileSize] = useState("");
  const [value, setValue] = useState("");
  const [prompts, setPrompts] = useState<any>([]);
  const [summary, setSummary] = useState("");
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileSizeInKB = (selectedFile?.size / 1024).toFixed(2); // Convert to KB
      const fileSizeInMB = (selectedFile?.size / (1024 * 1024)).toFixed(2); // Convert to MB
      setFileSize(fileSizeInMB);
    }
    setFile(selectedFile);
  };
  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Summarizer</span>
      <section className="flex h-screen space-x-4 ">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here, and you can upload up to 5 files max
            </span>
            <div className=" relative w-full px-4 mt-3 justify-between  flex flex-col  items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt" // Allows PDFs, Word files, text files, and images
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="outline-dotted flex flex-col space-y-3 cursor-pointer items-center justify-center w-full rounded-xl mt-4 h-[200px]">
                <Image
                  className="w-fit h-10 object-cover"
                  src={uploadIcon}
                  alt=""
                />
                <span>
                  Drag your file(s) or <span className="font-bold">browse</span>{" "}
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB files are allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only support .pdf, .word and .txt
              </span>
            </div>

            <Image src={OrDivider} alt="" className="my-6" />

            <span className="font-bold">Upload from URL</span>
            <div className=" relative h-14 w-full px-4 bg-[#FAFAFA] mt-3 justify-between border flex items-center rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt" // Allows PDFs, Word files, text files, and images
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex space-x-2">
                <span className="text-sm text-textgray">Add file URL</span>
              </div>
              <Button
                variant={"outline"}
                className="flex bg-white text-black space-x-2"
              >
                <span className="text-sm text-textgray">Upload</span>
              </Button>
            </div>
            {file != null && (
              <div className="flex h-14 w-full  mt-6 px-4 border rounded-lg justify-between  items-center space-x-2">
                <div className="flex items-start">
                  <Image
                    className="w-10 h-10 object-cover"
                    src={pdfIcon}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-black">
                      {file && file.name}
                    </span>
                    <span className="text-sm text-textgray">
                      {fileSize + "MB"}
                    </span>
                  </div>
                </div>

                <CircleXIcon
                  onClick={() => {
                    setFile(null);
                    setFileSize("");
                  }}
                  color="black"
                  size={14}
                />
              </div>
            )}
          </div>

          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Prompts{" "}
                <span className="text-sm font-medium">
                  (Add up to 20 prompts)
                </span>{" "}
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
            <Input
              placeholder="Input Prompt"
              value={value}
              className="my-3"
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="">
              {prompts.map((prompt: string) => {
                return (
                  <div className="flex justify-between my-2">
                    <span>{prompt}</span>
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

          <div className="flex w-full  flex-col">
            <Button
              disabled={file === null}
              variant={"default"}
              className="self-center bg-lightgreen mt-12 text-white"
            >
              Summarize Cv
            </Button>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-[200px] mt-4 p-6  ">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Summary</span>
              <X onClick={() => null} size={20} />
            </div>
            <div className="flex items-center justify-center flex-1 h-full">
              {summary === "" && <div>Upload Document to view CV summary</div>}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Summarizer;
