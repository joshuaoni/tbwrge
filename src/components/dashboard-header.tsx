import { PlusCircle, Search, UserCircle } from "lucide-react";
import Link from "next/link";
import LanguageSelectorDropDown from "./language-selector-dropdown";
import { Input } from "./ui/input";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUserStore } from "@/hooks/use-user-store";

interface DashboardHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const DashboardHeader = ({
  searchTerm,
  setSearchTerm,
}: DashboardHeaderProps) => {
  const router = useRouter();
  const { userData } = useUserStore();

  return (
    <div className="ml-[260px] w-[calc(100vw-260px)] border-b h-20 z-20 bg-white flex items-center px-4 pl-12 fixed top-0">
      <div className="flex w-full items-center justify-between mt-2">
        {/* Search */}
        <div className="flex items-center border px-2 bg-[#F0F0F0] rounded-full mr-4">
          <Search color="#898989" />
          <Input
            placeholder="Search for jobs"
            className="bg-[#F0F0F0] border-none placeholder:text-[#898989] w-52 rounded-full outline-none focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard/talent-pool/chat")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Chat"
            >
              <Image
                src="/Message-Icon.png"
                alt="Chat"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
            <LanguageSelectorDropDown />
            <Link
              href="/dashboard/create"
              className="bg-primary cursor-pointer hover:bg-primary/90 transition-colors transform duration-300 flex items-center py-3 space-x-2 rounded-lg w-fit px-2 font-medium text-white mt-auto"
            >
              <PlusCircle />
              <p className="text-sm font-bold">Create New Job Post</p>
            </Link>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 border-l px-4 min-w-0 max-w-xs overflow-hidden">
            <UserCircle size={32} className="text-gray-600" />
            <div className="flex flex-col min-w-0">
              <p className="font-medium text-sm truncate overflow-ellipsis">
                {userData?.user?.name || "Not Set"}
              </p>
              <p className="text-xs text-gray-500 truncate overflow-ellipsis">
                {userData?.user?.role === "recruiter"
                  ? "HR Manager"
                  : "Job Seeker"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
