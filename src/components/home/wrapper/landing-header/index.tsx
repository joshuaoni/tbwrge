import { RefObject, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileToolsRole, setMobileToolsRole] = useState<
    null | "recruiter" | "job_seeker"
  >(null);
  const { userData } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isBlogOrTools =
    pathname?.includes("/blog") ||
    pathname?.includes("/pricing") ||
    pathname?.includes("/terms-of-service") ||
    pathname?.includes("/privacy-policy") ||
    pathname?.includes("/cookie-policy") ||
    pathname?.includes("/disclaimer");
  const logoSrc =
    isBlogOrTools || isScrolled ? "/header-final.png" : "/footer-logo.png";
  const textColor = isBlogOrTools || isScrolled ? "text-black" : "text-white";

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

  const Navs = [
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/tools",
      isTools: true,
    },
    {
      ref: aboutUsSectionRef,
      title: "About",
      link: "/about",
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/blog",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/pricing",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
    {
      title: "Apply for a job",
      link: "/dashboard/job-board",
      protected: true,
    },
    {
      title: "Post a job",
      link: "/dashboard/create",
      protected: true,
    },
    {
      title: "Join talent pool",
      link: "/dashboard/talent-pool/join-talent-pool",
      protected: true,
    },
  ];

  return (
    <>
      <div className="w-full bg-transparent">
        <div
          className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          } ${outfit.className}`}
        >
          <div
            className={`w-full max-w-[1600px] mx-auto px-4 md:px-16 flex items-center justify-between py-4 ${textColor}`}
          >
            <div className="flex items-center gap-8">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src={logoSrc}
                  alt=""
                  width={36}
                  height={26}
                  className="w-[30px] h-[26px] md:w-[36px] md:h-[31px]"
                />
                <h1
                  className={`${outfit.className} ml-2 text-xl md:text-[36px] font-bold`}
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
                  textColor={textColor}
                />
              )}
            </div>
            {!isMobile ? (
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => router.push("/sign-in")}
                  className={`border-none outline-none ${textColor}`}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => router.push("/sign-up")}
                  className={`bg-transparent hover:bg-white/20 ${
                    isBlogOrTools
                      ? "text-black border-black/40 hover:bg-black/10"
                      : "text-white border-white"
                  } border rounded-full`}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100/40 border border-gray-300 rounded-full"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={`w-5 h-5 ${
                      isBlogOrTools ? "text-black" : "text-white"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-5 h-5 ${
                      isBlogOrTools ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div className="fixed top-[68px] left-0 right-0 bg-white z-20 border-b md:hidden">
          <div className="px-4 py-2 space-y-2">
            {/* Navigation Items - Use Navs array */}
            <div className="space-y-1 border-b pb-2">
              {Navs.map((item, index) => {
                if (item.isTools) {
                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => setMobileToolsOpen((open) => !open)}
                        className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg justify-between"
                      >
                        <span className={`${outfit.className} text-sm`}>
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`ml-2 w-4 h-4 transition-transform ${
                            mobileToolsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileToolsOpen && (
                        <div className="pl-4 pb-2">
                          <button
                            onClick={() => setMobileToolsRole("recruiter")}
                            className="flex items-center w-full p-2 hover:bg-gray-100 rounded-lg justify-between"
                          >
                            <span className="text-sm">For Recruiters</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setMobileToolsRole("job_seeker")}
                            className="flex items-center w-full p-2 hover:bg-gray-100 rounded-lg justify-between"
                          >
                            <span className="text-sm">For Job Seekers</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          {/* Submenu for recruiter/job_seeker */}
                          {mobileToolsRole && (
                            <div className="pl-4 pt-2">
                              {(mobileToolsRole === "recruiter"
                                ? recruiterMenu
                                : jobSeekerMenu
                              ).map((subitem) => (
                                <button
                                  key={subitem.title}
                                  onClick={() => {
                                    // Use same redirect logic as desktop
                                    if (!userData?.token) {
                                      router.push(
                                        `/sign-in?redirect=${encodeURIComponent(
                                          subitem.path
                                        )}`
                                      );
                                    } else if (
                                      mobileToolsRole === "recruiter" &&
                                      userData?.user?.role === "job_seeker"
                                    ) {
                                      router.push(
                                        `/sign-in?redirect=${encodeURIComponent(
                                          subitem.path
                                        )}`
                                      );
                                    } else {
                                      router.push(subitem.path);
                                    }
                                    setIsMobileMenuOpen(false);
                                    setMobileToolsOpen(false);
                                    setMobileToolsRole(null);
                                  }}
                                  className="flex items-center w-full p-2 hover:bg-gray-200 rounded-lg text-left text-sm"
                                >
                                  {subitem.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
                // All other nav items
                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      // Protected logic for mobile
                      if (item.protected) {
                        if (item.title === "Post a job") {
                          if (!userData?.token) {
                            router.push(
                              `/sign-in?redirect=${encodeURIComponent(
                                item.link
                              )}`
                            );
                            setIsMobileMenuOpen(false);
                            return;
                          }
                          if (userData?.user?.role === "job_seeker") {
                            router.push(
                              `/sign-in?redirect=${encodeURIComponent(
                                item.link
                              )}`
                            );
                            setIsMobileMenuOpen(false);
                            return;
                          }
                        } else if (!userData?.token) {
                          router.push(
                            `/sign-in?redirect=${encodeURIComponent(item.link)}`
                          );
                          setIsMobileMenuOpen(false);
                          return;
                        }
                      }
                      router.push(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <span className={`${outfit.className} text-sm`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Auth Buttons (unchanged) */}
            <div className="py-2 space-y-2">
              <button
                onClick={() => {
                  router.push("/sign-in");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg"
              >
                <span className={`${outfit.className} text-sm`}>Log In</span>
              </button>
              <button
                onClick={() => {
                  router.push("/sign-up");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg"
              >
                <span className={`${outfit.className} text-sm`}>Sign Up</span>
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
  textColor,
}: {
  scrollToSection: (sectionRef: RefObject<HTMLDivElement>) => void;
  aboutUsSectionRef: RefObject<HTMLDivElement>;
  toolsSectionRef: RefObject<HTMLDivElement>;
  pricingSectionRef: RefObject<HTMLDivElement>;
  blogSectionRef: RefObject<HTMLDivElement>;
  CommunitySectionRef: RefObject<HTMLDivElement>;
  textColor: string;
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

  const handleMenuClick = (path: string, isRecruiterMenu = false) => {
    if (!userData?.token) {
      // If not logged in, redirect to login with the intended destination
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else if (isRecruiterMenu && userData?.user?.role === "job_seeker") {
      // If job_seeker tries to access recruiter menu, redirect to login
      router.push(`/sign-in?redirect=${encodeURIComponent(path)}`);
    } else {
      // If logged in and authorized, go directly to the page
      router.push(path);
    }
  };

  const Navs = [
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/tools",
      isTools: true,
    },
    {
      ref: aboutUsSectionRef,
      title: "About",
      link: "/about",
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/blog",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/pricing",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
    {
      title: "Apply for a job",
      link: "/dashboard/job-board",
      protected: true,
    },
    {
      title: "Post a job",
      link: "/dashboard/create",
      protected: true,
    },
    {
      title: "Join talent pool",
      link: "/dashboard/talent-pool/join-talent-pool",
      protected: true,
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
      <div className="flex items-center text-[16px] space-x-12 ml-12">
        {Navs.map((nav, index) =>
          nav.isTools ? (
            <div
              key={nav.title}
              className="relative flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`${outfit.className} ${textColor} cursor-pointer flex items-center`}
              >
                {nav.title}
                <ChevronDown className="ml-1 w-4 h-4" />
              </span>
              {showDropdown && (
                <div className="absolute top-8 left-0 bg-white p-0 rounded shadow-lg z-50 min-w-[180px]">
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
                      For Job Seekers <ChevronRight className="ml-2 w-4 h-4" />
                    </div>
                    {hoveredRole && (
                      <div className="absolute top-0 left-full bg-white shadow-lg min-w-[180px] rounded border flex flex-col gap-1 z-50">
                        {(hoveredRole === "recruiter"
                          ? recruiterMenu
                          : jobSeekerMenu
                        ).map((item) => (
                          <div
                            key={item.title}
                            onClick={() =>
                              handleMenuClick(
                                item.path,
                                hoveredRole === "recruiter"
                              )
                            }
                            className="text-black text-[15px] px-3 py-2 rounded hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavItem
              scrollToSection={scrollToSection}
              {...nav}
              key={index}
              textColor={textColor}
            />
          )
        )}
      </div>
    </div>
  );
};
const NavItem = ({ title, link, textColor, protected: isProtected }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const { userData } = useUserStore();
  const path = (pathName ?? "").split("/")[
    (pathName ?? "").split("/").length - 1
  ];
  const isActive = path === link.split("/")[link.split("/").length - 1];
  const onClick = () => {
    if (isProtected) {
      // Special case for 'Post a job'
      if (title === "Post a job") {
        if (!userData?.token) {
          router.push(`/sign-in?redirect=${encodeURIComponent(link)}`);
          return;
        }
        if (userData?.user?.role === "job_seeker") {
          router.push(`/sign-in?redirect=${encodeURIComponent(link)}`);
          return;
        }
      } else if (!userData?.token) {
        router.push(`/sign-in?redirect=${encodeURIComponent(link)}`);
        return;
      }
    }
    router.push(link);
  };
  return (
    <span
      onClick={onClick}
      className={`${
        isActive
          ? "font-bold underline underline-offset-2 transform transition-all"
          : ""
      } ${outfit.className} ${textColor} cursor-pointer text-center`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
