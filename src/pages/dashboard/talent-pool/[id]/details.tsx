import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";

import { getTalentItem, TalentItem } from "@/actions/talent";
import { startChat } from "@/actions/start-chat";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useUserStore } from "@/hooks/use-user-store";

export default function CandidateProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useUserStore();

  const query = useQuery<TalentItem>({
    queryKey: ["get-talent-item", router.query.id],
    queryFn: async () =>
      await getTalentItem(userData?.token ?? "", router.query.id as string),
  });

  const data = query.data;

  const handleStartChat = async () => {
    if (!userData?.token || !router.query.id) return;

    try {
      setIsLoading(true);
      const chatResponse = await startChat(
        userData.token,
        router.query.id as string
      );

      // Navigate to the chat page with the chat ID
      router.push(`/dashboard/talent-pool/chat?chatId=${chatResponse.id}`);
    } catch (error) {
      console.error("Failed to start chat:", error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper>
      <div className="mx-auto bg-white p-6">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex items-center">
            <ChevronLeft
              className="cursor-pointer mr-6"
              onClick={() => {
                router.back();
              }}
            />
            <h2 className="text-2xl font-semibold">
              {data?.name ?? "Loading.."}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#2D62A8]  cursor-pointer text-sm">
              Generate Candidate Report
            </span>
            <button
              className="bg-[#009379] px-7 py-4 text-sm text-white rounded-3xl disabled:opacity-70"
              onClick={handleStartChat}
              disabled={isLoading}
            >
              {isLoading ? "Starting Chat..." : "Start Chat"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Profile Overview */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-10">
              <h2 className="text-lg font-semibold">Profile Overview</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Email</p>
                  <p className="text-sm text-gray-500">
                    {data?.email ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Phone</p>
                  <p className="text-sm text-gray-500">
                    {data?.phone ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">DOB</p>
                  <p className="text-sm text-gray-500">
                    {data?.date_of_birth ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">LinkedIn</p>
                  <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                    {data?.linkedin ? (
                      <a
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    Current Position
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.current_position ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Company</p>
                  <p className="text-sm text-gray-500">
                    {data?.current_company ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Nationality</p>
                  <p className="text-sm text-gray-500">
                    {data?.nationality ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Location</p>
                  <p className="text-sm text-gray-500">
                    {data?.country_of_residence ?? "Not provided"}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">Salary Range</p>
                  <p className="text-sm text-gray-500">{"Not provided"}</p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data?.professional_summary ??
                "summary not provided by application"}
            </p>
          </div>

          {/* AI-Powered Insights */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">AI-Powered Insights</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Key Skills</h3>
                <p className="text-sm text-gray-600">
                  {data?.skills_summary ?? "No skills information available"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Strengths</h3>
                <p className="text-sm text-gray-600">
                  {data?.strength ?? "No strengths information available"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Areas for Development
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.areas_for_development ??
                    "No development areas identified"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Culture Fit Indicators
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.culture_fit ?? "No culture fit information available"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Languages</h3>
                <p className="text-sm text-gray-600">
                  {data?.languages ?? "No language information available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {/* Supporting Documents */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">Supporting Documents</h2>
            <div className="space-y-3">
              {data?.cv && (
                <a
                  href={data?.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.75 2.5V5H16.25"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 10H12.5"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 12.5H12.5"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data?.name}'s CV</p>
                    <p className="text-xs text-gray-500">Click to view</p>
                  </div>
                </a>
              )}

              {data?.cover_letter && (
                <a
                  href={data?.cover_letter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.75 2.5H5C4.0335 2.5 3.75 2.7835 3.75 3.75V16.25C3.75 17.2165 4.0335 17.5 5 17.5H15C15.9665 17.5 16.25 17.2165 16.25 16.25V5L13.75 2.5Z"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.75 2.5V5H16.25"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 10H12.5"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 12.5H12.5"
                        stroke="#FF0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {data?.name}'s Cover Letter
                    </p>
                    <p className="text-xs text-gray-500">Click to view</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
