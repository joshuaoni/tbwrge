import React from "react";
import Image from "next/image";
import AllActivityDropDown from "@/components/all-activity-dropdown";

interface ArticleItem {
  id: string;
  text: string;
  answers: number;
  author: {
    name: string;
    avatar: string;
  };
  daysAgo: number;
  lastFollowed: string;
}

interface ArticlesCommunityProps {
  articles: ArticleItem[];
}

const ArticlesCommunity = ({ articles }: ArticlesCommunityProps) => {
  return (
    <div className="bg-[#F9F9F9] rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Articles & Community</h2>
        <AllActivityDropDown />
      </div>
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <p className="text-[14px] font-semibold text-[#111827] leading-[20px] mb-4">
              {article.text}
            </p>
            <div className="flex items-center gap-3 text-[13px] text-black">
              <span className="font-semibold">{article.answers} answers</span>
              <span className="text-[#D1D5DB]">•</span>
              <span>Last followed {article.lastFollowed}</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-[#F3F4F6] border border-gray-200 flex items-center justify-center">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111827]">
                  {article.author.name}
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="text-[13px] text-[#6B7280]">
                  {article.daysAgo} days ago
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesCommunity;
