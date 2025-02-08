import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, ShoppingBag, User } from "lucide-react";
import AllActivityDropDown from "@/components/all-activity-dropdown";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/actions/get-dashboard-stats";

const index = () => {
  const { userData } = useUserStore();
  const { data, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await getDashboardStats({
        token: userData?.token,
      });
      return response;
    },
  });
  const [analytics, setAnalytics] = useState<
    {
      title: string;
      value: number;
      icon: any;
    }[]
  >([
    {
      title: "Total Jobs Posts",
      value: 12,
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
    },
    {
      title: "Qualified Applicants",
      value: 69,
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      title: "Rejected Candidates",
      value: 1023,
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      title: "Total Applications",
      icon: <File className="w-6 h-6 text-primary" />,
      value: 2107,
    },
  ]);
  useEffect(() => {
    setAnalytics([
      {
        title: "Total Jobs Posts",
        value: data?.total_job_posts,
        icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      },
      {
        title: "Qualified Applicants",
        value: data?.qualified_candidates,
        icon: <User className="w-6 h-6 text-primary" />,
      },
      {
        title: "Rejected Candidates",
        value: data?.rejected_candidates,
        icon: <User className="w-6 h-6 text-primary" />,
      },
      {
        title: "Total Applications",
        icon: <File className="w-6 h-6 text-primary" />,
        value: data?.total_applications,
      },
    ]);
  }, [data]);

  return (
    <DashboardWrapper>
      <div className=" h-screen flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold ">Dashboard</h1>
        </div>
        <div className=" md:mt-12  ">
          <div className="flex flex-col md:flex-row h-[40%]  mt-8 justify-between items-center">
            <div className="grid  md:w-[60%]  w-[70%] grid-cols-1 md:grid-cols-2 gap-6  ">
              {analytics.map((an) => (
                <AnalyticInfoCard {...an} />
              ))}
            </div>
            <div className=" mt-4 md:mt-0 md:w-[40%] h-fit py-6 ml-8  text-white flex flex-col p-4 justify-center space-y-4 text-center border rounded-lg bg-gradient-to-br from-[#29AB91] to-[#065844]">
              <h1 className="font-extrabold text-2xl">
                Find the Perfect Candidate <br /> for the job
              </h1>
              <p className="text-sm">
                Accelerate your hiring with tools like CV vetting, job post
                creation, cover letter translation, and more designed to
                simplify your workflow.
              </p>
              <Button className="bg-white  md:w-[54%] text-base py-6 self-center text-primary font-bold ">
                Subscribe for premium
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full p-4 md:h-[300px] h-[800px] mt-8 overflow-y-scroll bg-[#F9F9F9] rounded-lg">
          <div className="flex items-center justify-between ">
            <h1 className="font-bold text-lg">Activity Feed</h1>
            <AllActivityDropDown />
          </div>
          {/* Add activity feed items here */}
        </div>
      </div>
    </DashboardWrapper>
  );
};

const CreateJob = () => {
  const [showOverview, setShowOverview] = React.useState(false);
  const [generatingPost, setGeneratingPost] = useState(false);
  const [jobPost, setJobPost] = React.useState({
    title: "",
    description: "",
    companyDescription: "",
    requirements: "",
  });
  const handleGenerateJobPost = () => {
    setGeneratingPost(true);
    setTimeout(() => {
      setGeneratingPost(false);
      setShowOverview(true);
    }, 5000);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary hover:bg-primary/90 transition-colors transform duration-300 flex items-center py-3 space-x-2 rounded-lg w-fit px-2 font-medium text-white mt-auto">
          <PlusCircle />
          <p className="text-sm font-bold">Create New Job Post</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        {!showOverview ? (
          <>
            {" "}
            <DialogHeader>
              <DialogTitle className="border-b  pb-6">
                Create a Job post
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <div className="flex flex-col space-y-4">
                <>
                  <label>Position Title</label>
                  <input
                    value={jobPost.title}
                    onChange={(e) => {
                      setJobPost({ ...jobPost, title: e.target.value });
                    }}
                    type="text"
                    placeholder="e.g Frontend Developer"
                    className="border p-2"
                  />
                </>

                <>
                  <label>Job Description</label>
                  <ReactQuill
                  value={jobPost.description}
                  onChange={(value) => setJobPost({ ...jobPost, description: value })}
                />
                </>
                <>
                  <label>Job Requirements</label>
                  <ReactQuill
                  value={jobPost.requirements}
                  onChange={(value) => setJobPost({ ...jobPost, requirements: value })}
                />
                </>

                <>
                  <label>Company Description</label>
                  <ReactQuill
                  value={jobPost.companyDescription}
                  onChange={(value) => setJobPost({ ...jobPost, companyDescription: value })}
                />
                </>

                <Button
                  disabled={
                    jobPost.title === "" ||
                    jobPost.description === "" ||
                    jobPost.requirements === "" ||
                    jobPost.companyDescription === ""
                  }
                  onClick={() => handleGenerateJobPost()}
                  className="bg-primary text-white flex items-center justify-center"
                >
                  {generatingPost ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Generate Job Post"
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <DialogHeader>
              <DialogTitle className="border-b pb-6">
                Job Post Overview
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <div className="flex flex-col space-y-4">
                <h1 className="font-semibold">Front End developer</h1>
                <div className="flex items-center">
                  <p className="font-bold">Company:</p>
                  <p>Example Corp</p>
                </div>
                <div className="inline-flex">
                  <p>
                    <p className="font-bold">Job Description:</p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Veniam vel quaerat magnam, quibusdam soluta corporis facere
                    necessitatibus nemo, provident debitis commodi unde voluptas
                    quia est sapiente autem tempore modi blanditiis.
                  </p>
                </div>
                <div className="inline-flex">
                  <p>
                    <p className="font-bold">Requirements:</p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Veniam vel quaerat magnam, quibusdam soluta corporis facere
                  </p>
                </div>
                <div className="flex items-center justify-between ">
                  <Button
                    className="w-[30%] bg-black text-white"
                    onClick={() => setShowOverview(false)}
                  >
                    Edit Post
                  </Button>
                  <Button
                    className="w-[30%] bg-black text-white"
                    onClick={() => setShowOverview(false)}
                  >
                    Copy Job Link
                  </Button>
                  <Button
                    className="w-[30%] bg-black text-white px-3"
                    onClick={() => setShowOverview(false)}
                  >
                    Copy Embed Code
                  </Button>
                </div>
                <Button className="bg-primary text-white">
                  Submit Application
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const AnalyticInfoCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: any;
}) => {
  return (
    <div className="shadow-md rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-full w-fit">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-sm font-light ">{title}</span>
      </div>
      <h1 className="text-2xl font-bold mt-4">{value}</h1>
    </div>
  );
};

export default index;
