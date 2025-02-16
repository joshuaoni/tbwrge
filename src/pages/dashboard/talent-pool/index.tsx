"use client";

import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/navigation";
import DashboardWrapper from "@/components/dashboard-wrapper";
const candidates = Array(9)
  .fill(null)
  .map(() => ({
    name: "Ramrex David",
    location: "London, UK",
    skills: "Proficiency in SQL and Python",
    position: "Senior Data Analyst, ABC LTD",
    attachment: "Resume.pdf",
  }));

export default function TalentPool() {
  const router = useRouter();

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Talent Pool</span>
      <div className="p-6  min-h-screen">
        <div className=" mx-auto bg-white p-4 rounded-lg ">
          <div className="flex items-center gap-3">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Search for Keywords"
                className="w-full p-2 border text-sm rounded-full bg-[#F0F0F0]"
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border text-sm rounded-lg bg-[#F0F0F0]"
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Skills"
                className="w-full p-2 border text-sm rounded-lg bg-[#F0F0F0]"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto bg-[#F0F0F0] p-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#D6D6D6] rounded-lg mb-4">
                <tr className="rounded-lg">
                  <th className="p-3 text-[#898989]">CANDIDATE NAME</th>
                  <th className="text-[#898989]">Location</th>
                  <th className="text-[#898989]">Skills</th>
                  <th className="text-[#898989]">Most Recent Position</th>
                  <th className="text-[#898989]">ATTACHMENTS</th>
                </tr>
              </thead>
              <tbody className="">
                {candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-t cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/talent-pool/candidate-profile`)
                    }
                  >
                    <td className="p-3 font-medium whitespace-nowrap text-[#000000] ">
                      {candidate.name}
                    </td>
                    <td className="whitespace-nowrap">{candidate.location}</td>
                    <td className="whitespace-nowrap">{candidate.skills}</td>
                    <td className="whitespace-nowrap">{candidate.position}</td>
                    <td className="text-blue-500 flex items-center gap-2 whitespace-nowrap">
                      <FaFilePdf /> {candidate.attachment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
