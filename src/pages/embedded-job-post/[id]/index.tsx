import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  let createdJob = {
    company_name: "Company Name",
    company_description: "Company Description",
    company_website: "Company Website",
    job_title: "Job Title",
    job_type: "Job Type",
    job_description: "Job Description",
    educational_requirements: "Educational Requirements",
    required_skills: "Required Skills",
    job_location_name: "Job Location",
    salary_range_min: "Salary Range Min",
    salary_range_max: "Salary Range Max",
    additional_benefits: "Additional Benefits",
    end_date: "2022-12-12",
    reference: id,
    questions: [
      {
        text: "Question 1",
      },
      {
        text: "Question 2",
      },
      {
        text: "Question 3",
      },
    ],
  };
  const [detail, setDetail] = useState<any>({
    fullname: "",
    email: "",
    phonenumber: "",
    nationality: "",
    residence: "",
    experience: "",
    skills: "",
    startDate: "",
    endDate: "",
    cv: "",
    coverletter: null,
    voicenote: null,
  });
  useEffect(() => {
    createdJob.questions.map((question) => {
      setDetail({ ...detail, [question.text]: "" });
    });
  }, []);
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
      value: createdJob.reference,
    },
    {
      title: "Job Expiry",
      value: format(new Date(createdJob.end_date), "dd/MM/yyyy"),
    },
  ]);
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    if (name === "fullname") {
      setDetail({ ...detail, fullname: value });
    } else if (name === "email") {
      setDetail({ ...detail, email: value });
    } else if (name === "phonenumber") {
      setDetail({ ...detail, phonenumber: value });
    } else if (name === "nationality") {
      setDetail({ ...detail, nationality: value });
    } else if (name === "residence") {
      setDetail({ ...detail, residence: value });
    } else if (name === "experience") {
      setDetail({ ...detail, experience: value });
    } else if (name === "skills") {
      setDetail({ ...detail, skills: value });
    } else if (name === "cv") {
      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        const { files } = e.target;
        setDetail({ ...detail, cv: files?.[0] });
      }
    } else if (name === "coverletter") {
      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        setDetail({ ...detail, coverletter: e?.target?.files?.[0] as any });
      }
    } else if (name === "voicenote") {
      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        setDetail({ ...detail, voicenote: e?.target?.files?.[0] as any });
      }
    } else if (
      createdJob.questions.some((question) => question.text === name)
    ) {
      setDetail({ ...detail, [name]: value });
    }
  };
  return (
    <main className="flex flex-col md:flex-row overflow-y-auto md:space-x-12 h-screen p-4 md:p-24">
      <section className="h-full md:w-[60%] md:overflow-y-auto">
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
      <section className="h-full mt-12  md:w-[40%] flex flex-col pr-8 md:overflow-y-auto pb-12  ">
        <h1 className="font-bold">Job Application</h1>
        <section className="flex flex-col space-y-6 mt-4">
          <div className="flex flex-col space-y-3">
            <label>Full Name</label>
            <div>
              <Input
                value={detail.fullname}
                onChange={handleInput}
                type="text"
                placeholder="Enter your full name"
                className="bg-[#EDF2F7]"
                name="fullname"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Email</label>
            <div>
              <Input
                value={detail.email}
                onChange={handleInput}
                name="email"
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
                value={detail.phonenumber}
                onChange={handleInput}
                name="phonenumber"
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
                value={detail.nationality}
                onChange={handleInput}
                name="nationality"
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
                value={detail.residence}
                onChange={handleInput}
                name="residence"
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
                value={detail.skills}
                onChange={handleInput}
                name="skills"
                placeholder="Highlight your skills and experience"
                className="bg-[#EDF2F7]"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload CV </label>
            <div className="bg-[#EDF2F7] relative flex cursor-pointer items-center pl-4  h-12 rounded-md border-none outline-none mt-2">
              <input
                onChange={handleInput}
                name="cv"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {detail.cv !== null ? (
                <p>{detail.cv?.name}</p>
              ) : (
                <div className="flex space-x-2">
                  <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                    Choose File
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload Cover Letter(optional) </label>
            <div className="bg-[#EDF2F7] relative flex cursor-pointer items-center  pl-4 h-12 rounded-md border-none outline-none mt-2">
              <input
                onChange={handleInput}
                name="coverletter"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {detail.coverletter !== null ? (
                <p>{detail.coverletter?.name}</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                    Choose File
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label>Upload Voice Note(optional) </label>
            <div className="bg-[#EDF2F7] relative flex cursor-pointer items-center pl-4  h-12 rounded-md border-none outline-none mt-2">
              <input
                onChange={handleInput}
                name="voicenote"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {detail.voicenote !== null ? (
                <p>{detail.voicenote?.name}</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="h-fit w-fit border-2 border-black p-[2px] text-xs">
                    Choose File
                  </span>
                </div>
              )}
            </div>
          </div>
          {createdJob.questions.map((question) => (
            <div className="flex flex-col space-y-3">
              <label>{question.text} </label>
              <div>
                <Input
                  value={detail[question.text]}
                  onChange={handleInput}
                  name={question.text}
                  type="text"
                  placeholder="Enter "
                  className="bg-[#EDF2F7]"
                />
              </div>
            </div>
          ))}
          <Button className="bg-primary w-40 self-center text-white">
            Submit Application
          </Button>
        </section>
      </section>
    </main>
  );
};

export default index;
