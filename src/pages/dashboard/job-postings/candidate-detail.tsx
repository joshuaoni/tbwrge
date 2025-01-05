import { getJobApplicationItem } from "@/actions/get-job-application-item";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Urbanist } from "next/font/google";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const CandidateDetail = ({
  setCurrentView,
  applicationId,
}: {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  applicationId: string;
}) => {
  const { userData } = useUserStore();

  const getApplicationItemQuery = useQuery({
    queryKey: ["get-job-application-item", applicationId],
    queryFn: async () =>
      await getJobApplicationItem({
        token: userData?.token ?? "",
        applicationId,
      }),
  });
  const data = getApplicationItemQuery?.data;

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => {
              setCurrentView("details");
            }}
          />
          <span className="text-2xl font-semibold">{data?.applicant.name}</span>
        </div>
        <div className="ml-auto space-x-6">
          <span className="text-[#2D62A8]  cursor-pointer text-sm">
            Generate Candidate Report
          </span>
          <span className="text-[#E83B3B]  cursor-pointer text-sm">
            Report Candidate
          </span>
          <Button className="bg-lightgreen text-white rounded-full">
            Mark As Fit
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-3 gap-x-6 gap-y-10 mt-4">
        <div className="shadow-lg border rounded-xl p-4 space-y-4 h-fit">
          <div className="flex justify-between font-bold">
            <h5 className="text-lg">Profile Overview</h5>
            <h5>Fit Score</h5>
          </div>
          <div className="w-full flex justify-end">
            <span className="bg-lightgreen text-white text-center text-2xl font-bold w-20 h-20 p-4 flex items-center justify-center rounded-full">
              {data?.fit_score}%
            </span>
          </div>
          <div className="space-y-4">
            {[
              { title: "Email", value_key: "email" },
              { title: "Phone", value_key: "phone" },
              { title: "DOB", value_key: "date_of_birth" },
              { title: "Linkedin", value_key: "linkedin" },
              { title: "Current Position", value_key: "current_position" },
              { title: "Company", value_key: "current_company" },
              { title: "Nationality", value_key: "nationality" },
              { title: "Location", value_key: "country_of_residence" },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full flex justify-between items-end border-b-[0.5px] border-lightgreen"
              >
                <span className="text-sm font-medium">{item.title}</span>
                {getApplicationItemQuery.isLoading ? (
                  <span className="h-4 w-36 bg-[#E7E7E7] rounded-lg animate-pulse" />
                ) : (
                  <span className="text-xs font-medium text-[#898989]">
                    {data?.applicant![item.value_key] ?? "not set"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-lg border rounded-xl p-4 space-y-6 h-fit">
          <h5 className="text-lg font-bold">Profile Summary</h5>
          <p className="text-[#898989]">
            {data?.applicant.professional_summary ??
              "summary not provided by application"}
          </p>
        </div>

        <div className="shadow-lg border rounded-xl p-4 h-fit">
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

        <div className="shadow-lg border rounded-xl p-4 space-y-4">
          <h5 className="text-lg font-bold">Supporting Documents</h5>
          <div className="flex flex-col gap-3">
            {[
              {
                fileName: data?.cv,
                fileSize: 500,
              },
              {
                fileName: data?.cover_letter,
                fileSize: 500,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#E7E7E7] p-4 rounded-lg flex items-center gap-2"
              >
                <Image
                  src="/images/pdf-icon.png"
                  alt="pdf icon"
                  width={24}
                  height={24}
                />
                {getApplicationItemQuery.isLoading ? (
                  <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-lg"></div>
                ) : (
                  <div className="grid gap-0.5">
                    <button
                      onClick={() => {}}
                      className="font-semibold text-[#0B0B0B] text-sm cursor-pointer hover:underline"
                    >
                      {item.fileName?.split("/").pop()}
                    </button>
                    <span className="text-[#6D6D6D] text-xs">
                      {item.fileSize}kb
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-lg border rounded-xl p-4 col-span-2 space-y-4">
          <div className="flex gap-4 font-bold items-center justify-start">
            <h5 className="text-lg">Add Notes</h5>
            <PlusCircle />
          </div>
          <div className={twMerge(urbanist.className, "space-y-4")}>
            <div className="flex capitalize bg-[#D6D6D6] text-[#898989] text-sm font-bold w-full gap-6 px-5 py-3 rounded-lg">
              <span className="w-2/12">date</span>
              <span>notes</span>
            </div>
            {[
              {
                date: "31/10/2024",
                notes:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, eius.",
              },
              {
                date: "31/10/2024",
                notes:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, eius.",
              },
              {
                date: "31/10/2024",
                notes:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, eius.",
              },
            ].map(() => (
              <div className="flex gap-4 px-5 tracking-[5%] font-medium">
                <span className="w-2/12">31/10/2024</span>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, eius.
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateDetail;
