// import { CommunityDashHeader } from "@/components/community-dash-header";
import React from "react";
import Image from "next/image";
import CommunityDashHeader from "@/components/community-dash-header";
import { outfit } from "@/constants/app";

const popularTags = [
  {
    id: 1,
    name: "#Interview",
    posts: "82,645",
    status: "Trending",
    icon: "/dev.png",
    bg: "#5A4F43",
    width: 20,
    height: 13,
  },
  {
    id: 2,
    name: "#HR Management",
    posts: "65,523",
    status: "Trending",
    icon: "/bitcoin.png",
    bg: "#473E3B",
    width: 20,
    height: 20,
  },
  {
    id: 3,
    name: "#design",
    posts: "51,345",
    status: "Trending",
    icon: "/design.png",
    bg: "#444F5F",
    width: 20,
    height: 11,
  },
  {
    id: 4,
    name: "#innovation",
    posts: "48,029",
    status: "Trending",
    icon: "/innovation.png",
    bg: "#574D42",
    width: 20,
    height: 16,
  },
  {
    id: 5,
    name: "#tutorial",
    posts: "51,345",
    status: "Trending",
    icon: "/tutorial.png",
    bg: "#335248",
    width: 19,
    height: 20,
  },
  {
    id: 6,
    name: "#business",
    posts: "82,645",
    status: "Trending",
    icon: "/business.png",
    bg: "#46475B",
    width: 18,
    height: 20,
  },
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityDashHeader />

      <div className="max-w-7xl mx-auto pt-16 md:pt-20 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar - Popular Tags */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-xl p-4 shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg font-semibold pl-2 mb-4">Popular Tags</h2>
              <div className="space-y-2">
                {popularTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                      style={{ backgroundColor: tag.bg }}
                    >
                      <Image
                        src={tag.icon}
                        alt={tag.name}
                        width={tag.width}
                        height={tag.height}
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[14px] font-semibold leading-tight">
                        {tag.name}
                      </h3>
                      <span className="text-[12px] text-gray-700 mt-0.5">
                        {tag.posts} Posted • {tag.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Posts Feed */}
          <div className={`${outfit.className} col-span-1 md:col-span-6`}>
            {/* Mobile Popular Tags Grid */}
            <div className="md:hidden pt-[20px] mb-4">
              <h2 className="text-base font-semibold mb-3">Popular Tags</h2>
              <div className="grid grid-cols-2 gap-2">
                {popularTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 bg-white p-2.5 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0`}
                      style={{ backgroundColor: tag.bg }}
                    >
                      <Image
                        src={tag.icon}
                        alt={tag.name}
                        width={tag.width * 0.8}
                        height={tag.height * 0.8}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[13px] font-semibold truncate">
                        {tag.name}
                      </h3>
                      <p className="text-[11px] text-gray-600 truncate">
                        {tag.posts} • {tag.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Post Card */}
            <div className="bg-white rounded-xl p-3 md:p-4 shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-[6px] bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
                  <Image
                    src="/Mask.png"
                    alt="User Avatar"
                    width={24}
                    height={24}
                    className="rounded-full md:w-[30px] md:h-[32px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Let's share what going on your mind..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 text-xs md:text-sm"
                />
                <button className="px-3 md:px-4 py-2 md:py-2.5 bg-[#065844] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#054e3a] transition-colors whitespace-nowrap">
                  Create Post
                </button>
              </div>
            </div>

            {/* Post Cards */}
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="bg-white rounded-xl shadow-[0px_4px_50px_0px_rgba(0,0,0,0.25)] p-3 md:p-4 mb-4"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-[6px] bg-[#FFF1E8] border border-[#EA942C] flex items-center justify-center">
                    <Image
                      src="/Mask.png"
                      alt="User Avatar"
                      width={24}
                      height={24}
                      className="rounded-full md:w-[30px] md:h-[32px]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <h3 className="text-xs md:text-sm font-medium">
                        AR Jakir
                      </h3>
                      <span className="text-[10px] md:text-xs text-black">
                        •
                      </span>
                      <p className="text-[10px] md:text-xs text-black">
                        3 days ago
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-700 mb-3 md:mb-4">
                  I'm preparing for an interview at Candivet. I am trying to
                  prep but I don't know what to expect.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col font-semibold">
                    <p className="text-xs md:text-sm font-medium">232</p>
                    <p className="text-xs md:text-sm text-black">Comment</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs md:text-sm">Last followed</p>
                    <p className="text-xs md:text-sm text-black">11h</p>
                  </div>
                </div>
                <div className="flex font-semibold items-center gap-2 md:gap-4 mt-3 md:mt-4 border-t pt-3 md:pt-4">
                  <button className="flex justify-between rounded-[8px] border border-gray-300 p-[4px_6px] md:p-[4px_8px] items-center gap-1.5 md:gap-2 text-black hover:text-gray-700">
                    <Image
                      src="/like.png"
                      alt="Upvote"
                      width={16}
                      height={16}
                      className="w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-xs md:text-sm">Upvote</span>
                  </button>
                  <button className="flex justify-between rounded-[8px] border border-gray-300 p-[4px_6px] md:p-[4px_8px] items-center gap-1.5 md:gap-2 text-black hover:text-gray-700">
                    <Image
                      src="/brush.png"
                      alt="Comment"
                      width={16}
                      height={16}
                      className="w-4 h-4 md:w-5 md:h-5"
                    />
                    <span className="text-xs md:text-sm">Comment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Advertisement */}
          <div className="hidden md:block md:col-span-3 space-y-[14px]">
            {[1, 2].map((post) => (
              <div
                key={post}
                className="h-[300px] bg-[#1E2937] rounded-xl p-4 text-white"
              >
                <h2 className="text-lg font-semibold mb-4"></h2>
              </div>
            ))}
            <h1 className="text-lg text-center font-semibold mb-4">
              Advertisement
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
