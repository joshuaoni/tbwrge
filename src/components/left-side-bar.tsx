import { House, ShoppingBag, User, UserCircle } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

const LeftSideBar = () => {
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
  return (
    <div className="fixed left-0 h-screen pt-24 w-[20%] bg-[#e1e1e1]   pl-[32px] pr-[24px]">
      <div className="flex mb-[36px] items-center">
        <UserCircle size={40} className="mr-2" />
        <div className="flex flex-col">
          <p className="font-bold">David</p>
          <p className="text-sm font-normal text-[#A4A4A4] ">HR Manager</p>
        </div>
      </div>
      {leftSideItems.map((item) => {
        return (
          <LeftSideBarItem item={item} setLeftSideItems={setLeftSideItems} />
        );
      })}
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
      className={`flex items-center transition-all  pl-6 space-x-2 p-2  mb-6  cursor-pointer ${
        isActiveRoute
          ? "bg-white text-primary border-l-2 border-l-primary font-extrabold"
          : " font-semibold"
      }`}
    >
      {item.icon}
      <div className="text-sm">{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
