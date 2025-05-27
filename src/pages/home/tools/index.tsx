import Image from "next/image";
import CoverLetterTools from "../../../../public/images/icons/cover-letter-tools.png";
import CVTools from "../../../../public/images/icons/cv-tools.png";
import JobTools from "../../../../public/images/icons/job-tools.png";
import Tool1 from "../../../../public/images/tool1.png";
import Tool2 from "../../../../public/images/tool2.png";
import ToolsHeaderImage from "../../../../public/images/tools_img.jpeg";
import Community from "../components/community";
import LandingWrapper from "../components/wrapper/landing-wrapper";
import { inter, outfit, poppins } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";

const tools = [
  {
    icon: JobTools,
    title: "Job Tools",
    description:
      "Candivet’s Job Tools simplify the recruiting process by enabling recruiters to create, refine, and manage job postings effortlessly. The Job Post Generator creates polished, detailed job descriptions from essential role details, helping recruiters publish effective listings. With the Job Post Translator, recruiters can instantly translate posts, reaching a wider audience without losing accuracy. Job Post Vetting reviews and improves job posts to ensure they meet industry standards, enhancing their appeal to potential applicants. Lastly, the Candidate Report Generator compiles detailed candidate insights into structured reports, helping recruiters make informed decisions quickly and confidently.",
  },
  {
    icon: CVTools,
    title: "CV Tools",
    description:
      "The CV Tools suite is designed to help both job seekers and recruiters create and evaluate CVs that match job requirements precisely. CV Generator tailors CVs specifically for each job ad, focusing on relevant skills and experiences to increase candidate appeal. For recruiters, CV Summarizer distills lengthy CVs into concise overviews, making it easier to assess core qualifications. CV Matching & Vetting provides a compatibility score by analyzing CVs against job criteria, while CV Ranking automatically organizes CVs by relevance, identifying top candidates instantly. CV Head-to-Head enables side-by-side comparisons of candidates, and CV Translator makes applications accessible in multiple languages, expanding opportunities for both candidates and recruiters.",
  },
  {
    icon: CoverLetterTools,
    title: "Cover Letter Tools",
    description:
      "Candivet’s Cover Letter Tools make it easy for candidates to craft effective, targeted cover letters and for recruiters to assess them efficiently. The Cover Letter Generator produces customized cover letters based on job descriptions, emphasizing relevant skills to strengthen applications. Cover Letter Summarizer condenses cover letters, focusing on key points so recruiters can quickly gauge candidate suitability. Cover Letter Matching & Vetting aligns cover letters with job criteria, offering compatibility insights, while Cover Letter Ranking prioritizes cover letters by relevance to the job, helping recruiters review applicants efficiently. The Cover Letter Translator allows candidates to broaden their reach by converting cover letters into various languages, enabling access to global opportunities.",
  },
];

const ToolsPage = () => {
  const isMobile = useIsMobile();

  return (
    <LandingWrapper>
      <main className={`${inter.className} flex flex-col pt-12`}>
        {isMobile && (
          <>
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
                <h1
                  className={`${poppins.className} text-[50px] text-white font-bold absolute`}
                >
                  Tools
                </h1>
              </div>
            </section>
          </>
        )}

        {isMobile && (
          <div className="flex flex-col bg-white gap-8 px-4 md:px-16 mt-12 mb-24">
            {tools.map((tool, index) => (
              <div
                key={index}
                className={`${outfit.className} flex flex-1 bg-white h-[380px] rounded-[20px] border border-[#E5F4F2] shadow-[34.85px_29.63px_48.34px_0px_#3366FF0D]`}
              >
                <div className="flex flex-col w-full p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src={tool.icon}
                      alt={tool.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h1 className="font-semibold text-[24px] text-center mb-6">
                    {tool.title}
                  </h1>
                  <div className="flex-1">
                    <p className="text-center text-[10px] leading-[1.8]">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isMobile && (
          <>
            <h1
              className={`${poppins.className} text-[34px] font-extrabold text-center`}
            >
              Tools
            </h1>

            <section className="mb-24 space-y-16">
              <div className="flex flex-col pb-12 py-12">
                <div className="px-4 md:px-16 space-x-32 flex items-center">
                  <div className="w-[45%]">
                    <div className="flex flex-col space-y-2  min-h-[400px] max-w-[450px] rounded-lg justify-center px-4 md:px-0">
                      <h1 className="text-[#2525258C] text-2xl font-extrabold">
                        01
                      </h1>
                      <h1 className="font-bold text-[#252525CC] text-3xl">
                        Job Tools
                      </h1>
                      <p className="leading-[1.6] pt-4 text-[#252525CC] text-sm">
                        Candivet's Job Tools simplify the recruiting process by
                        enabling recruiters to create, refine, and manage job
                        postings effortlessly. The Job Post Generator creates
                        polished, detailed job descriptions from essential role
                        details, helping recruiters publish effective listings.
                        With the Job Post Translator, recruiters can instantly
                        translate posts, reaching a wider audience without
                        losing accuracy. Job Post Vetting reviews and improves
                        job posts to ensure they meet industry standards,
                        enhancing their appeal to potential applicants. Lastly,
                        the Candidate Report Generator compiles detailed
                        candidate insights into structured reports, helping
                        recruiters make informed decisions quickly and
                        confidently
                      </p>
                    </div>
                  </div>
                  <div className="w-[45%] flex justify-end relative">
                    <div className="absolute top-8 -left-8 w-[105%] h-[110%] bg-[#4A4A4A] rounded-lg -z-10 -translate-x-4" />
                    <div className="relative w-full">
                      <Image
                        src={Tool2}
                        alt=""
                        width={450}
                        height={300}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pb-12 py-12">
                <div className="px-4 md:px-16 space-x-32 flex items-center">
                  <div className="w-[45%] flex justify-start relative">
                    <div className="absolute top-8 -right-8 w-[105%] h-[110%] bg-[#4A4A4A] rounded-lg -z-10 translate-x-4" />
                    <div className="relative w-full">
                      <Image
                        src={Tool1}
                        alt=""
                        width={450}
                        height={300}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <div className="flex flex-col space-y-2 min-h-[400px] max-w-[450px] rounded-lg justify-center px-4 md:px-0">
                      <h1 className="text-[#2525258C] text-2xl font-extrabold">
                        02
                      </h1>
                      <h1 className="font-bold text-[#252525CC] text-3xl">
                        CV Tools
                      </h1>
                      <p className="leading-[1.6] pt-4 text-[#252525CC] text-sm">
                        The CV Tools suite is designed to help both job seekers
                        and recruiters create and evaluate CVs that match job
                        requirements precisely. CV Generator tailors CVs
                        specifically for each job ad, focusing on relevant
                        skills and experiences to increase candidate appeal. For
                        recruiters, CV Summarizer distills lengthy CVs into
                        concise overviews, making it easier to assess core
                        qualifications. CV Matching & Vetting provides a
                        compatibility score by analyzing CVs against job
                        criteria, while CV Ranking automatically organizes CVs
                        by relevance, identifying top candidates instantly. CV
                        Head-to-Head enables side-by-side comparisons of
                        candidates, and CV Translator makes applications
                        accessible in multiple languages, expanding
                        opportunities for both candidates and recruiters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pb-12 py-12">
                <div className="md:px-16 px-4 space-x-32 flex items-center">
                  <div className="w-[45%]">
                    <div className="flex flex-col space-y-2 min-h-[400px] max-w-[450px] rounded-lg justify-center px-4 md:px-0">
                      <h1 className="text-[#2525258C] text-2xl  font-extrabold">
                        03
                      </h1>
                      <h1 className="font-bold text-[#252525CC] text-3xl">
                        Cover Letter Tools
                      </h1>
                      <p className="leading-[1.6] pt-4 text-[#252525CC] text-sm">
                        Candivet's Cover Letter Tools make it easy for
                        candidates to craft effective, targeted cover letters
                        and for recruiters to assess them efficiently. The Cover
                        Letter Generator produces customized cover letters based
                        on job descriptions, emphasizing relevant skills to
                        strengthen applications. Cover Letter Summarizer
                        condenses cover letters, focusing on key points so
                        recruiters can quickly gauge candidate suitability.
                        Cover Letter Matching & Vetting aligns cover letters
                        with job criteria, offering compatibility insights,
                        while Cover Letter Ranking prioritizes cover letters by
                        relevance to the job, helping recruiters review
                        applicants efficiently. The Cover Letter Translator
                        allows candidates to broaden their reach by converting
                        cover letters into various languages, enabling access to
                        global opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="w-[45%] flex justify-start relative">
                    <div className="absolute top-8 -left-8 w-[105%] h-[110%] bg-[#4A4A4A] rounded-lg -z-10 -translate-x-4" />
                    <div className="relative w-full">
                      <Image
                        src="/joao-ferrao-4YzrcDNcRVg-unsplash.png"
                        alt=""
                        width={450}
                        height={300}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Community />
    </LandingWrapper>
  );
};

export default ToolsPage;
