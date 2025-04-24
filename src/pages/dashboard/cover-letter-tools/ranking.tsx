import { rankCoverLetter } from "@/actions/cover-letter-tools/rank-cover-letter";
import DashboardWrapper from "@/components/dashboard-wrapper";
import LanguageSelectorDropDown from "@/components/language-selector-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { CircleXIcon, Loader2, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import RankByFilter from "../../../components/dashboard/ranking/rank-by-filter";
import { rankFilters } from "../../../interfaces/ranking.constant";
import { Candidate } from "../../../interfaces/ranking.interface";
import { outfit } from "@/constants/app";

const Ranking = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileSizes, setFileSizes] = useState<string[]>([]);
  const [selectedLanguage, setSelectedValue] = useState<string>("English");
  const { userData } = useUserStore();
  const [value, setValue] = useState("");
  const [prompts, setPrompts] = useState<string[]>([]);

  const [ranking, setRanking] = useState(rankFilters[0].label);
  const [rankFilter, setRankFilter] = useState(rankFilters[0].value);
  const [jobDescription, setJobDescription] = useState("");

  const {
    mutate: rankCoverLetterMutation,
    data: rawRankings,
    isPending,
    isSuccess,
  } = useMutation<Partial<Candidate>[]>({
    mutationKey: ["rankingCV"],
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

      const response = await rankCoverLetter(
        files,
        language,
        userData?.token as string,
        prompts,
        jobDescription
      );
      return response;
    },
  });

  // Sort rankings based on selected filter
  const rankings = useMemo(() => {
    if (!rawRankings) return [];

    return [...rawRankings].sort((a, b) => {
      const valueA = (a[rankFilter as keyof Candidate] as number) || 0;
      const valueB = (b[rankFilter as keyof Candidate] as number) || 0;
      return valueB - valueA; // Descending order
    });
  }, [rawRankings, rankFilter]);

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
      <span className={`${outfit.className} font-bold text-xl`}>
        Cover Letter Ranking
      </span>
      <section className={`${outfit.className} flex space-x-4`}>
        <div className="w-[50%] flex flex-col">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Cover Letter Upload</span>
            <span className="font-light text-xs">
              Add your Cover Letter here, you can upload up to 5 files max
            </span>
            <div className="relative w-full flex flex-col items-start rounded-lg">
              <input
                onChange={handleFileChange}
                name="cv"
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
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
                  Drag your file(s) or <span className="font-bold">browse</span>{" "}
                </span>
                <span className="text-textgray text-sm">
                  Max 10MB files are allowed
                </span>
              </div>
              <span className="text-textgray mt-3 text-sm">
                Only supports .pdf, .doc, .docx, and .txt
              </span>
            </div>

            {files.map((file, index) => (
              <div
                key={index}
                className="flex h-14 w-full mt-6 px-4 pl-2 border rounded-lg justify-between items-center space-x-2"
              >
                <div className="flex items-center">
                  <Image
                    className="w-8 h-8 mr-2 object-cover"
                    src={pdfIcon}
                    alt="File Icon"
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

          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Paste Your Job Description Here</span>
            <div className="mt-5 bg-white">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Detailed Job Description"
                className="h-32 w-full bg-[#F8F9FF] border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#009379] resize-none placeholder:text-sm"
              />
            </div>
          </div>

          {/* Prompts Section */}
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Want to customize your results?{" "}
                <span className="text-sm font-medium">
                  &#40;Add up to 20 prompts&#41;
                </span>
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
              className="my-3 bg-[#F8F9FF]"
              onChange={(e) => setValue(e.target.value)}
            />

            <div>
              {prompts.map((prompt, index) => (
                <div
                  key={index}
                  className="flex justify-between my-2 bg-gray-50 p-2 rounded-lg"
                >
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

          <div className="flex items-center h-fit mt-12 justify-between">
            <div className="flex items-center flex-1">
              <span className="flex-nowrap mr-3 font-semibold">
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
                disabled={files.length === 0 || jobDescription === ""}
                variant="default"
                onClick={() => {
                  rankCoverLetterMutation();
                }}
                className="self-center bg-primary min-w-[100px]  text-white"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Rank Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="rounded-xl border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] h-fit mt-4 p-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Cover Letter Ranking</span>
              {isSuccess && (
                <RankByFilter
                  title="Rank By:"
                  options={rankFilters}
                  onChange={(val) => {
                    const selectedFilter = rankFilters.find(
                      (f) => f.value === val
                    );
                    if (selectedFilter) {
                      setRanking(selectedFilter.label);
                    }
                    setRankFilter(val);
                  }}
                />
              )}
            </div>
            <div className="flex items-center justify-center h-fit">
              {isPending && (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}

              {!isPending && !isSuccess && (
                <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm text-center px-4">
                  Upload cover letters to see ranking results
                </div>
              )}

              {isSuccess && (
                <div className="py-5 w-full">
                  <div className="bg-gray-200 py-3 rounded-t-lg flex">
                    <div className="w-2/3 pl-4 uppercase text-gray-600 font-semibold text-sm">
                      candidate name
                    </div>
                    <div className="w-1/3 text-center text-gray-600 font-semibold text-sm">
                      {ranking}
                    </div>
                  </div>

                  {rankings.map((item, i) => (
                    <div key={i} className="border-b py-4">
                      <div className="flex items-center">
                        <div className="w-2/3 flex items-center pl-4">
                          <div className="w-8 h-8 mr-3 rounded-full bg-pink-200 flex items-center justify-center text-pink-800 font-bold text-sm">
                            {item.candidate_name?.charAt(0) || "?"}
                          </div>
                          <span className="font-semibold">
                            {item.candidate_name || "Unnamed Candidate"}
                          </span>
                        </div>
                        <div className="w-1/3 text-center font-semibold">
                          {item[rankFilter as keyof Candidate] || 0}
                        </div>
                      </div>
                      <div className="pl-16 pr-4 mt-2 text-sm text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Ranking;
