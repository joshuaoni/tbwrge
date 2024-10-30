import { House, ShoppingBag } from "lucide-react";
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
  ]);
  return (
    <div className="fixed left-0 h-screen pt-24 w-[20%] bg-[#e1e1e1]   p-4">
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
      className={`flex items-center space-x-2 p-2  mb-4 rounded-r-3xl cursor-pointer ${
        isActiveRoute ? "bg-primary text-white" : ""
      }`}
    >
      {item.icon}
      <div className="text-sm">{item.title}</div>
    </div>
  );
};

export default LeftSideBar;
