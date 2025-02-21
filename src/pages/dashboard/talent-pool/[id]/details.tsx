"use client";

import DashboardWrapper from "@/components/dashboard-wrapper";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FaFilePdf } from "react-icons/fa";

const candidate = {
  name: "Babalola Emmanuel",
  email: "babs@gmail.com",
  phone: "(123) 456-7890",
  dob: "06-06-2000",
  linkedin: "LinkedIn Profile",
  position: "Senior Data Analyst",
  company: "ABC Corp",
  nationality: "Nigerian",
  location: "New York, NY",
  summary: `Creative and results-driven Product Designer with over 3 years of experience in designing user-centered digital 
  solutions for high-growth startups and agencies. Proven expertise in collaborating with cross-functional teams to craft intuitive 
  and impactful designs, from initial concept through final implementation.`,
  insights: {
    skills:
      "High match for skills in data analysis, finance, and experience with large datasets.",
    strengths:
      "Proficiency in SQL and Python, effective communicator, strong leadership in project settings.",
    culture:
      "Proficiency in SQL and Python, effective communicator, strong leadership in project settings.",
  },
  documents: [
    { name: "David CV.pdf", size: "500kb" },
    { name: "David Cover Letter.pdf", size: "500kb" },
  ],
};

export default function CandidateProfile() {
  const router = useRouter();

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
            <h2 className="text-2xl font-semibold">{candidate.name}</h2>
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
                { title: "Email", value_key: "email", value: candidate.email },
                { title: "Phone", value_key: "phone", value: candidate.phone },
                {
                  title: "DOB",
                  value_key: "date_of_birth",
                  value: candidate.dob,
                },
                {
                  title: "Linkedin",
                  value_key: "linkedin",
                  value: candidate.linkedin,
                },
                {
                  title: "Current Position",
                  value_key: "current_position",
                  value: candidate.position,
                },
                {
                  title: "Company",
                  value_key: "current_company",
                  value: candidate.company,
                },
                {
                  title: "Nationality",
                  value_key: "nationality",
                  value: candidate.nationality,
                },
                {
                  title: "Location",
                  value_key: "country_of_residence",
                  value: candidate.location,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-full flex justify-between items-end border-b-[0.5px] border-lightgreen"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  {/* {getApplicationItemQuery.isLoading ? (
                    <span className="h-4 w-36 bg-[#E7E7E7] rounded-lg animate-pulse" />
                  ) : ( */}
                  <span className="text-xs font-medium text-[#898989]">
                    {item.value ?? "not set"}
                  </span>
                  {/* )} */}
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-lg border rounded-xl p-4 space-y-">
            <h5 className="text-lg font-bold">Profile Summary</h5>
            <p className="text-[#898989]">
              {candidate.summary ?? "summary not provided by application"}
            </p>
          </div>

          <div className="shadow-lg border rounded-xl p-4 ">
            <h5 className="text-lg font-bold">AI Powered Insights</h5>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Strengths</span>
              <span className="text-[#898989]">
                {candidate.insights.strengths}
              </span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Skills Summary</span>
              <span className="text-[#898989]">
                {candidate.insights.skills}
              </span>
            </div>
            <div className="flex flex-col mt-3">
              <span className="font-bold">Areas For Development</span>
              <span className="text-[#898989]">
                {candidate.insights.culture}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg mt-4 w-fit shadow-md">
          <h3 className="font-semibold mb-2">Supporting Documents</h3>
          {candidate.documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 border rounded-lg mb-2"
            >
              <FaFilePdf className="text-red-500" />
              <span>{doc.name}</span>
              <span className="text-gray-500 text-sm">({doc.size})</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
