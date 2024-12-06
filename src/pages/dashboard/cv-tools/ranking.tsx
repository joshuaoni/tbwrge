import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleXIcon, Plus, Trash, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Input } from "@/components/ui/input";

const Ranking = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [prompts, setPrompts] = useState<string[]>([]);
  const [ranking, setRanking] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || files.length >= 5) return;

    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.slice(0, 5 - files.length); // Limit to the remaining slots
    const newFileSizes = newFiles.map(
      (file) => (file.size / (1024 * 1024)).toFixed(2) // Convert to MB
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setFileSizes((prevSizes) => [...prevSizes, ...newFileSizes]);
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">CV Ranking</span>
      <section className="flex h-screen space-x-4 ">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Document Upload</span>
            <span className="font-light text-xs">
              Add your documents here, and you can upload up to 5 files max
            </span>
            <div className="relative w-full px-4 mt-3 flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
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
                Only supports .pdf, .word, and .txt
              </span>
            </div>

            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-start">
                  <Image
                    className="w-10 h-10 object-cover"
                    src={pdfIcon}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-black">{file.name}</span>
                    <span className="text-sm text-textgray">
                      {fileSizes[index]} MB
                    </span>
                  </div>
                </div>
                <CircleXIcon
                  onClick={() => handleFileRemove(index)}
                  color="black"
                  size={14}
                />
              </div>
            ))}
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
                  if (value && prompts.length < 20) {
                    setPrompts((prev) => [...prev, value]);
                    setValue("");
                  }
                }}
              />
            </div>
            <Input
              placeholder="Input Prompt"
              value={value}
              className="my-3"
              onChange={(e) => setValue(e.target.value)}
            />

            <div>
              {prompts.map((prompt, index) => (
                <div key={index} className="flex justify-between my-2">
                  <span>{prompt}</span>
                  <Trash
                    className="cursor-pointer"
                    onClick={() =>
                      setPrompts((prev) => prev.filter((_, i) => i !== index))
                    }
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col">
            <Button
              disabled={files.length === 0}
              variant={"default"}
              className="self-center bg-lightgreen mt-12 text-white"
            >
              Rank CV
            </Button>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl shadow-xl h-[200px] mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">CV Ranking</span>
              <X onClick={() => null} size={20} />
            </div>
            <div className="flex items-center justify-center flex-1 h-full">
              {ranking === "" && <div>Upload Document to view CV Ranking</div>}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Ranking;
