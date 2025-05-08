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
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import JobsDropdown from "./jobs-dropdown";
import LogoutModal from "./logout-modal";
import CoverLetterDropDown from "./ui/coverletter-dropdown";
import CvDropDown from "./ui/cv-dropdown";

const LeftSideBar = () => {
  const router = useRouter();

  const { userData } = useUserStore();

  const [leftSideItems, setLeftSideItems] = React.useState([
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/dashboard",
      active: false,
    },
    {
      title: "Posted Jobs",
      icon: <BriefcaseBusiness size={20} />,
      link: "/dashboard/job-postings",
      active: false,
    },
    {
      title: "Job Board",
      icon: <BriefcaseBusiness size={20} />,
      link: "/dashboard/job-board",
      active: false,
    },
    {
      title: "Talent Pool",
      icon: <BriefcaseBusiness size={20} />,
      link: "/dashboard/talent-pool",
      active: false,
    },
  ]);
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
      link: "/dashboard/billings",
      active: false,
    },
    // {
    //   title: "Teams",
    //   icon: <User />,
    //   link: "/dashboard/billings",
    //   active: false,
    // },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      link: "/dashboard/settings",
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

  return (
    <div className="h-screen pt-6 bg-[#F5F5F5] overflow-hidden sidebar">
      <div className="w-full h-full pt-4 bg-[#F5F5F5] pl-[16px] pr-[6px] overflow-y-auto sidebar [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#F5F5F5] [&::-webkit-scrollbar-thumb]:bg-[#A6CCB8] [&::-webkit-scrollbar-thumb]:rounded-full">
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
            <div className="py-3">
              <JobsDropdown />
            </div>
            <div className="py-3">
              <CoverLetterDropDown />
            </div>
            <div className="py-3">
              <CvDropDown />
            </div>
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
      className={`flex relative  items-center w-full transition-all py-3  pl-6 space-x-2 p-2  ${
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
      <div className="text-[16px]">{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
