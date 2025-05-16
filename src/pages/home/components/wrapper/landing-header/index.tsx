import { RefObject, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";
import { poppins } from "@/constants/app";
import { outfit } from "@/constants/app";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useUserStore } from "@/hooks/use-user-store";

const LandingHeader = ({
  scrollToSection,
  aboutUsSectionRef,
  toolsSectionRef,
  pricingSectionRef,
  blogSectionRef,
  CommunitySectionRef,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  aboutUsSectionRef: RefObject<HTMLDivElement>;
  toolsSectionRef: RefObject<HTMLDivElement>;
  pricingSectionRef: RefObject<HTMLDivElement>;
  blogSectionRef: RefObject<HTMLDivElement>;
  CommunitySectionRef: RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData } = useUserStore();

  const recruiterMenu = [
    { title: "Job Posting", path: "/dashboard/job-postings" },
    { title: "Job Tools", path: "/dashboard/job-tools/generator" },
    { title: "Job Board", path: "/dashboard/job-board" },
  ];

  const jobSeekerMenu = [
    { title: "Talent Pool", path: "/dashboard/talent-pool" },
    { title: "Job Board", path: "/dashboard/job-board" },
    { title: "Job Applications", path: "/dashboard/applications" },
    { title: "CV Tools", path: "/dashboard/cv-tools/summarizer" },
    {
      title: "Cover Letter Tools",
      path: "/dashboard/cover-letter-tools/summarizer",
    },
  ];

  const handleMenuClick = (path: string) => {
    if (!userData?.token) {
      // If not logged in, redirect to login with the intended destination
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      // If logged in, go directly to the page
      router.push(path);
    }
  };

  return (
    <>
      <div className="w-full px-4 md:px-16 z-20 fixed flex items-center text-white justify-between bg-transparent top-0 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <div
              onClick={() => router.push("/home")}
              className="flex items-center cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-[6.96px] bg-[#065844] w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative">
                <Image
                  src="/header-final.png"
                  alt=""
                  width={32}
                  height={29.2}
                  className="w-[32px] h-[29.2px] md:w-[32px] md:h-[29.2px]"
                />
              </div>
              <h1
                className={`${outfit.className} ml-2 text-xl md:text-3xl font-bold`}
              >
                Candivet
              </h1>
            </div>
            {!isMobile && (
              <NavigationHeader
                CommunitySectionRef={CommunitySectionRef}
                scrollToSection={scrollToSection}
                aboutUsSectionRef={aboutUsSectionRef}
                toolsSectionRef={toolsSectionRef}
                pricingSectionRef={pricingSectionRef}
                blogSectionRef={blogSectionRef}
              />
            )}
          </div>
          {!isMobile ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/home/sign-in")}
                className="border-none outline-none tet-black"
              >
                Log In
              </Button>
              <Button
                onClick={() => router.push("/home/sign-up")}
                className="bg-transparent hover:bg-white/20 text-white border border-white rounded-full"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 border border-gray-300 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div className="fixed top-[68px] left-0 right-0 bg-white z-20 border-b md:hidden">
          <div className="px-4 py-2 space-y-2">
            {/* Navigation Items */}
            <div className="space-y-1 border-b pb-2">
              {[
                { title: "Home", link: "/home" },
                { title: "About", link: "/home/about", ref: aboutUsSectionRef },
                {
                  title: "Pricing",
                  link: "/home/pricing",
                  ref: pricingSectionRef,
                },
                { title: "Blog", link: "/home/blog", ref: blogSectionRef },
                { title: "Community", link: "/community" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.link) {
                      router.push(item.link);
                    } else if (item.ref) {
                      scrollToSection(item.ref);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg"
                >
                  <span className={`${poppins.className} text-sm`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  router.push("/home/sign-in");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg"
              >
                <span className={`${poppins.className} text-sm`}>Log In</span>
              </button>
              <button
                onClick={() => {
                  router.push("/home/sign-up");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full p-3 bg-[#009379] hover:bg-[#008369] text-white rounded-lg justify-center"
              >
                <span className={`${poppins.className} text-sm font-medium`}>
                  Sign Up
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavigationHeader = ({
  scrollToSection,
  aboutUsSectionRef,
  toolsSectionRef,
  pricingSectionRef,
  blogSectionRef,
  CommunitySectionRef,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  aboutUsSectionRef: RefObject<HTMLDivElement>;
  toolsSectionRef: RefObject<HTMLDivElement>;
  pricingSectionRef: RefObject<HTMLDivElement>;
  blogSectionRef: RefObject<HTMLDivElement>;
  CommunitySectionRef: RefObject<HTMLDivElement>;
}) => {
  const { userData } = useUserStore();
  const router = useRouter();
  const userRole = userData?.user?.role;
  const isLoggedIn = !!userData?.token;
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredRole, setHoveredRole] = useState<
    "recruiter" | "job_seeker" | null
  >(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const recruiterMenu = [
    { title: "Job Posting", path: "/dashboard/job-postings" },
    { title: "Job Tools", path: "/dashboard/job-tools/generator" },
    { title: "Job Board", path: "/dashboard/job-board" },
  ];

  const jobSeekerMenu = [
    { title: "Talent Pool", path: "/dashboard/talent-pool" },
    { title: "Job Board", path: "/dashboard/job-board" },
    { title: "Job Applications", path: "/dashboard/applications" },
    { title: "CV Tools", path: "/dashboard/cv-tools/summarizer" },
    {
      title: "Cover Letter Tools",
      path: "/dashboard/cover-letter-tools/summarizer",
    },
  ];

  const handleMenuClick = (path: string) => {
    if (!userData?.token) {
      router.push(`/home/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      router.push(path);
    }
  };

  const Navs = [
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/home/tools",
      isTools: true,
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/home/blog",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/home/pricing",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
    // {
    //   ref: aboutUsSectionRef,
    //   title: "About",
    //   link: "/home/about",
    // },
    {
      title: "Apply for a jobs",
      link: "home/sign-in",
    },
    {
      title: "Post a job",
      link: "home/sign-in",
    },
    {
      title: "Join talent pool",
      link: "home/sign-in",
    },
  ];
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setHoveredRole(null);
    }, 120);
  };
  return (
    <div>
      <div className="flex items-center text-[14px] space-x-12 ml-12">
        {Navs.map((nav, index) =>
          nav.isTools ? (
            <div
              key={nav.title}
              className="relative flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`${outfit.className} text-white cursor-pointer flex items-center`}
              >
                {nav.title}
                <ChevronDown className="ml-1 w-4 h-4" />
              </span>
              {showDropdown && (
                <div className="absolute top-8 left-0 bg-white p-0 rounded shadow-lg z-50 min-w-[180px]">
                  {!isLoggedIn ? (
                    <div
                      className="flex flex-col relative bg-white rounded border shadow min-w-[160px]"
                      onMouseEnter={() => setHoveredRole(hoveredRole)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] font-medium flex items-center justify-between border-b last:border-b-0 text-black"
                        onMouseEnter={() => setHoveredRole("recruiter")}
                      >
                        For Recruiters <ChevronRight className="ml-2 w-4 h-4" />
                      </div>
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] font-medium flex items-center justify-between border-b last:border-b-0 text-black"
                        onMouseEnter={() => setHoveredRole("job_seeker")}
                      >
                        For Job Seekers{" "}
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </div>
                      {hoveredRole && (
                        <div className="absolute top-0 left-full bg-white shadow-lg min-w-[180px] rounded border p-1 flex flex-col gap-1 z-50">
                          {(hoveredRole === "recruiter"
                            ? recruiterMenu
                            : jobSeekerMenu
                          ).map((item) => (
                            <div
                              key={item.title}
                              onClick={() => handleMenuClick(item.path)}
                              className="text-black text-[15px] px-3 py-2 rounded hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded p-2 flex flex-col gap-2">
                      {(userRole === "recruiter"
                        ? recruiterMenu
                        : jobSeekerMenu
                      ).map((item) => (
                        <div
                          key={item.title}
                          onClick={() => handleMenuClick(item.path)}
                          className="text-black text-[15px] px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <NavItem scrollToSection={scrollToSection} {...nav} key={index} />
          )
        )}
      </div>
    </div>
  );
};
const NavItem = ({ title, link }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const path = (pathName ?? "").split("/")[
    (pathName ?? "").split("/").length - 1
  ];
  console.log("path", path, link);
  const isActive = path === link.split("/")[link.split("/").length - 1];
  const onClick = () => {
    router.push(link);
  };
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className={`${
        isActive
          ? "font-bold underline underline-offset-2 transform transition-all"
          : ""
      } ${outfit.className}text-white  cursor-pointer`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
