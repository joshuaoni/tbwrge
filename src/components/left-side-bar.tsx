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
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import JobsDropdown from "./jobs-dropdown";
import LogoutModal from "./logout-modal";
import CoverLetterDropDown from "./ui/coverletter-dropdown";
import CvDropDown from "./ui/cv-dropdown";
import { outfit } from "@/constants/app";
import JobBoardIcon from "@/components/icons/job-board";

const LeftSideBar = () => {
  const router = useRouter();

  const { userData } = useUserStore();

  const [leftSideItems, setLeftSideItems] = React.useState(() => {
    const baseItems = [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        link: "/dashboard",
        active: false,
      },

      {
        title: "Job Board",
        icon: <JobBoardIcon size={20} />,
        link: "/dashboard/job-board",
        active: false,
      },
      {
        title: "Talent Pool",
        icon: <Users2 size={20} />,
        link: "/dashboard/talent-pool",
        active: false,
      },
    ];

    // Only add Posted Jobs for non-job seekers
    if (userData?.user?.role !== "job_seeker") {
      baseItems.splice(1, 0, {
        title: "Posted Jobs",
        icon: <ClipboardList size={20} />,
        link: "/dashboard/job-postings",
        active: false,
      });
    }
    if (userData?.user?.role === "job_seeker") {
      baseItems.splice(1, 0, {
        title: "My Applications",
        icon: <FileText size={20} />,
        link: "/dashboard/applications",
        active: false,
      });
    }
    return baseItems;
  });

  // Update leftSideItems when user role changes
  React.useEffect(() => {
    setLeftSideItems((prevItems) => {
      const baseItems = prevItems.filter(
        (item) => item.title !== "Posted Jobs"
      );
      if (userData?.user?.role !== "job_seeker") {
        baseItems.splice(1, 0, {
          title: "Posted Jobs",
          icon: <ClipboardList size={20} />,
          link: "/dashboard/job-postings",
          active: false,
        });
      }
      return baseItems;
    });
  }, [userData?.user?.role]);

  const [extras, setExtras] = React.useState([
    {
      title: "Submit An Article",
      icon: <ScrollText size={20} />,
      link: "/dashboard/submit-article",
      active: false,
    },
    {
      title: "Community",
      icon: <Users2 size={20} />,
      link: "/community",
      active: false,
    },
  ]);
  const [userLeftSideItems, setUserLeftSideItems] = React.useState([
    {
      title: "Billings & Subscription",
      icon: <CreditCard size={20} />,
      link: "/dashboard/billing",
      active: false,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      link: "/dashboard/settings/profile",
      active: false,
    },
    {
      title: "Feedback & Support",
      icon: <MessageSquare size={20} />,
      link: "/dashboard/feedback",
      active: false,
    },
    {
      title: "Logout",
      icon: <LogOut size={20} />,
      link: "/dashboard/logout",
      active: false,
    },
  ]);

  // Update userLeftSideItems when user role changes
  React.useEffect(() => {
    setUserLeftSideItems((prevItems) => {
      // Remove any existing 'Admin Dashboard' item
      const baseItems = prevItems.filter(
        (item) => item.title !== "Admin Dashboard"
      );
      if (userData?.user?.role === "admin") {
        // Find the index of 'Logout'
        const logoutIdx = baseItems.findIndex(
          (item) => item.title === "Logout"
        );
        // Insert 'Admin Dashboard' just above 'Logout'
        baseItems.splice(logoutIdx, 0, {
          title: "Admin Dashboard",
          icon: <Crown size={20} />,
          link: "/admin",
          active: false,
        });
      }
      return baseItems;
    });
  }, [userData?.user?.role]);

  return (
    <div
      className={`${outfit.className} h-screen pt-6 bg-[#F5F5F5] overflow-hidden sidebar`}
    >
      <div
        className={`${outfit.className} w-full h-full pt-4 bg-[#F5F5F5] pl-[16px] pr-[6px] overflow-y-auto sidebar [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#F5F5F5] [&::-webkit-scrollbar-thumb]:bg-[#A6CCB8] [&::-webkit-scrollbar-thumb]:rounded-full`}
      >
        <div className="flex mb-[36px] items-center ml-8">
          <UserCircle size={40} className="mr-2" />
          <div className="flex flex-col">
            <p className="font-bold">
              {userData?.user?.name ? userData?.user?.name : "Not Set"}
            </p>
            <p className="text-sm font-normal text-[#A4A4A4] ">HR Manager</p>
          </div>
        </div>
        {leftSideItems.map((item) => {
          return (
            <React.Fragment key={item.title}>
              <LeftSideBarItem
                item={item}
                setLeftSideItems={setLeftSideItems}
              />
              {item.title === "Dashboard" && (
                <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
              )}
            </React.Fragment>
          );
        })}
        <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
        <div className="flex flex-col ml-8 ">
          <div className="">
            <JobsDropdown />
            <CoverLetterDropDown />
            <CvDropDown />
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
        <div className="flex flex-col ">
          <div className="mb-2 w-full ">
            {extras.map((item) => {
              if (item.title === "Logout") {
                return <LogoutModal />;
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

        <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
        <div className="flex flex-col ">
          <h1 className="my-4 font-semibold text-[#6D6D6D] ml-8">User</h1>
          <div className="mb-24 w-full">
            {userLeftSideItems.map((item) => {
              if (item.title === "Logout") {
                return <LogoutModal />;
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
  const isActiveRoute =
    item.link === "/dashboard/job-board"
      ? pathName?.includes("/dashboard/job-board") || false
      : item.link === "/dashboard/talent-pool"
      ? pathName?.includes("/dashboard/talent-pool") || false
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
      } flex relative  items-center w-full transition-all py-3  pl-6 space-x-2 p-2  ${
        item.title === "Dashboard" ? "mb-2" : "mb-0"
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
      <div className={`${outfit.className} text-[16px]`}>{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
