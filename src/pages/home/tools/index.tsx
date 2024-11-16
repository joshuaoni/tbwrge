import React from "react";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import Community from "../community";
import ToolsHeaderImage from "../../../../public/images/tools_img.jpeg";
import Tool1 from "../../../../public/images/tool1.png";
import Tool2 from "../../../../public/images/tool2.png";
import Tool3 from "../../../../public/images/tool3.png";
import JobTools from "../../../../public/images/icons/job-tools.png";
import CVTools from "../../../../public/images/icons/cv-tools.png";
import CoverLetterTools from "../../../../public/images/icons/cover-letter-tools.png";
import Image from "next/image";
const index = () => {
  return (
    <LandingWrapper>
      <main className="flex flex-col pt-12">
        <section>
          <div className=" flex items-center relative justify-center  h-[400px] w-screen">
            <div className="bg-black opacity-70 w-full h-full absolute" />
            <Image
              src={ToolsHeaderImage}
              width={300}
              height={400}
              alt=""
              className="w-full h-full object-cover"
            />
            <h1 className="text-[60px] text-white font-extrabold absolute">
              Tools
            </h1>
          </div>
        </section>
        <section className="">
          <div className="flex  flex-col pb-12  py-12">
            <div className="self-center px-4 space-x-24 flex  items-center ">
              <div className="w-[50%] ">
                <div className="flex flex-col  space-y-6  min-h-[400px] max-w-[440px] rounded-lg items-center justify-center px-4 ">
                  <Image src={JobTools} alt={""} width={60} height={60} />
                  <h1 className="font-bold text-xl">Job Tools</h1>
                  <p className="text-center text-sm">
                    Candivet’s Job Tools simplify the recruiting process by
                    enabling recruiters to create, refine, and manage job
                    postings effortlessly. The Job Post Generator creates
                    polished, detailed job descriptions from essential role
                    details, helping recruiters publish effective listings. With
                    the Job Post Translator, recruiters can instantly translate
                    posts, reaching a wider audience without losing accuracy.
                    Job Post Vetting reviews and improves job posts to ensure
                    they meet industry standards, enhancing their appeal to
                    potential applicants. Lastly, the Candidate Report Generator
                    compiles detailed candidate insights into structured
                    reports, helping recruiters make informed decisions quickly
                    and confidently
                  </p>
                </div>
              </div>
              <div className="w-[50%] ">
                <Image src={Tool1} alt="" width={500} height={300} />
              </div>
            </div>
          </div>
          <div className="flex  flex-col pb-12  py-12">
            <div className="self-center px-4 space-x-24 flex  items-center ">
              <div className="w-[50%] ">
                <Image src={Tool2} alt="" width={500} height={300} />
              </div>
              <div className="w-[50%] ">
                <div className="flex flex-col  space-y-6  min-h-[400px] max-w-[440px] rounded-lg items-center justify-center px-4 ">
                  <Image src={CVTools} alt={""} width={60} height={60} />
                  <h1 className="font-bold text-xl">CV Tools</h1>
                  <p className="text-center text-sm">
                    The CV Tools suite is designed to help both job seekers and
                    recruiters create and evaluate CVs that match job
                    requirements precisely. CV Generator tailors CVs
                    specifically for each job ad, focusing on relevant skills
                    and experiences to increase candidate appeal. For
                    recruiters, CV Summarizer distills lengthy CVs into concise
                    overviews, making it easier to assess core qualifications.
                    CV Matching & Vetting provides a compatibility score by
                    analyzing CVs against job criteria, while CV Ranking
                    automatically organizes CVs by relevance, identifying top
                    candidates instantly. CV Head-to-Head enables side-by-side
                    comparisons of candidates, and CV Translator makes
                    applications accessible in multiple languages, expanding
                    opportunities for both candidates and recruiters.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  flex-col pb-12  py-12">
            <div className="self-center px-4 space-x-24 flex  items-center ">
              <div className="w-[50%] ">
                <div className="flex flex-col  space-y-6  min-h-[400px] max-w-[440px] rounded-lg items-center justify-center px-4 ">
                  <Image
                    src={CoverLetterTools}
                    alt={""}
                    width={60}
                    height={60}
                  />
                  <h1 className="font-bold text-xl">Cover Letter Tools</h1>
                  <p className="text-center text-sm">
                    Candivet’s Cover Letter Tools make it easy for candidates to
                    craft effective, targeted cover letters and for recruiters
                    to assess them efficiently. The Cover Letter Generator
                    produces customized cover letters based on job descriptions,
                    emphasizing relevant skills to strengthen applications.
                    Cover Letter Summarizer condenses cover letters, focusing on
                    key points so recruiters can quickly gauge candidate
                    suitability. Cover Letter Matching & Vetting aligns cover
                    letters with job criteria, offering compatibility insights,
                    while Cover Letter Ranking prioritizes cover letters by
                    relevance to the job, helping recruiters review applicants
                    efficiently. The Cover Letter Translator allows candidates
                    to broaden their reach by converting cover letters into
                    various languages, enabling access to global opportunities.
                  </p>
                </div>
              </div>
              <div className="w-[50%] ">
                <Image src={Tool1} alt="" width={500} height={300} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Community />
    </LandingWrapper>
  );
};

export default index;
