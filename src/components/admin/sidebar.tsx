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

function AdminDashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#F5F5F5] w-2/12 pt-6 px-3.5 h-screen">
      <Link href="/admin" className="flex items-center px-2.5">
        <Image
          src="/images/candivet-logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl font-bold">Candivet</h1>
      </Link>

      <div className="flex items-center justify-center gap-3 mt-12">
        <Image
          src="https://ui-avatars.com/api/?background=random&rounded=true"
          alt="david admin"
          width={52}
          height={52}
          className="rounded-full w-12 h-12"
        />
        <div className="mr-6">
          <h1 className="text-lg font-bold">David Admin</h1>
          <p className="text-[#A4A4A4] text-sm">Admin</p>
        </div>
        <MoreIcon />
      </div>

      <ul className="mt-10">
        {[
          { icon: DashboardIcon, title: "Dashboard", path: "/admin" },
          { icon: MenuBoardIcon, title: "Support", path: "/admin/support" },
          { icon: DiagramIcon, title: "Feedback", path: "/admin/feedback" },
          { icon: HealthIcon, title: "Chat", path: "/admin/chat" },
          {
            icon: ClipboardTextIcon,
            title: "Post a Blog",
            path: "/admin/post",
          },
        ].map((item, i) => (
          <li key={i}>
            <Link
              href={item.path}
              className={classNames(
                "flex relative items-center w-full transition-all pl-6 gap-x-4 mb-3 cursor-pointer",
                "before:h-9 before:w-[6px] before:absolute before:-left-[1px] before:rounded-r",
                {
                  "before:bg-white": item.path === pathname,
                  "bg-primary text-white hover:bg-primary/80 transition-colors transform duration-300 font-bold py-4":
                    item.path === pathname,
                  "text-[#64748B] font-medium py-2": item.path !== pathname,
                }
              )}
            >
              <item.icon color={item.path === pathname ? "white" : "#64748B"} />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminDashboardSidebar;
