import { inter } from "@/constants/app";
import classNames from "classnames";
import Image from "next/image";
import BellIcon from "../icons/bell";
import MoreIcon from "../icons/more";

function AdmindashboardHeader() {
  return (
    <header
      className={classNames(
        inter.className,
        "sticky top-0 w-full flex justify-between items-center py-6 px-8"
      )}
    >
      <h2 className="text-[#0F172A] text-2xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <BellIcon />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red rounded-full" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Image
            src="https://ui-avatars.com/api/?background=random&rounded=true"
            alt="david admin"
            width={52}
            height={52}
            className="rounded-full w-12 h-12"
          />
          <div className="mr-2">
            <h1 className="text-sm text-[#0F172A] font-bold">Andela</h1>
            <p className="text-[#64748B] text-xs">Product Manager</p>
          </div>
          <MoreIcon />
        </div>
      </div>
    </header>
  );
}

export default AdmindashboardHeader;
