import React, { useState } from "react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import RecordIcon from "../../../../public/images/icons/microphone.png";
import Image from "next/image";
import OrDivider from "../../../../public/images/or-divider.png";
import { Button } from "@/components/ui/button";
import { CircleXIcon, Plus, Trash, X } from "lucide-react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Generator = () => {
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
      <span className="font-bold text-xl">CV Generator</span>
      <section className="flex h-screen space-x-4 ">
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Decribe your Education/Professional Background
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
            <Textarea
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

          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-light text-sm">Record Voicenote </span>
              <X
                className="cursor-pointer"
                onClick={() => {
                  return (
                    setPrompts((prevState: any) => [...prevState, value]),
                    setValue("")
                  );
                }}
              />
            </div>

            <div className="h-12 bg-[#EDF2F7] w-full rounded-md flex items-center justify-between px-3 my-4 border">
              <span className="text-xs font-light">Record</span>
              <Image
                className="cursor-pointer"
                src={RecordIcon}
                alt=""
                width={15}
                height={15}
              />
            </div>
          </div>

          <div className="flex w-full  flex-col">
            <Button
              disabled={prompts.length === 0}
              variant={"default"}
              className="self-center bg-lightgreen mt-12 text-white"
            >
              Generate Cv
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
              {summary === "" && <div>Add Prompts to generate CV</div>}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Generator;
