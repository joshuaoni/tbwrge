import React, { useEffect, useState } from "react";
import UPLOAD from "../../../public/images/icons/upload.png";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "../ui/button";
import JobTypeDropDown from "./components/job-type";

const JobDetail = () => {
  const [jobType, setJobType] = useState("Select Job Type");
  const [detail, setDetail] = useState<{
    name: string;
    website: string;
    description: string;
    title: string;
    type: string;
    logo: any;
  }>({
    name: "",
    website: "",
    description: "",
    title: "",
    type: "",
    logo: "",
  });

  const storedDetails = JSON.parse(
    localStorage.getItem("job-creation-details") as string
  );
  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
  console.log("det", detail);
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    if (name === "name") {
      setDetail({ ...detail, name: value });
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          name: value,
        })
      );
    } else if (name === "website") {
      setDetail({ ...detail, website: value });
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          website: value,
        })
      );
    } else if (name === "description") {
      setDetail({ ...detail, description: value });
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          description: value,
        })
      );
    } else if (name === "title") {
      setDetail({ ...detail, title: value });
      localStorage.setItem(
        "job-creation-details",
        JSON.stringify({
          ...storedDetails,
          title: value,
        })
      );
    } else if (name === "logo") {
      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        const { files } = e.target;
        setDetail({ ...detail, logo: files?.[0] });
      }
    }
  };
  useEffect(() => {
    setDetail({
      ...detail,
      type: jobType,
    });
    localStorage.setItem(
      "job-creation-details",
      JSON.stringify({
        ...storedDetails,
        type: jobType,
      })
    );
  }, [jobType]);

  return (
    <main className="h-full w-full space-x-6 flex p-4">
      <section className="w-[50%] flex flex-col">
        <h1 className="font-bold mt-3">Job Details</h1>
        <div className="space-y-6 flex flex-col mt-4">
          <div className="flex flex-col mt-4">
            <label htmlFor="Company">Company Website</label>
            <Input
              value={detail.website}
              onChange={handleInput}
              name="website"
              placeholder="Input Company Website"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Name</label>
            <Input
              name="name"
              value={detail.name}
              onChange={handleInput}
              placeholder="Input Company Name"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Description</label>
            <Textarea
              name="description"
              onChange={handleInput}
              placeholder="Short Description"
              value={detail.description}
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Company Logo</label>
            <div className="bg-[#EDF2F7] relative flex cursor-pointer items-center justify-center h-12 rounded-md border-none outline-none mt-2">
              <input
                onChange={handleInput}
                name="logo"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {detail.logo !== "" ? (
                <p>{detail.logo.name}</p>
              ) : (
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
              )}
            </div>
          </div>
        </div>
        <Button className="bg-primary px-8 mt-4 self-end w-fit text-white">
          Next
        </Button>
      </section>
      <section className=" w-[50%]">
        <div className="mt-[66px]" />
        <div className="space-y-6 flex flex-col mt-4">
          <div className="flex flex-col">
            <label htmlFor="Company">Job Title</label>
            <Input
              name="title"
              value={detail.title}
              onChange={handleInput}
              placeholder="e.g Software Engineer"
              className="bg-[#EDF2F7] border-none outline-none mt-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Company">Job Type</label>
            <JobTypeDropDown jobType={jobType} setJobType={setJobType} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobDetail;
