import React, { useState } from "react";
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

const index = () => {
  const [analytics, setAnalytics] = useState([
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
  return (
    <div className=" h-full flex flex-col ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <CreateJob />
      </div>
      <div className=" flex-1 ">
        <div className="flex h-[40%]  mt-8 justify-between items-center">
          <div className="grid grid-cols-2 gap-6  ">
            {analytics.map((an) => (
              <AnalyticInfoCard {...an} />
            ))}
          </div>
          <div className="w-[420px] h-full  text-white flex flex-col p-4 justify-center space-y-4 text-center border rounded-lg bg-gradient-to-br from-[#29AB91] to-[#065844]">
            <h1 className="font-extrabold text-2xl">
              Find the Perfect Candidate <br /> for the job
            </h1>
            <p className="text-sm">
              Accelerate your hiring with tools like CV vetting, job post
              creation, cover letter translation, and more designed to simplify
              your workflow.
            </p>
            <Button className="bg-white w-[50%] text-base py-6 self-center text-primary font-bold ">
              Subscribe for premium
            </Button>
          </div>
        </div>

        <div className="w-full p-4 h-[350px] mt-8 overflow-y-scroll bg-[#F9F9F9] rounded-lg">
          <div className="flex items-center justify-between ">
            <h1 className="font-bold  text-lg">Activity Feed</h1>
            <AllActivityDropDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateJob = () => {
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
                  <input
                    value={jobPost.description}
                    onChange={(e) => {
                      setJobPost({ ...jobPost, description: e.target.value });
                    }}
                    type="text"
                    placeholder="Briefly describe the job"
                    className="border p-2"
                  />
                </>
                <>
                  <label>Job Requirements</label>
                  <input
                    value={jobPost.requirements}
                    onChange={(e) => {
                      setJobPost({ ...jobPost, requirements: e.target.value });
                    }}
                    type="text"
                    placeholder="Briefly describe the job requirements"
                    className="border p-2"
                  />
                </>

                <>
                  <label>Company Description</label>
                  <input
                    value={jobPost.companyDescription}
                    onChange={(e) => {
                      setJobPost({
                        ...jobPost,
                        companyDescription: e.target.value,
                      });
                    }}
                    type="text"
                    placeholder="Briefly describe the company"
                    className="border p-2"
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
    <div className="shadow-md rounded-2xl justify-center p-4 bg-white h-28 flex flex-col w-80">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="text-sm font-light ">{title}</span>
      </div>
      <h1 className="text-2xl font-bold mt-4">{value}</h1>
    </div>
  );
};

export default index;
