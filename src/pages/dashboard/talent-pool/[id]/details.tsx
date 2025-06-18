import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";

import { getTalentItem, TalentItem } from "@/actions/talent";
import { startChat } from "@/actions/start-chat";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useUserStore } from "@/hooks/use-user-store";
import Image from "next/image";

export default function CandidateProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
      <div className="mx-auto bg-white">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex items-center">
            <ChevronLeft
              className="cursor-pointer mr-6"
              onClick={() => {
                router.back();
              }}
            />
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                {data?.name ?? t("talentPool.messages.loading")}
              </h2>
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  {data?.profile_photo ? (
                    <Image
                      src={data?.profile_photo}
                      alt={data?.name ?? "Profile photo"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl font-semibold text-gray-600">
                      {data?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#2D62A8]  cursor-pointer text-sm">
              {t("talentPool.details.generateReport")}
            </span>
            <button
              className="bg-[#009379] px-7 py-3 text-sm text-white rounded-3xl disabled:opacity-70"
              onClick={handleStartChat}
              disabled={isLoading}
            >
              {isLoading
                ? t("talentPool.details.startingChat")
                : t("talentPool.details.startChat")}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Profile Overview */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-start justify-between mb-10">
              <h2 className="text-lg font-semibold">
                {t("talentPool.details.profileOverview")}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.email")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.email ?? t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.phone")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.phone ?? t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.dob")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.date_of_birth ?? t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.linkedin")}
                  </p>
                  <p className="text-sm text-gray-500 cursor-pointer hover:underline">
                    {data?.linkedin ? (
                      <a
                        href={data.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("talentPool.details.viewProfile")}
                      </a>
                    ) : (
                      t("talentPool.details.notProvided")
                    )}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.currentPosition")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.current_position ??
                      t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.company")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.current_company ??
                      t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.nationality")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.nationality ?? t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.search.location")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.country_of_residence ??
                      t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black w-[120px]">
                    {t("talentPool.details.salaryRange")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("talentPool.details.notProvided")}
                  </p>
                </div>
                <div className="h-[1px] bg-[#009379]/20 mt-2"></div>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">
              {t("talentPool.details.profileSummary")}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data?.professional_summary ??
                t("talentPool.details.summaryNotProvided")}
            </p>
          </div>

          {/* AI-Powered Insights */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">
              {t("talentPool.details.aiInsights")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("talentPool.details.keySkills")}
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.skills_summary ?? t("talentPool.details.noSkillsInfo")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("talentPool.details.strengths")}
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.strength ?? t("talentPool.details.noStrengthsInfo")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("talentPool.details.areasForDevelopment")}
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.areas_for_development ??
                    t("talentPool.details.noDevelopmentAreas")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("talentPool.details.cultureFit")}
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.culture_fit ??
                    t("talentPool.details.noCultureFitInfo")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("talentPool.details.languages")}
                </h3>
                <p className="text-sm text-gray-600">
                  {data?.languages ?? t("talentPool.details.noLanguagesInfo")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {/* Supporting Documents */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-4">
              {t("talentPool.details.supportingDocuments")}
            </h2>
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
                    <p className="text-sm font-medium">
                      {data?.name}
                      {t("talentPool.details.cvSuffix")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("talentPool.details.clickToView")}
                    </p>
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
                      {data?.name}
                      {t("talentPool.details.coverLetterSuffix")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("talentPool.details.clickToView")}
                    </p>
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
