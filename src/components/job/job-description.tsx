import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import ResidenceDropDown from "../residency-dropdown";

const JobDescription = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [residence, setResidence] = useState("");
  const storedDetails = JSON.parse(
    localStorage.getItem("job-creation-details") as string
  );
  const [detail, setDetail] = useState({
    JobDescription: storedDetails.JobDescription,
    skills: storedDetails.skills,
    education: storedDetails.education,
    benefits: storedDetails.benefits,
    language: storedDetails.language,
    residence: storedDetails.residence,
    YOE: storedDetails.YOE,
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setDetail({ ...detail, [name]: value });
    localStorage.setItem(
      "job-creation-details",
      JSON.stringify({
        ...storedDetails,
        [name]: value,
      })
    );
  };

  useEffect(() => {
    setDetail({ ...detail, residence });
    localStorage.setItem(
      "job-creation-details",
      JSON.stringify({
        ...storedDetails,
        residence,
      })
    );
  }, [residence]);
  return (
    <div className="flex flex-col">
      <main className="h-full w-full  space-x-6 flex p-4">
        <section className="w-[50%] flex flex-col">
          <h1 className="font-bold mt-3">Job Description & Requirements</h1>
          <div className="space-y-6 flex flex-col mt-4">
            <div className="flex flex-col mt-4">
              <label htmlFor="Company">
                Job Description & Responsibilities
              </label>
              <Textarea
                value={detail.JobDescription}
                name="JobDescription"
                onChange={handleInput}
                placeholder="Job Description & Responsibilities"
                className="bg-[#EDF2F7] border-none h-60 outline-none mt-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Company">Required Skills</label>
              <Textarea
                value={detail.skills}
                name="skills"
                onChange={handleInput}
                placeholder="e.g Python, Data Analysis"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
          </div>
        </section>
        <section className=" w-[50%] mt-12 ">
          <div className="space-y-6 flex  flex-col mt-4">
            <div className="flex flex-col">
              <label htmlFor="Company">Education Requirements</label>
              <Textarea
                name="education"
                value={detail.education}
                onChange={handleInput}
                placeholder="e.g Bachelor's in computer science"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="Company">Additional Benefits</label>
              <Textarea
                placeholder="e.g Health and dental insurance"
                value={detail.benefits}
                name="benefits"
                onChange={handleInput}
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Language</label>
              <Input
                placeholder="e.g English, French"
                value={detail.language}
                name="language"
                onChange={handleInput}
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col  ">
              <label htmlFor="Company">Residence</label>
              <div className=" w-full  top-5 ">
                <ResidenceDropDown
                  onSelect={(value) => {
                    setResidence(value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="Company">Year Of Experience</label>
              <Input
                type="number"
                value={detail.YOE}
                onChange={handleInput}
                name="YOE"
                placeholder=" Year of exp"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
          </div>
        </section>
      </main>
      <div className="flex items-center px-24 justify-between mt-12">
        <Button
          variant="outline"
          onClick={() => {
            setCurrentStep(1);
          }}
          className="text-primary border px-12 border-primary bg-white"
        >
          Back
        </Button>
        <Button
          disabled={Object.values(detail).some((value) => value === "")}
          onClick={() => setCurrentStep(3)}
          variant="default"
          className="bg-primary px-12 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
