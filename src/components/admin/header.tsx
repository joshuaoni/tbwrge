import { inter, outfit } from "@/constants/app";
import classNames from "classnames";
import Image from "next/image";
import BellIcon from "../icons/bell";
import MoreIcon from "../icons/more";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/hooks/use-user-store";
import { ChevronDown, UserCircle } from "lucide-react";

function AdmindashboardHeader() {
  const pathname = usePathname();
  const { userData } = useUserStore();

  let title = "Dashboard";
  if (pathname === "/admin/post") title = "Post A Blog";
  else if (pathname === "/admin/support") title = "Support - Admin";
  else if (pathname === "/admin/feedback") title = "Feedback - Admin";
  else if (pathname === "/admin/chat") title = "Chat - Admin";

  return (
    <header
      className={classNames(
        outfit.className,
        "sticky top-0 w-full flex justify-between items-center py-6 px-6 bg-white border-b border-gray-100"
      )}
    >
      <h2 className="text-[#0F172A] text-2xl font-bold">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <BellIcon />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red rounded-full" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <UserCircle size={40} className="mr-2" />
          <div className="mr-2">
            <h1 className="text-sm text-[#0F172A] font-bold">
              {userData?.user?.name}
            </h1>
            <p className="text-[#64748B] text-xs">{userData?.user?.role}</p>
          </div>
          <ChevronDown className="text-[#64748B]" size={20} />
        </div>
      </div>
    </header>
  );
}

export default AdmindashboardHeader;
