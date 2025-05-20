import { Button } from "@/components/ui/button";
import { outfit } from "@/constants/app";
import Image from "next/image";

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
          <Button
            style={{
              backgroundImage: "url(/hero-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className=" text-white rounded-full px-6 py-2 w-fit text-base font-semibold shadow-none hover:bg-[#184C2A]/90"
          >
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
            <div
              style={{
                backgroundImage: "url(/hero-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-2xl p-6 pt-12 w-64 flex flex-col items-start shadow-md"
            >
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
            <div
              style={{
                backgroundImage: "url(/hero-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-2xl p-6 pt-12 w-64 flex flex-col items-start shadow-md"
            >
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
      <div className="w-full flex flex-row flex-wrap gap-6 mt-16 justify-center md:justify-between">
        {/* Card 1 */}
        <div
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl p-8 pb-12 w-72 flex flex-col items-start shadow-md"
        >
          {/* Icon Placeholder */}
          <div className="mb-12">
            <Image
              src="/one.png"
              alt="Automated Job Posting & Candidate Vetting"
              width={825}
              height={460}
            />
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            Automated Job Posting & Candidate Vetting
          </div>
        </div>
        {/* Card 2 */}
        <div
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl p-8 pb-12 w-72 flex flex-col items-start shadow-md"
        >
          <div className="mb-12">
            <Image
              src="/two.png"
              alt="AI-Powered CV & Cover Letter Optimization"
              width={825}
              height={460}
            />
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            AI-Powered CV & Cover Letter Optimization
          </div>
        </div>
        {/* Card 3 */}
        <div
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl p-8 pb-12 w-72 flex flex-col items-start shadow-md"
        >
          <div className="mb-12">
            <Image
              src="/three.png"
              alt="Smart Interview & Screening Tools"
              width={825}
              height={460}
            />
          </div>
          <div className="text-white font-semibold text-xl leading-snug">
            Smart Interview & Screening Tools
          </div>
        </div>
        {/* Card 4 */}
        <div
          style={{
            backgroundImage: "url(/hero-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl p-8 pb-12 w-72 flex flex-col items-start shadow-md"
        >
          <div className="mb-12">
            <Image
              src="/four.png"
              alt="Real-Time Talent Matching & Ranking"
              width={825}
              height={460}
            />
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
