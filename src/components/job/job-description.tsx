import React from "react";
import UPLOAD from "../../../public/images/icons/upload.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";

const JobDescription = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
                placeholder="Job Description & Responsibilities"
                className="bg-[#EDF2F7] border-none h-60 outline-none mt-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Company">Required Skills</label>
              <Textarea
                placeholder="e.g Python, Data Analysis"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
          </div>
        </section>
        <section className=" w-[50%]">
          <div className="space-y-6 flex flex-col mt-4">
            <div className="flex flex-col">
              <label htmlFor="Company">Education Requirements</label>
              <Textarea
                placeholder="e.g Bachelor's in computer science"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Additional Benefits</label>
              <Textarea
                placeholder="e.g Health and dental insurance"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Language</label>
              <Input
                placeholder="e.g English, French"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Residence</label>
              <Input
                placeholder="e.g English, French"
                className="bg-[#EDF2F7] border-none outline-none mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Company">Language</label>
              <Input
                placeholder="e.g English, French"
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
          className="text-primary border border-primary bg-white"
        >
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep(3)}
          variant="default"
          className="bg-primary text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
