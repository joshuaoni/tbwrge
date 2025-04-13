import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  File,
  Loader2,
  PlusCircle,
  ShoppingBag,
  User,
} from "lucide-react";
import AllActivityDropDown from "@/components/all-activity-dropdown";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/actions/get-dashboard-stats";
import dynamic from "next/dynamic";
import { outfit } from "@/constants/app";
import ActivityFeed from "@/components/activity-feed";
import ArticlesCommunity from "@/components/articles-community";
import { AnalyticInfoCard } from "@/components/analytics/analytic-info-card";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

// Icons as components
const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const JobsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ViewsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InterviewsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V12L16 14"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HiredIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01L9 11.01"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RejectedIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 9L9 15"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9L15 15"
      stroke="#009379"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      icon: <BriefcaseBusiness size={20} className="text-primary" />,
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
        icon: <BriefcaseBusiness size={20} className="text-primary" />,
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

  const activities = [
    {
      id: "1",
      userName: "David Amiolehmen",
      jobTitle: "Product Designer",
      timeAgo: "2 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "2",
      userName: "Folajimi Bankole",
      jobTitle: "Product Designer",
      timeAgo: "12 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "3",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "4",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "5",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "6",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "7",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
    {
      id: "8",
      userName: "Jane Andrews",
      jobTitle: "Product Designer",
      timeAgo: "25 mins ago",
      profilePicture: "/Mask.png",
      status: "Applying" as const,
    },
  ];

  const articles = [
    {
      id: "1",
      text: "I'm preparing for an interview at Candivet. I am trying to prep but I don't know what to expect.",
      answers: 232,
      author: {
        name: "AR Jakir",
        avatar: "/Mask.png",
      },
      daysAgo: 3,
      lastFollowed: "11h",
    },
    {
      id: "2",
      text: "I'm preparing for an interview at Candivet. I am trying to prep but I don't know what to expect.",
      answers: 232,
      author: {
        name: "AR Jakir",
        avatar: "/Mask.png",
      },
      daysAgo: 3,
      lastFollowed: "11h",
    },
    {
      id: "3",
      text: "I'm preparing for an interview at Candivet. I am trying to prep but I don't know what to expect.",
      answers: 232,
      author: {
        name: "AR Jakir",
        avatar: "/Mask.png",
      },
      daysAgo: 3,
      lastFollowed: "11h",
    },
  ];

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} flex flex-col pb-12`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="">
          <div className="flex flex-col md:flex-row h-[40%]  mt-8 justify-between items-center">
            <div className="grid  md:w-[60%]  w-[70%] grid-cols-1 md:grid-cols-2 gap-6  ">
              {analytics.map((an) => (
                <AnalyticInfoCard {...an} />
              ))}
            </div>
            <div className="bg-[linear-gradient(119.31deg,#29AB91_0%,#004A37_55.79%,#11453B_100%)] rounded-lg shadow-lg mt-4 md:mt-0 md:w-[40%] h-fit py-6 ml-8  text-white flex flex-col p-4 justify-center space-y-4 text-center border">
              <h1 className="font-bold leading-[1.3] text-[20px] pt-4">
                Find the Right Candidate for <br /> Your Job
              </h1>
              <p className="text-[12px]">
                Accelerate your hiring with tools like CV vetting, job post
                creation, cover letter translation, and more designed to
                simplify your workflow.
              </p>
              <Button className="bg-white  md:w-[60%] text-base py-[20px] self-center text-[14px] text-primary font-bold ">
                Subscribe for premium
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 mt-[50px]">
          <div className="bg-[#F9F9F9] rounded-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Activity</h2>
              <AllActivityDropDown />
            </div>
            <div className="rounded-lg p-6 px-2">
              <ActivityFeed activities={activities} />
            </div>
          </div>

          <ArticlesCommunity articles={articles} />
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
                    onChange={(value) =>
                      setJobPost({ ...jobPost, description: value })
                    }
                  />
                </>
                <>
                  <label>Job Requirements</label>
                  <ReactQuill
                    value={jobPost.requirements}
                    onChange={(value) =>
                      setJobPost({ ...jobPost, requirements: value })
                    }
                  />
                </>

                <>
                  <label>Company Description</label>
                  <ReactQuill
                    value={jobPost.companyDescription}
                    onChange={(value) =>
                      setJobPost({ ...jobPost, companyDescription: value })
                    }
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

export default index;
