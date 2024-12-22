import { getJobDetail } from "@/actions/get-job-detail";
import { submitJobApplication } from "@/actions/submit-job-application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/hooks/use-user-store";
import { IJob } from "@/interfaces/job";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { StopCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RecordIcon from "../../../../public/images/icons/microphone.png";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [jobDetails, setJobDetails] = useState<IJob>();
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const { userData } = useUserStore();
  const { data } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await getJobDetail({
        job_id: id as string,
        token: userData?.token,
      });
      setJobDetails(response);
      return response;
    },
  });
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
    cv: null,
    coverletter: null,
    voicenote: null,
  });
  useEffect(() => {
    jobDetails?.questions.map((question) => {
      setDetail({ ...detail, [question.text]: "" });
    });
  }, []);
  const [information, setInformation] = React.useState<
    {
      title: string;
      value: any;
    }[]
  >([
    {
      title: "Job title",
      value: "",
    },
    {
      title: "Job type",
      value: "",
    },
    {
      title: "Job Description",
      value: "",
    },
    {
      title: "Educational Requirements",
      value: "",
    },
    {
      title: "Required Skills",
      value: "",
    },
    {
      title: "Experience",
      value: "Minimum of 2 years",
    },
    {
      title: "Location  ",
      value: "",
    },
    {
      title: "Salary Range",
      value: "" + "-" + "" + " per year",
    },
    {
      title: "Benefits",
      value: "",
    },
    {
      title: "Job ID",
      value: "",
    },
    {
      title: "Job Expiry",
      value: "",
    },
  ]);
  useEffect(() => {
    setInformation([
      {
        title: "Job title",
        value: jobDetails?.job_title,
      },
      {
        title: "Job type",
        value: jobDetails?.job_type,
      },
      {
        title: "Job Description",
        value: jobDetails?.job_description,
      },
      {
        title: "Educational Requirements",
        value: jobDetails?.required_skills,
      },
      {
        title: "Required Skills",
        value: jobDetails?.required_skills,
      },
      {
        title: "Experience",
        value: jobDetails?.years_of_experience_required,
      },
      {
        title: "Location  ",
        value: jobDetails?.job_location_name,
      },
      {
        title: "Salary Range",
        value:
          jobDetails?.salary_range_min +
          "-" +
          jobDetails?.salary_range_max +
          " per year",
      },
      {
        title: "Benefits",
        value: jobDetails?.additional_benefits,
      },
      {
        title: "Job ID",
        value: jobDetails?.reference,
      },
      {
        title: "Job Expiry",
        value:
          jobDetails?.end_date != undefined &&
          format(new Date(jobDetails?.end_date as any), "dd/MM/yyyy"),
      },
    ]);
  }, [jobDetails]);
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access is required to record audio.");
    }
  };
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  const handleSubmitJobApplication = async () => {
    const response = await submitJobApplication({
      job_id: id,
      email: detail.email,
      name: detail.fullname,
      phone: detail.phonenumber,
      nationality: detail.nationality,
      country_of_residence: detail.residence,
      experience: detail.experience,
      skills: detail.skills,
      cv: detail.cv,
      cover_letter: detail.coverletter,
      voicenote: audioUrl,
      answers: jobDetails?.questions.map(
        (question: any) => detail[question.text]
      ),
      token: userData?.token,
    });
  };

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
      jobDetails?.questions.some((question) => question.text === name)
    ) {
      setDetail({ ...detail, [name]: value });
    }
  };
  return (
    <main className="flex flex-col md:flex-row overflow-y-auto md:space-x-12 h-screen p-4 md:p-24">
      <section className="h-full md:w-[60%] md:overflow-y-auto">
        <div className="flex items-center justify-between">
          <span>{jobDetails?.company_name}</span>
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex items-start my-4 justify-between">
          <span className="text-left  max-w-[50%]">
            {jobDetails?.company_description}
          </span>

          <span>{jobDetails?.company_website}</span>
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
            <label>Relevant Experience </label>
            <div>
              <Textarea
                value={detail.experience}
                onChange={handleInput}
                name="experience"
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
                accept="file/*"
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
                accept="file/*"
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
            <div className="h-12 bg-[#EDF2F7] w-full rounded-md flex items-center justify-between px-3 my-4 border">
              <span className="text-xs font-light">Record</span>
              {isRecording ? (
                <StopCircleIcon
                  color="red"
                  onClick={() => {
                    isRecording
                      ? handleStopRecording()
                      : handleStartRecording();
                  }}
                  className="animate-pulse cursor-pointer "
                />
              ) : (
                <Image
                  onClick={() => {
                    isRecording
                      ? handleStopRecording()
                      : handleStartRecording();
                  }}
                  className="cursor-pointer"
                  src={RecordIcon}
                  alt=""
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          {jobDetails?.questions.map((question) => (
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
          <Button
            onClick={() => {
              handleSubmitJobApplication();
            }}
            className="bg-primary w-40 self-center text-white"
          >
            Submit Application
          </Button>
        </section>
      </section>
    </main>
  );
};

export default index;
