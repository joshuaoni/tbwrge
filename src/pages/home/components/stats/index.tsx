import { useIsMobile } from "@/hooks/use-mobile";

const HomePageStats = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="relative h-fit pt-24 md:pt-[74px] flex flex-col gap-10 items-center justify-center p-4 py-12 md:py-24 md:p-12 md:px-16"
      style={{
        backgroundImage: "url(/hero-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[44px] leading-[60px] text-center font-bold relative w-[70%]">
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          Build confidence in your Hiring and Job Seeking
        </span>
        <span className="bg-gradient-to-r from-white/60 via-white to-white/40 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
          {" "}
          journey with the #1 Global platform
        </span>
      </h1>
      <p className="text-white text-center md:text-base text-[14px] w-[80%] mt-4">
        Candivet simplifies hiring and job seeking with AI-driven automation and
        intelligent matching. Recruiters can post jobs, vet candidates, and
        schedule interviews effortlessly, while job seekers benefit from
        tailored CVs, optimized cover letters, and real-time job matching. We
        makes the process faster, smarter, and more efficient—so you can focus
        on finding the perfect fit.
      </p>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
        {/* Countries */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-yellow-400 text-3xl md:text-4xl font-bold mb-2">
            30+
          </div>
          <div className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
            Countries
          </div>
          <div className="text-gray-300 text-xs md:text-sm">
            #7 2025 Global Ranking
          </div>
        </div>
        {/* Business Partners */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-yellow-400 text-3xl md:text-4xl font-bold mb-2">
            15k+
          </div>
          <div className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
            Business Partners
          </div>
          <div className="text-gray-300 text-xs md:text-sm">
            From Small Businesses to Large Enterprises
          </div>
        </div>
        {/* Matching Accuracy */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-yellow-400 text-3xl md:text-4xl font-bold mb-2">
            98%
          </div>
          <div className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
            Matching Accuracy
          </div>
          <div className="text-gray-300 text-xs md:text-sm">
            Candidate and Job Matching
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageStats;
