'use client';

import { FaFilePdf } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import DashboardWrapper from "@/components/dashboard-wrapper";

const candidate = {
  name: 'Babalola Emmanuel',
  email: 'babs@gmail.com',
  phone: '(123) 456-7890',
  dob: '06-06-2000',
  linkedin: 'LinkedIn Profile',
  position: 'Senior Data Analyst',
  company: 'ABC Corp',
  nationality: 'Nigerian',
  location: 'New York, NY',
  summary: `Creative and results-driven Product Designer with over 3 years of experience in designing user-centered digital 
  solutions for high-growth startups and agencies. Proven expertise in collaborating with cross-functional teams to craft intuitive 
  and impactful designs, from initial concept through final implementation.`,
  insights: {
    skills: 'High match for skills in data analysis, finance, and experience with large datasets.',
    strengths: 'Proficiency in SQL and Python, effective communicator, strong leadership in project settings.',
    culture: 'Proficiency in SQL and Python, effective communicator, strong leadership in project settings.',
  },
  documents: [
    { name: 'David CV.pdf', size: '500kb' },
    { name: 'David Cover Letter.pdf', size: '500kb' },
  ],
};

export default function CandidateProfile() {
  const router = useRouter();

  return (
 <DashboardWrapper>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className='flex justify-between mb-4 items-center'>
          <h2 className="text-2xl font-semibold">{candidate.name}</h2>
          <button 
            className='bg-green-700 px-7 py-2 text-white rounded-3xl font-bold' 
            onClick={() => router.push('/dashboard/talent-pool/chat')}
          >
            Start Chat
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Profile Overview</h3>
            <p>Email: {candidate.email}</p>
            <p>Phone: {candidate.phone}</p>
            <p>DOB: {candidate.dob}</p>
            <p>LinkedIn: {candidate.linkedin}</p>
            <p>Current Position: {candidate.position}</p>
            <p>Company: {candidate.company}</p>
            <p>Nationality: {candidate.nationality}</p>
            <p>Location: {candidate.location}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Profile Summary</h3>
            <p>{candidate.summary}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
            <p><strong>Key Skills:</strong> {candidate.insights.skills}</p>
            <p><strong>Strengths:</strong> {candidate.insights.strengths}</p>
            <p><strong>Culture Fit Indicators:</strong> {candidate.insights.culture}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mt-4 w-fit shadow-md">
          <h3 className="font-semibold mb-2">Supporting Documents</h3>
          {candidate.documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border rounded-lg mb-2">
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
