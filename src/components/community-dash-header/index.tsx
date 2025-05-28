import React, { useState } from "react";
import Image from "next/image";
import { outfit } from "@/constants/app";
import { useRouter } from "next/router";
import {
  Search,
  Home,
  Settings,
  MessageCircle,
  Bell,
  ChevronDown,
  Menu,
  X,
  UserCircleIcon,
} from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { useUserStore } from "@/hooks/use-user-store";

const CommunityDashHeader = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full px-4 md:px-16 z-20 fixed flex items-center justify-between bg-white top-0 border-b py-3">
        {/* Left: Logo and Brand */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
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
              className={`${outfit.className} ml-2 text-xl md:text-3xl font-bold`}
            >
              Candivet
            </h1>
          </div>
        </div>

        {/* Center: Navigation and Search - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center max-w-2xl">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image src="/home.png" alt="Home" width={20} height={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FaUsers className="w-6 h-6" />
          </button>
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here to search..."
                className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 text-sm"
              />
              <Search className="w-[18px] h-[18px] text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Mobile Search and Menu Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 border border-gray-300 rounded-full"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Right: Actions and Profile - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4">
          <button className="hover:bg-gray-100 rounded-lg p-1.5">
            <Image
              src="/icons/message.svg"
              alt="Messages"
              width={24}
              height={24}
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image src="/noti.png" alt="Home" width={20} height={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-full">
            {userData?.user?.profile_picture ? (
              <Image
                src={userData?.user?.profile_picture}
                alt={`${userData?.user?.name} `}
                width={30}
                height={30}
                className="rounded-full md:w-[30px] md:h-[30px]"
              />
            ) : (
              <UserCircleIcon className="w-8 h-8 text-gray-500" />
            )}
            <span className="text-sm font-medium">David</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="fixed top-[60px] left-0 right-0 bg-white z-20 px-4 py-3 border-b md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Type here to search..."
              className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 text-sm"
              autoFocus
            />
            <Search className="w-[18px] h-[18px] text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[60px] left-0 right-0 bg-white z-20 border-b md:hidden">
          <div className="px-4 py-2 space-y-2">
            <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
              <Home className="w-5 h-5" />
              <span className="text-sm">Home</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
              <Settings className="w-5 h-5" />
              <span className="text-sm">Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
              <Image
                src="/icons/message.svg"
                alt="Messages"
                width={20}
                height={20}
                className="opacity-80"
              />
              <span className="text-sm">Messages</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="text-sm">Notifications</span>
            </button>
            <div className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg">
              {userData?.user?.profile_picture ? (
                <Image
                  src={userData?.user?.profile_picture}
                  alt={`${userData?.user?.name} `}
                  width={30}
                  height={30}
                  className="rounded-full md:w-[30px] md:h-[30px]"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-gray-500" />
              )}
              <span className="text-sm">Profile</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityDashHeader;
