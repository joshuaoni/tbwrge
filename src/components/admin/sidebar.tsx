import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ClipboardTextIcon from "../icons/clipboard-text";
import DashboardIcon from "../icons/dashhboard";
import DiagramIcon from "../icons/diagram";
import HealthIcon from "../icons/health";
import MenuBoardIcon from "../icons/menu-board";
import MoreIcon from "../icons/more";
import { UserCircle } from "lucide-react";
import { useUserStore } from "@/hooks/use-user-store";
import { outfit } from "@/constants/app";

function AdminDashboardSidebar() {
  const pathname = usePathname();
  const { userData } = useUserStore();
  return (
    <aside
      className={`${outfit.className} bg-[#F5F5F5] w-[300px] pt-2 px-3.5 pl-4 h-screen fixed left-0 top-0 overflow-y-auto`}
    >
      <Link href="/admin" className="flex ml-[14px] mt-4 items-center px-2.5">
        <div className="flex items-center cursor-pointer justify-center">
          <div className="flex items-center justify-center rounded-[6.96px] bg-[#065844] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
            <Image
              src="/header-final.png"
              alt=""
              width={32}
              height={29.2}
              className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
            />
          </div>
          <h1
            className={`${outfit.className} ml-2 text-black text-xl md:text-3xl font-bold`}
          >
            Candivet
          </h1>
        </div>
      </Link>

      {/* <div className="flex items-center justify-center gap-3 mt-12">
        <UserCircle size={40} className="text-black" />
        <div className="mr-6">
          <h1 className="text-lg font-bold">{userData?.user?.name}</h1>
          <p className="text-[#A4A4A4] text-sm">{userData?.user?.role}</p>
        </div>
        <MoreIcon />
      </div> */}

      <ul className="mt-6">
        {[
          { icon: DashboardIcon, title: "Dashboard", path: "/admin" },
          { icon: MenuBoardIcon, title: "Support", path: "/admin/support" },
          { icon: DiagramIcon, title: "Feedback", path: "/admin/feedback" },
          { icon: HealthIcon, title: "Chat", path: "/admin/chat" },
          {
            icon: MenuBoardIcon,
            title: "Enterprise",
            path: "/admin/enterprise",
          },
          {
            icon: ClipboardTextIcon,
            title: "Post a Blog",
            path: "/admin/post",
          },
          {
            icon: DashboardIcon,
            title: "User Dashboard",
            path: "/dashboard",
          },
        ].map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={classNames(
                "flex relative items-center w-full transition-all pl-8 gap-x-2 cursor-pointer",
                "before:h-9 before:w-[6px] before:absolute before:-left-[1px] before:rounded-r",
                {
                  "before:bg-white": item.path === pathname,
                  "bg-primary text-white hover:bg-primary/80 transition-colors transform duration-300 font-bold py-2":
                    item.path === pathname,
                  "text-[#64748B] font-medium py-2": item.path !== pathname,
                }
              )}
            >
              <item.icon color={item.path === pathname ? "white" : "#64748B"} />
              <span className="text-sm">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminDashboardSidebar;
