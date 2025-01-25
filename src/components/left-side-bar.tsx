import {
  House,
  IdCard,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  UserCircle,
  Users2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import JobsDropdown from "./jobs-dropdown";
import LogoutModal from "./logout-modal";
import CoverLetterDropDown from "./ui/coverletter-dropdown";
import CvDropDown from "./ui/cv-dropdown";

const LeftSideBar = () => {
  const router = useRouter();
  const [leftSideItems, setLeftSideItems] = React.useState([
    {
      title: "Dashboard",
      icon: <House />,
      link: "/dashboard",
      active: false,
    },
    {
      title: "Posted Jobs",
      icon: <ShoppingBag />,
      link: "/dashboard/job-postings",
      active: false,
    },
    {
      title: "Job Board",
      icon: <ShoppingBag />,
      link: "/dashboard/job-board",
      active: false,
    },
  ]);
  const [extras, setExtras] = React.useState([
    {
      title: "Submit An Article",
      icon: <User />,
      link: "/dashboard/submit-article",
      active: false,
    },
    {
      title: "Community",
      icon: <Users2 />,
      link: "/community",
      active: false,
    },
    {
      title: "Training",
      icon: <User />,
      link: "/dashboard/training",
      active: false,
    },
  ]);

  const [userLeftSideItems, setUserLeftSideItems] = React.useState([
    {
      title: "Billings & Subscription",
      icon: <IdCard />,
      link: "/dashboard/billings",
      active: false,
    },
    {
      title: "Settings",
      icon: <Settings />,
      link: "/dashboard/settings",
      active: false,
    },
    {
      title: "Feedback & Support",
      icon: <Settings />,
      link: "/dashboard/feedback",
      active: false,
    },
    {
      title: "Logout",
      icon: <LogOut />,
      link: "/dashboard/logout",
      active: false,
    },
  ]);
  return (
    <div className=" h-screen pt-6 bg-[#e1e1e1]  ">
      <div className=" w-full overflow-y-scroll h-screen pt-4  bg-[#e1e1e1]   pl-[12px] pr-[12px]">
        <div className="flex mb-[36px] items-center ml-8">
          <UserCircle size={40} className="mr-2" />
          <div className="flex flex-col">
            <p className="font-bold">David</p>
            <p className="text-sm font-normal text-[#A4A4A4] ">HR Manager</p>
          </div>
        </div>
        {leftSideItems.map((item) => {
          return (
            <LeftSideBarItem
              key={item.title}
              item={item}
              setLeftSideItems={setLeftSideItems}
            />
          );
        })}
        <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
        <div className="flex flex-col ml-8 ">
          <div className="space-y-4">
            <JobsDropdown />
            <CoverLetterDropDown />
            <CvDropDown />
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#A6CCB8] my-2" />
        <div className="flex flex-col ">
          <div className="space-y-6 mb-4 w-full">
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
          <div className="space-y-6 mb-24 w-full">
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
  const isActiveRoute = item.link === pathName;

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
      className={`flex relative  items-center w-full transition-all py-3  pl-6 space-x-2 p-2  mb-3  cursor-pointer ${
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
      {item.icon}
      <div className="text-[16px]">{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
