import { ArrowLeft, BriefcaseBusiness, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useState } from "react";
import { AnalyticInfoCard } from "@/components/analytics/analytic-info-card";
import { outfit } from "@/constants/app";

// Dummy data
const statsData = {
  candidateName: "Babalola Emmanuel",
  searchAppearance: 12,
  totalProfileViews: 89,
  totalCVViews: 23,
  totalCoverLetterViews: 21,
  totalIntroductionAudioPlays: 10,
  visibilityScore: 21,
  viewers: ["HR Manager", "CEO", "CFO"],
  viewerLocations: ["Barcelona, Spain", "London, UK", "Sao Paolo, Brasil"],
  aiRecommendations: {
    keySkills:
      "High match for skills in data analysis, finance, and experience with large dataset",
    strengths:
      "Proficiency in SQL and Python, effective communicator, strong leadership in project settings.",
    areasForDevelopment:
      "Proficiency in SQL and Python, effective communicator, strong leadership in project settings.",
    cultureFitIndicators:
      "Proficiency in SQL and Python, effective communicator, strong leadership in project settings.",
    languages: "English, French",
  },
  aiTools: [
    {
      name: "CV Rewriter",
      description:
        "High match for skills in data analysis, finance, and experience",
    },
    {
      name: "CV Rewriter",
      description:
        "High match for skills in data analysis, finance, and experience",
    },
  ],
};

// Icons as components for better reusability
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ViewIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13H8"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17H8"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 9H9H8"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19V23"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 23H16"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
      stroke="#065844"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TalentPoolStats() {
  const [dateRange, setDateRange] = useState("22/12/2024 - 22/12/2024");

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} max-w-[1200px] mx-auto p-6`}>
        <div className="flex items-center mb-8">
          <Link
            href="/dashboard/talent-pool/edit-profile"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div className="text-xl flex items-center font-medium ml-2">
            <h2 className="text-2xl font-semibold">
              {statsData.candidateName} - Talent Pool Stats
            </h2>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-2">Select Date Range</p>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded p-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="space-y-4">
            {/* Analytics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <AnalyticInfoCard
                title="Search Appearance"
                value={statsData.searchAppearance}
                icon={<BriefcaseBusiness size={20} className="text-primary" />}
              />
              <AnalyticInfoCard
                title="Total Profile Views"
                value={statsData.totalProfileViews}
                icon={<BriefcaseBusiness size={20} className="text-primary" />}
              />
              <AnalyticInfoCard
                title="Total CV Views"
                value={statsData.totalCVViews}
                icon={<BriefcaseBusiness size={20} className="text-primary" />}
              />
              <AnalyticInfoCard
                title="Total Cover Letter Views"
                value={statsData.totalCoverLetterViews}
                icon={<DocumentIcon />}
              />
              <AnalyticInfoCard
                title="Total Introduction Audio Plays"
                value={statsData.totalIntroductionAudioPlays}
                icon={<AudioIcon />}
              />
              <AnalyticInfoCard
                title="Visibility Score (in %)"
                value={`${statsData.visibilityScore}%`}
                icon={<BriefcaseBusiness size={20} className="text-primary" />}
              />
            </div>

            {/* Viewer Information Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Who is viewing your profile? */}
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
                <h3 className="font-medium mb-4">
                  Who is viewing your profile?
                </h3>
                <div className="space-y-3">
                  {statsData.viewers.map((viewer, index) => (
                    <div key={index} className="text-sm">
                      {viewer}
                    </div>
                  ))}
                </div>
              </div>

              {/* Where are people viewing your profile from? */}
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
                <h3 className="font-medium mb-4">
                  Where are people viewing your profile from?
                </h3>
                <div className="space-y-3">
                  {statsData.viewerLocations.map((location, index) => (
                    <div key={index} className="text-sm">
                      {location}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* AI-Powered Insights */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h2 className="text-lg font-semibold mb-4">
                AI-Powered Profile Recommendations
              </h2>
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Skills</h3>
                  <p className="text-sm text-gray-600">
                    {statsData.aiRecommendations.keySkills}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Strengths</h3>
                  <p className="text-sm text-gray-600">
                    {statsData.aiRecommendations.strengths}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Areas for Development
                  </h3>
                  <p className="text-sm text-gray-600">
                    {statsData.aiRecommendations.areasForDevelopment}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Culture Fit Indicators
                  </h3>
                  <p className="text-sm text-gray-600">
                    {statsData.aiRecommendations.cultureFitIndicators}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Languages</h3>
                  <p className="text-sm text-gray-600">
                    {statsData.aiRecommendations.languages}
                  </p>
                </div>
              </div>
            </div>

            {/* AI-Powered Recommended Tools */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
              <h3 className="font-medium mb-4">AI-Powered Recommended Tools</h3>
              <div className="space-y-4">
                {statsData.aiTools.map((tool, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-medium">{tool.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {tool.description}
                    </p>
                    <button className="mt-2 px-3 py-1 bg-[#009379] text-white text-sm rounded-full">
                      Use Tool
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
