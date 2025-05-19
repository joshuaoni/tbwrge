import { Button } from "@/components/ui/button";
import { outfit } from "@/constants/app";

const Tools = () => {
  return (
    <section
      className={`${outfit.className} w-full px-6 py-12 flex flex-col items-start md:px-16`}
    >
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        {/* Left: Headline, Description, Button */}
        <div className="max-w-lg flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-[#184C2A] leading-tight">
            Our Tools Simplify Your Journey
          </h2>
          <p className="text-base text-[#184C2A] font-medium">
            At Candivet, we're transforming the way professionals connect with
            opportunities by merging technology with human-centered design to
            support every stage of the hiring journey. Built with AI-driven
            tools, Candivet provides a comprehensive platform for recruiters and
            job seekers to simplify the job search, application, and candidate
            vetting processes.
          </p>
          <Button className="bg-[#184C2A] text-white rounded-full px-6 py-2 w-fit text-base font-semibold shadow-none hover:bg-[#184C2A]/90">
            Get Started
          </Button>
        </div>
        {/* Right: Recruiters & Job Seekers Cards */}
        <div className="flex flex-row gap-6 mt-4 md:mt-0">
          {/* Recruiters Card */}
          <div className="flex flex-col gap-2">
            <span className="text-primary text-[20px] font-semibold tracking-wide">
              Recruiters
            </span>
            <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-6 pt-12 w-64 flex flex-col items-start shadow-md">
              <div className="w-full flex justify-center items-center">
                <div className="w-[74px] h-[74px] rounded-full border border-white flex items-center justify-center mb-4">
                  {/* User Icon */}
                  <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="#dfdfdf"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"
                      stroke="#dfdfdf"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white font-semibold text-lg leading-snug mb-4">
                Job Posting, Talent Pool, Candidate Vetting Tools and many
                more...
              </div>
              <a
                href="#"
                className="flex items-center text-white text-sm font-medium hover:underline"
              >
                Learn More <span className="ml-1">→</span>
              </a>
            </div>
          </div>

          {/* Job Seekers Card */}
          <div className="flex flex-col gap-2">
            <span className="text-primary text-[20px] font-bold tracking-wide">
              Job Seekers
            </span>
            <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-6 pt-12 w-64 flex flex-col items-start shadow-md">
              <div className="w-full flex justify-center items-center">
                <div className="w-[74px] h-[74px] rounded-full border border-white flex items-center justify-center mb-4">
                  {/* User Icon */}
                  <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="#dfdfdf"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"
                      stroke="#dfdfdf"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-white font-semibold text-lg leading-snug mb-4">
                Talent Pool, CV, Interview Preparation Tools and many more...
              </div>
              <a
                href="#"
                className="flex items-center text-white text-sm font-medium hover:underline"
              >
                Learn More <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Cards Section */}
      <div className="w-full flex flex-row flex-wrap gap-6 mt-16 justify-center md:justify-start">
        {/* Card 1 */}
        <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-8 w-72 flex flex-col items-start shadow-md">
          {/* Icon Placeholder */}
          <div className="mb-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="12" fill="#fff" />
              <rect x="8" y="16" width="40" height="24" rx="6" fill="#184C2A" />
              <rect x="16" y="24" width="24" height="8" rx="2" fill="#F9B233" />
            </svg>
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            Automated Job Posting & Candidate Vetting
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-8 w-72 flex flex-col items-start shadow-md">
          <div className="mb-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="12" fill="#fff" />
              <rect
                x="16"
                y="20"
                width="24"
                height="16"
                rx="4"
                fill="#F9B233"
              />
              <rect x="24" y="28" width="8" height="8" rx="2" fill="#184C2A" />
            </svg>
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            AI-Powered CV & Cover Letter Optimization
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-8 w-72 flex flex-col items-start shadow-md">
          <div className="mb-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="12" fill="#fff" />
              <rect
                x="12"
                y="20"
                width="32"
                height="16"
                rx="4"
                fill="#3EC6E0"
              />
              <rect x="20" y="28" width="16" height="8" rx="2" fill="#F9B233" />
            </svg>
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            Smart Interview & Screening Tools
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-gradient-to-br from-[#184C2A] to-[#184C2A]/80 rounded-2xl p-8 w-72 flex flex-col items-start shadow-md">
          <div className="mb-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="12" fill="#fff" />
              <rect
                x="16"
                y="20"
                width="24"
                height="16"
                rx="4"
                fill="#F9B233"
              />
              <circle cx="28" cy="28" r="8" fill="#3EC6E0" />
              <rect x="24" y="36" width="8" height="4" rx="2" fill="#184C2A" />
            </svg>
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            Real-Time Talent Matching & Ranking
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
