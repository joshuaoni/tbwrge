import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckSquare,
  CheckSquareIcon,
  CirclePlus,
  Loader2,
  SquareIcon,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const AdvancedOptions = ({
  handleCreateJob,
  setCurrentStep,
  isPending,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isPending: boolean;
  handleCreateJob: () => void;
}) => {
  const storedDetails = JSON.parse(
    localStorage.getItem("job-creation-details") as string
  );
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [detail, setDetail] = useState({
    jobLocation: storedDetails?.JobLocation ?? "",
    salaryRange: {
      min: storedDetails?.salaryRange?.min ?? "",
      max: storedDetails?.salaryRange?.max ?? "",
    },
    applicationRequirements: storedDetails?.applicationRequirements ?? [],
    jobVisibility: storedDetails?.jobVisibility ?? "",
    tags: storedDetails?.tags,
    diversityInclusionSettings:
      storedDetails?.diversityInclusionSettings ?? false,
    filterSalaryRange: storedDetails?.filterSalaryRange ?? false,
    questions: storedDetails?.questions ?? [],
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    if (name === "min-salary") {
      setDetail((prev) => ({
        ...detail,
        salaryRange: { max: prev.salaryRange.max, min: value },
      }));
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          salaryRange: {
            min: detail.salaryRange.min,
            max: detail.salaryRange.max,
          },
        })
      );
      return;
    } else if (name === "max-salary") {
      setDetail((prev) => ({
        ...detail,
        salaryRange: { min: prev.salaryRange.min, max: value },
      }));
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          salaryRange: {
            min: detail.salaryRange.min,
            max: detail.salaryRange.max,
          },
        })
      );
    } else if (name === "JobLocation") {
      console.log(name, value);
      setDetail((prev) => ({ ...prev, jobLocation: value }));
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          [name]: value,
        })
      );
    } else {
      setDetail({ ...detail, [name]: value });
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          [name]: value,
        })
      );
    }
  };

  return (
    <div className="flex flex-col">
      <main className="h-full w-full  space-x-6 flex p-4">
        <section className="w-[50%] flex flex-col">
          <h1 className="font-bold mt-3">Advanced Options</h1>
          <div className="space-y-6 flex flex-col mt-4">
            <div className="flex flex-col mt-4">
              <label htmlFor="Company">Job Location</label>
              <Input
                value={detail.jobLocation}
                name="JobLocation"
                onChange={handleInput}
                placeholder="Choose Location"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="Company">Salary Range</label>
              <div className="flex items-center space-x-12">
                <Input
                  value={detail.salaryRange.min}
                  name="min-salary"
                  onChange={handleInput}
                  placeholder="Min"
                  className="bg-[#EDF2F7] w-[120px] py-8 border-none outline-none mt-2"
                />
                <Input
                  value={detail.salaryRange.max}
                  name="max-salary"
                  onChange={handleInput}
                  placeholder="Max"
                  className="bg-[#EDF2F7] w-[120px] py-8 border-none outline-none mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="space-y-4 ">
                <div className="flex items-center space-x-4">
                  <div
                    className=""
                    onClick={() => {
                      let updatedFilterSalaryRange = !detail.filterSalaryRange;
                      setDetail((prev) => ({
                        ...prev,
                        filterSalaryRange: updatedFilterSalaryRange,
                      })),
                        localStorage.setItem(
                          "job-creation-details",
                          JSON.stringify({
                            ...storedDetails,
                            filterSalaryRange: updatedFilterSalaryRange,
                          })
                        );
                    }}
                  >
                    {detail.filterSalaryRange ? (
                      <CheckSquare />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">
                    Filter out Candidates exceeding Salary Range
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Company">Application Requirements</label>
              <div className="space-y-4 mt-4">
                <div className="flex items-center cursor-pointer space-x-4">
                  <div
                    onClick={() => {
                      const isCVIncluded =
                        detail.applicationRequirements.includes("CV");

                      // Compute the updated requirements
                      const updatedRequirements = isCVIncluded
                        ? detail.applicationRequirements.filter(
                            (item: string) => item !== "CV"
                          )
                        : [...detail.applicationRequirements, "CV"];

                      // Update state
                      setDetail((prev) => ({
                        ...prev,
                        applicationRequirements: updatedRequirements,
                      }));

                      // Update localStorage
                      localStorage.setItem(
                        "job-creation-details",
                        JSON.stringify({
                          ...storedDetails,
                          applicationRequirements: updatedRequirements,
                        })
                      );
                    }}
                  >
                    {detail.applicationRequirements.includes("CV") ? (
                      <CheckSquare />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">CV</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => {
                      const isCoverLetterIncluded =
                        detail.applicationRequirements.includes("Cover Letter");

                      // Compute the updated requirements
                      const updatedRequirements = isCoverLetterIncluded
                        ? detail.applicationRequirements.filter(
                            (item: string) => item !== "Cover Letter"
                          )
                        : [...detail.applicationRequirements, "Cover Letter"];

                      // Update state
                      setDetail((prev) => ({
                        ...prev,
                        applicationRequirements: updatedRequirements,
                      }));

                      // Update localStorage
                      localStorage.setItem(
                        "job-creation-details",
                        JSON.stringify({
                          ...storedDetails,
                          applicationRequirements: updatedRequirements,
                        })
                      );
                    }}
                  >
                    {detail.applicationRequirements.includes("Cover Letter") ? (
                      <CheckSquare />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">Cover Letter</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => {
                      const isVoiceNoteIncluded =
                        detail.applicationRequirements.includes("VoiceNote");

                      // Update applicationRequirements
                      const updatedRequirements = isVoiceNoteIncluded
                        ? detail.applicationRequirements.filter(
                            (item: string) => item !== "VoiceNote"
                          )
                        : [...detail.applicationRequirements, "VoiceNote"];

                      // Update state
                      setDetail((prev) => ({
                        ...prev,
                        applicationRequirements: updatedRequirements,
                      }));

                      // Update localStorage
                      localStorage.setItem(
                        "job-creation-details",
                        JSON.stringify({
                          ...storedDetails,
                          applicationRequirements: updatedRequirements,
                        })
                      );
                    }}
                  >
                    {detail.applicationRequirements.includes("VoiceNote") ? (
                      <CheckSquare />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">Voicenote Recording</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Job Visibility</label>
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => {
                      const updatedVisibility = "Public";

                      // Update state
                      setDetail((prev) => ({
                        ...prev,
                        jobVisibility: updatedVisibility,
                      })),
                        // Update localStorage
                        localStorage.setItem(
                          "job-creation-details",
                          JSON.stringify({
                            ...storedDetails,
                            jobVisibility: updatedVisibility,
                          })
                        );
                    }}
                  >
                    {detail.jobVisibility === "Public" ? (
                      <CheckSquare className="text-[#87909E]" />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p>Public (Visible on job board)</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => {
                      const updatedVisibility = "Private";
                      // Update state
                      setDetail((prev) => ({
                        ...prev,
                        jobVisibility: updatedVisibility,
                      })),
                        // Update localStorage
                        localStorage.setItem(
                          "job-creation-details",
                          JSON.stringify({
                            ...storedDetails,
                            jobVisibility: updatedVisibility,
                          })
                        );
                    }}
                  >
                    {detail.jobVisibility === "Private" ? (
                      <CheckSquare className="text-[#87909E]" />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">
                    Private (Only accessible via generated link on the embed
                    code)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" w-[50%] mt-10 ">
          <div className="space-y-6 flex  flex-col mt-4">
            <div className="space-y-6 flex flex-col mt-4">
              <div className="flex flex-col ">
                <label htmlFor="Company"> Tags</label>
                <Input
                  value={detail.tags}
                  name="tags"
                  onChange={handleInput}
                  placeholder="e.g Fintech Sales, Developer etc."
                  className="bg-[#EDF2F7] border-none outline-none mt-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Diversity & Inclusion Settings</label>
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-4">
                  <div
                    className=""
                    onClick={() => {
                      let updatedDiversitySettings =
                        !detail.diversityInclusionSettings;
                      setDetail((prev) => ({
                        ...prev,
                        diversityInclusionSettings: updatedDiversitySettings,
                      })),
                        localStorage.setItem(
                          "job-creation-details",
                          JSON.stringify({
                            ...storedDetails,
                            diversityInclusionSettings:
                              updatedDiversitySettings,
                          })
                        );
                    }}
                  >
                    {detail.diversityInclusionSettings ? (
                      <CheckSquare />
                    ) : (
                      <SquareIcon />
                    )}
                  </div>

                  <p className="text-[#87909E]">
                    Hide Candidate Names or personal details during initial
                    screening
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[80%] h-fit    shadow-xl rounded-xl p-4 mt-4 ">
              <div className="flex items-center space-x-6">
                <span className="font-bold">Custom Application Status</span>
                <CirclePlus
                  className="cursor-pointer"
                  onClick={() => {
                    let updatedQuestions = [...questions, question];
                    setQuestions(updatedQuestions as any),
                      setQuestion(""),
                      setDetail((prev) => ({
                        ...prev,
                        questions: [...prev.questions, question],
                      })),
                      localStorage.setItem(
                        "job-creation-details",
                        JSON.stringify({
                          ...storedDetails,
                          questions: updatedQuestions,
                        })
                      );
                  }}
                />
              </div>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Questions"
                className="bg-[#D6D6D6] rounded-lg border-none my-4"
              />
              <div className="space-y-3 flex flex-col text-sm font-normal">
                {detail.questions.map((question: string, index: number) => (
                  <div key={index} className="flex space-y-4 w-full justify-between items-center space-x-4">
                    <span>{question} ? </span>
                    <Trash
                      className="ml-auto cursor-pointer"
                      onClick={() => {
                        let updatedQuestions = detail.questions.filter(
                          (item: any) => item !== question
                        );
                        setDetail((prev) => ({
                          ...prev,
                          questions: updatedQuestions,
                        })),
                          localStorage.setItem(
                            "job-creation-details",
                            JSON.stringify({
                              ...storedDetails,
                              questions: updatedQuestions,
                            })
                          );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="flex items-center px-24 justify-between mt-12">
        <Button
          variant="outline"
          onClick={() => {
            setCurrentStep(2);
          }}
          className="text-primary border px-12 border-primary bg-white"
        >
          Back
        </Button>
        <Button
          disabled={
            !detail.jobLocation ||
            !detail.salaryRange.min ||
            !detail.salaryRange.max ||
            !detail.applicationRequirements ||
            !detail.jobVisibility ||
            !detail.tags
          }
          onClick={handleCreateJob}
          variant="default"
          className="bg-primary px-12 min-w-[60px] text-white"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Generate Job Post"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdvancedOptions;
