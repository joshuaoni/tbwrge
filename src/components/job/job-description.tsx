import React from "react";
import UPLOAD from "../../../public/images/icons/upload.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";

const JobDescription = () => {
  return (
    <main className="h-full w-full space-x-6 flex p-4">
      <section className="w-[50%] flex flex-col">
        <h1 className="font-bold mt-3">Job Details</h1>
        <div className="space-y-6 flex flex-col mt-4">
          <div className="flex flex-col mt-4">
            <label htmlFor="Company">Company Website</label>
            <Input
              placeholder="Input Company Website"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Name</label>
            <Input
              placeholder="Input Company Name"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Description</label>
            <Textarea
              placeholder="Short Description"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Name</label>
            <div className="bg-[#EDF2F7] relative flex cursor-pointer items-center justify-center h-12 rounded-md border-none outline-none mt-2">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center space-x-2">
                <span className="text-[#87909E] text-sm">Upload Logo</span>
                <Image
                  src={UPLOAD}
                  alt=""
                  width={20}
                  height={20}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        <Button className="bg-primary px-8 mt-4 self-end w-fit text-white">
          Next
        </Button>
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
        </div>
      </section>
    </main>
  );
};

export default JobDescription;
