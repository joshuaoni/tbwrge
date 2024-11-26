import { PencilIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { format } from "date-fns";
import SaveJobDialog from "../save-job-dialog";
const ReviewScreen = ({
  createdJob,
  setCurrentStep,
}: {
  createdJob: any;
  setCurrentStep: any;
}) => {
  const [information, setInformation] = React.useState([
    {
      title: "Job title",
      value: createdJob.job_title,
    },
    {
      title: "Job type",
      value: createdJob.job_type,
    },
    {
      title: "Job Description",
      value: createdJob.job_description,
    },
    {
      title: "Educational Requirements",
      value: createdJob.educational_requirements,
    },
    {
      title: "Required Skills",
      value: createdJob.required_skills,
    },
    {
      title: "Experience",
      value: "Minimum of 2 years",
    },
    {
      title: "Location  ",
      value: createdJob.job_location_name,
    },
    {
      title: "Salary Range",
      value:
        createdJob.salary_range_min +
        "-" +
        createdJob.salary_range_max +
        " per year",
    },
    {
      title: "Benefits",
      value: createdJob.additional_benefits,
    },
    {
      title: "Job ID",
      value: "JOB2343",
    },
    {
      title: "Job Expiry",
      value: format(new Date(createdJob.end_date), "dd/MM/yyyy"),
    },
  ]);

  console.log("the job is", createdJob);
  return (
    <main className="flex space-x-12 h-screen">
      <section className="h-full w-[60%] overflow-y-auto">
        <div className="flex items-center justify-between">
          <span>{createdJob.company_name}</span>
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex items-start my-4 justify-between">
          <span className="text-left  max-w-[50%]">
            {createdJob.company_description}
          </span>

          <span>{createdJob.company_website}</span>
        </div>

        <div className="flex items-center justify-between my-8 ">
          <h1 className="font-bold ">Job information</h1>
          <PencilIcon
            className="cursor-pointer"
            onClick={() => {
              setCurrentStep(1);
            }}
          />
        </div>

        <section className="space-y-6 ">
          {information.map((info: any) => (
            <div className="flex items-start justify-between ">
              <span className="font-semibold ">{info.title}:</span>

              {info.title === "Key Responsibilities" ? (
                <>
                  <ul className="list-disc ml-8">
                    {info.value.map((item: string) => (
                      <li className="font-light text-start flex-1  max-w-[500px] ">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <span className="font-light text-start flex-1  max-w-[500px] ">
                  {info.value}
                </span>
              )}
            </div>
          ))}
        </section>
      </section>
      <section className="h-full  w-[40%] flex flex-col pr-8 overflow-y-auto pb-12 ">
        <SaveJobDialog jobReferenceId={createdJob.reference} />
        <h1 className="font-bold">Job Application</h1>
        <section className="flex flex-col space-y-6 mt-4">
          <div className="flex flex-col space-y-3">
            <label>Full Name</label>
            <div>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Email</label>
            <div>
              <Input
                type="text"
                placeholder="Enter your email"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Phone Number</label>
            <div>
              <Input
                type="text"
                placeholder="Enter your phone Number"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Nationality</label>
            <div>
              <Input
                type="text"
                placeholder="Enter your nationality"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Country Of residence</label>
            <div>
              <Input
                type="text"
                placeholder="Enter your country of residence"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Skills Summary </label>
            <div>
              <Textarea
                placeholder="Highlight your skills and experience"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload CV </label>
            <div className="bg-[#EDF2F7] h-14 rounded-lg flex items-center px-6">
              <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                Choose File
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload Cover Letter(optional) </label>
            <div className="bg-[#EDF2F7] h-14 rounded-lg flex items-center px-6">
              <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                Choose File
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload Voice Note(optional) </label>
            <div className="bg-[#EDF2F7] h-14 rounded-lg flex items-center px-6">
              <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                Choose File
              </span>
            </div>
          </div>
          {createdJob.questions.map((question: any) => (
            <div className="flex flex-col space-y-3">
              <label>{question.text} </label>
              <div>
                <Input
                  type="text"
                  placeholder="Enter "
                  className="bg-[#EDF2F7]"
                />
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default ReviewScreen;
