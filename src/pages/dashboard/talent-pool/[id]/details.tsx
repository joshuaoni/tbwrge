import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FaFilePdf } from "react-icons/fa";

import { getTalentItem, TalentItem } from "@/actions/talent";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useUserStore } from "@/hooks/use-user-store";

export default function CandidateProfile() {
  const router = useRouter();

  const { userData } = useUserStore();

  const query = useQuery<TalentItem>({
    queryKey: ["get-talent-item", router.query.id],
    queryFn: async () =>
      await getTalentItem(userData?.token ?? "", router.query.id as string),
  });

  const data = query.data;

  return (
    <DashboardWrapper>
      <div className="mx-auto bg-white p-6 rounded-lg shadow">
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
              className="bg-green-700 px-7 py-2 text-white rounded-3xl font-bold"
              onClick={() => router.push("/dashboard/talent-pool/chat")}
            >
              Start Chat
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="shadow-lg border rounded-xl p-4 space-y-4 ">
            <div className="flex justify-start font-bold">
              <h5 className="text-lg">Profile Overview</h5>
            </div>

            <div className="space-y-4">
              {[
                { title: "Email", value: data?.email },
                { title: "Phone", value: data?.phone },
                { title: "DOB", value: data?.date_of_birth },
                { title: "Linkedin", value: data?.linkedin },
                { title: "Current Position", value: data?.current_position },
                { title: "Company", value: data?.current_company },
                { title: "Nationality", value: data?.nationality },
                { title: "Location", value: data?.country_of_residence },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-full flex justify-between items-end border-b-[0.5px] border-lightgreen"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  {query.isLoading ? (
                    <span className="h-4 w-36 bg-[#E7E7E7] rounded-lg animate-pulse" />
                  ) : (
                    <span className="text-xs font-medium text-[#898989]">
                      {item.value ?? "not set"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-lg border rounded-xl p-4 space-y-">
            <h5 className="text-lg font-bold">Profile Summary</h5>
            <p className="text-[#898989]">
              {data?.professional_summary ??
                "summary not provided by application"}
            </p>
          </div>

          <div className="shadow-lg border rounded-xl p-4 ">
            <h5 className="text-lg font-bold">AI Powered Insights</h5>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Strengths</span>
              <span className="text-[#898989]">{data?.strength}</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Skills Summary</span>
              <span className="text-[#898989]">{data?.skills_summary}</span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Areas For Development</span>
              <span className="text-[#898989]">
                {data?.areas_for_development}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg mt-4 w-fit shadow-md">
          <h3 className="font-semibold mb-2">Supporting Documents</h3>
          {[
            { name: "CV", value: data?.cv },
            { name: "Cover Letter", value: data?.cover_letter },
          ].map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 border rounded-lg mb-2"
            >
              <FaFilePdf className="text-red-500" />
              <span>{doc.name}</span>
              <span className="text-gray-500 text-sm">23</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
