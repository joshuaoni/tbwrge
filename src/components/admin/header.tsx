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
        "flex justify-between items-center py-6 px-6 bg-white border-b border-gray-100"
      )}
    >
      <h2 className="text-[#0F172A] text-2xl font-bold">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <BellIcon />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red rounded-full" />
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 border-l px-4 min-w-0 max-w-xs overflow-hidden">
          {userData?.user?.profile_picture ? (
            <Image
              src={userData?.user?.profile_picture}
              alt={`${userData?.user?.name}`}
              width={30}
              height={30}
              className="rounded-full md:w-[30px] md:h-[30px] object-cover"
            />
          ) : (
            <UserCircle size={32} className="text-gray-600" />
          )}
          <div className="flex flex-col min-w-0">
            <p className="font-medium text-sm truncate overflow-ellipsis">
              {userData?.user?.name || "Not Set"}
            </p>
            <p className="text-xs text-gray-500 truncate overflow-ellipsis">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdmindashboardHeader;
