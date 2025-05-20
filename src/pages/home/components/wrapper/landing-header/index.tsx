import { RefObject, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";
import { poppins } from "@/constants/app";
import { outfit } from "@/constants/app";
import { Menu, X, ChevronDown } from "lucide-react";
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

  return (
    <>
      <div className="w-full px-4 md:px-16 z-20 fixed flex items-center text-white justify-between bg-transparent top-0 py-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/home")}
            >
              {/* <div className="rounded-[6.96px] flex items-center justify-center bg-white w-[32px] h-[29.2px] md:w-10 md:h-[34px] relative"> */}
              {/* <div
              className="rounded-[0.12px] w-[22.26px] h-[18.96px] md:w-[27.83px] md:h-[23.7px] absolute"
              style={{
                top: "5px",
                left: "6.91px",
              }}
            > */}
              <Image
                src="/footer-logo.png"
                alt=""
                width={30}
                height={26}
                className="w-[30px] h-[26px] md:w-[34px] md:h-[29.2px]"
              />
              {/* </div> */}
              {/* </div> */}
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
  const userRole = userData?.user?.role;
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recruiterMenu = ["Job Posting", "Job Tools", "Job Board"];
  const jobSeekerMenu = [
    "Talent Pool",
    "Job Board",
    "Job Applications",
    "CV Tools",
    "Cover Letter Tools",
  ];
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
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 120);
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
                  <div className="rounded p-2 flex flex-col gap-2">
                    {(userRole === "recruiter"
                      ? recruiterMenu
                      : jobSeekerMenu
                    ).map((item) => (
                      <div
                        key={item}
                        className="text-black text-[15px] px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
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
