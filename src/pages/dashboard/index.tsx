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
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

const index = () => {
  const { t } = useTranslation();
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
      title: t("dashboard.totalJobPosts"),
      value: 12,
      icon: <BriefcaseBusiness size={20} className="text-primary" />,
    },
    {
      title: t("dashboard.qualifiedApplicants"),
      value: 69,
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      title: t("dashboard.rejectedCandidates"),
      value: 1023,
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      title: t("dashboard.totalApplications"),
      icon: <File className="w-6 h-6 text-primary" />,
      value: 2107,
    },
  ]);
  useEffect(() => {
    setAnalytics([
      {
        title: t("dashboard.totalJobPosts"),
        value: data?.total_job_posts,
        icon: <BriefcaseBusiness size={20} className="text-primary" />,
      },
      {
        title: t("dashboard.qualifiedApplicants"),
        value: data?.qualified_candidates,
        icon: <User className="w-6 h-6 text-primary" />,
      },
      {
        title: t("dashboard.rejectedCandidates"),
        value: data?.rejected_candidates,
        icon: <User className="w-6 h-6 text-primary" />,
      },
      {
        title: t("dashboard.totalApplications"),
        icon: <File className="w-6 h-6 text-primary" />,
        value: data?.total_applications,
      },
    ]);
  }, [data, t]);

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
          <h1 className="text-2xl font-bold">{t("nav.dashboard")}</h1>
        </div>
        <div className="">
          <div className="flex flex-col md:flex-row h-[40%]  mt-8 justify-between items-center">
            <div className="analytics grid md:w-[60%] w-[70%] grid-cols-1 md:grid-cols-2 gap-6  ">
              {analytics.map((an, index) => (
                <AnalyticInfoCard key={index} {...an} />
              ))}
            </div>
            <div className="find-box bg-[linear-gradient(119.31deg,#29AB91_0%,#004A37_55.79%,#11453B_100%)] rounded-lg shadow-lg mt-4 md:mt-0 md:w-[40%] h-[248px] py-6 ml-8  text-white flex flex-col p-4 justify-center space-y-4 text-center border">
              <h1 className="font-bold leading-[1.3] text-[20px] pt-4">
                {t("dashboard.findRightCandidate")}
              </h1>
              <p className="text-[12px]">{t("dashboard.accelerateHiring")}</p>
              <Button className="bg-white  md:w-[60%] text-base py-[20px] self-center text-[14px] text-primary font-bold ">
                {t("dashboard.subscribePremium")}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 mt-[50px]">
          <div className="bg-[#F9F9F9] rounded-lg p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">
                {t("dashboard.recentActivity")}
              </h2>
              <AllActivityDropDown />
            </div>
            <div className="rounded-lg p-6 px-2">
              <ActivityFeed activities={activities} />
            </div>
          </div>

          <ArticlesCommunity />
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
