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
import React, { useState } from "react";
import pdfIcon from "../../../../public/images/icons/pdf-icon.png";
import uploadIcon from "../../../../public/images/icons/upload.png";
import RankByFilter from "../../../components/dashboard/ranking/rank-by-filter";
import { rankFilters } from "../../../interfaces/ranking.constant";
import { Candidate } from "../../../interfaces/ranking.interface";

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
    data: rankings,
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
      <span className="font-bold text-xl">Cover Letter Ranking</span>
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

          <div className="rounded-xl shadow-xl h-fit flex flex-col mt-4 p-6">
            <span className="font-bold">Paste Your Job description here</span>
            <Textarea
              placeholder="Input Job Description"
              value={jobDescription}
              rows={8}
              onChange={(e) => setJobDescription(e.target.value)}
              className="my-3 bg-white border"
            />
          </div>

          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">
                Want to customize your results?
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
                disabled={files.length === 0}
                variant="default"
                onClick={() => {
                  rankCoverLetterMutation();
                }}
                className="self-center bg-lightgreen min-w-[100px]  text-white"
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
          <div className="rounded-xl shadow-xl h-fit mt-4 p-6">
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
              {isPending && <Loader2 className="animate-spin" />}

              {isSuccess && (
                <div className="py-10 w-full">
                  <div className="w-full flex justify-between px-6 py-2 bg-[#D6D6D6] text-[#898989] text-sm font-bold rounded-lg">
                    <span className="uppercase">candidate name</span>
                    <span className="capitalize">{ranking}</span>
                  </div>

                  {rankings.map((item, i) => (
                    <div key={i} className="px-6 py-2">
                      <div className="w-full flex justify-between">
                        <span className="font-medium">
                          {item.candidate_name ?? "empty"}
                        </span>
                        <span>{item![rankFilter as keyof Candidate] ?? 0}</span>
                      </div>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Neque accusamus omnis cum hic velit beatae
                        ratione, illum et minima quod quisquam dolor
                        exercitationem pariatur, aliquid vero blanditiis facere
                        saepe? Incidunt.
                      </p>
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
