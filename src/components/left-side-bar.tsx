import {
  House,
  IdCard,
  LogOut,
  Settings,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import candivetlogo from "../../public/images/candivet-logo.png";
import JobsDropdown from "./jobs-dropdown";
import CoverLetterDropDown from "./ui/coverletter-dropdown";
import CvDropDown from "./ui/cv-dropdown";
import LogoutModal from "./logout-modal";

const LeftSideBar = () => {
  const router = useRouter();
  const [leftSideItems, setLeftSideItems] = React.useState([
    {
      title: "Dashboard",
      icon: <House />,
      link: "/dashboard-home",
      active: false,
    },
    {
      title: "Job Posts",
      icon: <ShoppingBag />,
      link: "/job-postings",
      active: false,
    },
    {
      title: "Candidates",
      icon: <UserCircle />,
      link: "/candidates",
      active: false,
    },
  ]);

  const [userLeftSideItems, setUserLeftSideItems] = React.useState([
    {
      title: "Billings & Subscription",
      icon: <IdCard />,
      link: "/billings",
      active: false,
    },
    {
      title: "Settings",
      icon: <Settings />,
      link: "/settings",
      active: false,
    },
    {
      title: "Logout",
      icon: <LogOut />,
      link: "/logout",
      active: false,
    },
  ]);
  return (
    <div className="fixed left-0 h-screen pt-6 w-[20%] bg-[#e1e1e1]   pl-[12px] pr-[12px]">
      <div
        onClick={() => {
          router.push("/dashboard-home");
        }}
        className="flex items-center ml-6 cursor-pointer"
      >
        <Image src={candivetlogo} alt="" width={50} height={50} />
        <h1 className="text-3xl font-bold">Candivet</h1>
      </div>
      <div className="fixed left-0  overflow-y-scroll h-screen pt-16 w-[20%] bg-[#e1e1e1]   pl-[12px] pr-[12px]">
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
          <h1 className="my-4 font-semibold text-[#6D6D6D]">Tools</h1>
          <div className="space-y-4">
            <JobsDropdown />
            <CoverLetterDropDown />
            <CvDropDown />
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
