import { useUserStore } from "@/hooks/use-user-store";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ScrollText,
  GraduationCap,
  Users2,
  User,
  Settings,
  MessageSquare,
  LogOut,
  CreditCard,
  BookOpen,
  UserCircle,
  ClipboardList,
  FileText,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import JobsDropdown from "./jobs-dropdown";
import LogoutModal from "./logout-modal";
import CoverLetterDropDown from "./ui/coverletter-dropdown";
import CvDropDown from "./ui/cv-dropdown";
import { outfit } from "@/constants/app";
import JobBoardIcon from "@/components/icons/job-board";
import { useTranslation } from "react-i18next";

const LeftSideBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { userData } = useUserStore();

  const [leftSideItems, setLeftSideItems] = React.useState(() => {
    const baseItems = [
      {
        title: t("nav.dashboard"),
        icon: <LayoutDashboard size={20} />,
        link: "/dashboard",
        active: false,
      },
      {
        title: t("nav.jobBoard"),
        icon: <JobBoardIcon size={20} />,
        link: "/dashboard/job-board",
        active: false,
      },
      {
        title: t("nav.talentPool"),
        icon: <Users2 size={20} />,
        link: "/dashboard/talent-pool",
        active: false,
      },
      {
        title: t("nav.aiSearch"),
        icon: <Sparkles size={20} />,
        link: "/dashboard/ai-search",
        active: false,
      },
    ];

    // Only add Posted Jobs for non-job seekers
    if (userData?.user?.role !== "job_seeker") {
      baseItems.splice(1, 0, {
        title: t("nav.postedJobs"),
        icon: <ClipboardList size={20} />,
        link: "/dashboard/job-postings",
        active: false,
      });
    }
    if (userData?.user?.role === "job_seeker") {
      baseItems.splice(1, 0, {
        title: t("nav.myApplications"),
        icon: <FileText size={20} />,
        link: "/dashboard/applications",
        active: false,
      });
    }
    return baseItems;
  });

  // Update leftSideItems when user role changes or language changes
  React.useEffect(() => {
    setLeftSideItems((prevItems) => {
      const baseItems = [
        {
          title: t("nav.dashboard"),
          icon: <LayoutDashboard size={20} />,
          link: "/dashboard",
          active: false,
        },
        {
          title: t("nav.jobBoard"),
          icon: <JobBoardIcon size={20} />,
          link: "/dashboard/job-board",
          active: false,
        },
        {
          title: t("nav.talentPool"),
          icon: <Users2 size={20} />,
          link: "/dashboard/talent-pool",
          active: false,
        },
        {
          title: t("nav.aiSearch"),
          icon: <Sparkles size={20} />,
          link: "/dashboard/ai-search",
          active: false,
        },
      ];

      if (userData?.user?.role !== "job_seeker") {
        baseItems.splice(1, 0, {
          title: t("nav.postedJobs"),
          icon: <ClipboardList size={20} />,
          link: "/dashboard/job-postings",
          active: false,
        });
      }
      if (userData?.user?.role === "job_seeker") {
        baseItems.splice(1, 0, {
          title: t("nav.myApplications"),
          icon: <FileText size={20} />,
          link: "/dashboard/applications",
          active: false,
        });
      }
      return baseItems;
    });
  }, [userData?.user?.role, t]);

  const [extras, setExtras] = React.useState(() => [
    {
      title: t("nav.submitArticle"),
      icon: <ScrollText size={20} />,
      link: "/dashboard/submit-article",
      active: false,
    },
    {
      title: t("nav.community"),
      icon: <Users2 size={20} />,
      link: "/dashboard/community",
      active: false,
    },
  ]);

  const [userLeftSideItems, setUserLeftSideItems] = React.useState(() => [
    {
      title: t("nav.billingSubscription"),
      icon: <CreditCard size={20} />,
      link: "/dashboard/billing",
      active: false,
    },
    {
      title: t("nav.settings"),
      icon: <Settings size={20} />,
      link: "/dashboard/settings/profile",
      active: false,
    },
    {
      title: t("nav.feedbackSupport"),
      icon: <MessageSquare size={20} />,
      link: "/dashboard/feedback",
      active: false,
    },
    {
      title: t("nav.logout"),
      icon: <LogOut size={20} />,
      link: "/dashboard/logout",
      active: false,
    },
  ]);

  // Update extras when language changes
  React.useEffect(() => {
    setExtras([
      {
        title: t("nav.submitArticle"),
        icon: <ScrollText size={20} />,
        link: "/dashboard/submit-article",
        active: false,
      },
      {
        title: t("nav.community"),
        icon: <Users2 size={20} />,
        link: "/dashboard/community",
        active: false,
      },
    ]);
  }, [t]);

  // Update userLeftSideItems when user role or language changes
  React.useEffect(() => {
    setUserLeftSideItems((prevItems) => {
      const baseItems = [
        {
          title: t("nav.billingSubscription"),
          icon: <CreditCard size={20} />,
          link: "/dashboard/billing",
          active: false,
        },
        {
          title: t("nav.settings"),
          icon: <Settings size={20} />,
          link: "/dashboard/settings/profile",
          active: false,
        },
        {
          title: t("nav.feedbackSupport"),
          icon: <MessageSquare size={20} />,
          link: "/dashboard/feedback",
          active: false,
        },
        {
          title: t("nav.logout"),
          icon: <LogOut size={20} />,
          link: "/dashboard/logout",
          active: false,
        },
      ];

      if (userData?.user?.role === "root") {
        // Find the index of 'Logout'
        const logoutIdx = baseItems.findIndex(
          (item) => item.title === t("nav.logout")
        );
        // Insert 'Admin Dashboard' just above 'Logout'
        baseItems.splice(logoutIdx, 0, {
          title: t("nav.adminDashboard"),
          icon: <Crown size={20} />,
          link: "/admin",
          active: false,
        });
      }
      return baseItems;
    });
  }, [userData?.user?.role, t]);

  return (
    <div
      className={`${outfit.className} h-screen bg-[#F5F5F5] overflow-hidden sidebar`}
    >
      <div
        className={`${outfit.className} w-full h-full pt-4 bg-[#F5F5F5] pl-[16px] pr-[6px] overflow-y-auto sidebar [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#F5F5F5] [&::-webkit-scrollbar-thumb]:bg-[#A6CCB8] [&::-webkit-scrollbar-thumb]:rounded-full`}
      >
        {leftSideItems.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <LeftSideBarItem
                item={item}
                setLeftSideItems={setLeftSideItems}
              />
              {item.title === t("nav.dashboard") && (
                <div className="h-[1px] w-full bg-[#A6CCB8] my-1" />
              )}
            </React.Fragment>
          );
        })}
        <div className="h-[1px] w-full bg-[#A6CCB8] my-1" />
        <div className="flex flex-col ml-8 ">
          <div className="">
            <JobsDropdown />
            <CoverLetterDropDown />
            <CvDropDown />
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#A6CCB8] my-1" />
        <div className="flex flex-col ">
          <div className="mb-2 w-full ">
            {extras.map((item) => {
              if (item.title === t("nav.logout")) {
                return <LogoutModal key="logout-modal" />;
              }
              return (
                <LeftSideBarItem
                  key={item.title}
                  item={item}
                  setLeftSideItems={setExtras}
                />
              );
            })}
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#A6CCB8] mb-1" />
        <div className="flex flex-col ">
          <h1 className="font-semibold text-[#6D6D6D] ml-8">
            {t("dashboard.user")}
          </h1>
          <div className="mb-24 w-full">
            {userLeftSideItems.map((item) => {
              if (item.title === t("nav.logout")) {
                return <LogoutModal key="logout-modal" />;
              }
              return (
                <LeftSideBarItem
                  key={item.title}
                  item={item}
                  setLeftSideItems={setUserLeftSideItems}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const LeftSideBarItem = ({ item, setLeftSideItems }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslation();

  const isActiveRoute =
    item.link === "/dashboard/job-board"
      ? pathName?.includes("/dashboard/job-board") || false
      : item.link === "/dashboard/talent-pool"
      ? pathName?.includes("/dashboard/talent-pool") || false
      : item.link === "/dashboard/ai-search"
      ? pathName?.includes("/dashboard/ai-search") || false
      : item.link === "/dashboard/settings/profile"
      ? pathName?.includes("/dashboard/settings/") || false
      : item.link === "/dashboard/applications"
      ? pathName?.includes("/dashboard/applications") || false
      : pathName === item.link;

  const handleClick = () => {
    setLeftSideItems((prevItems: any) => {
      return prevItems.map((prevItem: any) => {
        if (prevItem.title === item.title) {
          return { ...prevItem, active: true };
        }
        return { ...prevItem, active: false };
      });
    });
    router.push(item.link);
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`${
        outfit.className
      } flex relative  items-center w-full transition-all py-2 pl-6 space-x-2 p-2  ${
        item.title === t("nav.dashboard") ? "mb-2" : "mb-0"
      } cursor-pointer ${
        isActiveRoute
          ? "bg-primary text-white hover:bg-primary/80 transition-colors transform duration-300 border-l-2 border-l-primary font-bold"
          : " font-normal"
      }`}
    >
      <div
        className={`h-7 w-[5px] ${
          isActiveRoute ? "bg-white" : "bg-transparent"
        } absolute -left-[2px] rounded-r`}
      />
      <div className={`${isActiveRoute ? "text-white" : "text-primary"}`}>
        {item.icon}
      </div>
      <div className={`${outfit.className} text-[14px]`}>{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
