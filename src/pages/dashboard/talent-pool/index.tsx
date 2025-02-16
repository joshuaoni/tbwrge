'use client';

import { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import DashboardWrapper from "@/components/dashboard-wrapper";
const candidates = Array(9).fill(null).map(() => ({
  name: 'Ramrex David',
  location: 'London, UK',
  skills: 'Proficiency in SQL and Python',
  position: 'Senior Data Analyst, ABC LTD',
  attachment: 'Resume.pdf',
}));

export default function TalentPool() {
  const router = useRouter();

  return (
 <DashboardWrapper>
  
  <span className="font-bold text-xl">Talent Pool</span>
     <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Talent Pool</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-2 md:mt-0">Create New Job Post</button>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search for jobs"
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
          <input
            type="text"
            placeholder="Search for Keywords"
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-gray-300 px-4 py-2 rounded-lg">Location</button>
          <button className="bg-gray-300 px-4 py-2 rounded-lg">Skills</button>
        </div>
        
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Candidate Name</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Most Recent Position</th>
                <th>Attachments</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="border-t cursor-pointer" onClick={() => router.push(`/dashboard/talent-pool/candidate-profile`)}>
                  <td className="p-3 font-medium whitespace-nowrap text-blue-500 underline">{candidate.name}</td>
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
