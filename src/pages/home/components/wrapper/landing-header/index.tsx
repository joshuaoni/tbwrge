import { RefObject, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/use-mobile";
import { poppins } from "@/constants/app";
import { outfit } from "@/constants/app";
import { Menu, X } from "lucide-react";

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
      <div className="w-full px-4 md:px-16 z-20 fixed flex items-center justify-between bg-white top-0 border py-4">
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
                className="bg-[#009379] text-white"
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
                { title: "About", ref: aboutUsSectionRef },
                { title: "Tools", ref: toolsSectionRef },
                { title: "Pricing", ref: pricingSectionRef },
                { title: "Blog", ref: blogSectionRef },
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
  const Navs = [
    {
      title: "Home",
      link: "/home",
    },
    {
      ref: aboutUsSectionRef,
      title: "About",
      link: "/home/about",
    },
    {
      ref: toolsSectionRef,
      title: "Tools",
      link: "/home/tools",
    },
    {
      ref: pricingSectionRef,
      title: "Pricing",
      link: "/home/pricing",
    },
    {
      ref: blogSectionRef,
      title: "Blog",
      link: "/home/blog",
    },
    {
      ref: CommunitySectionRef,
      title: "Community",
      link: "/community",
    },
  ];
  return (
    <div>
      <div className="flex items-center text-[14px] space-x-12 ml-12">
        {Navs.map((nav, index) => (
          <NavItem scrollToSection={scrollToSection} {...nav} key={index} />
        ))}
      </div>
    </div>
  );
};
const NavItem = ({ title, link }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split("/")[pathName.split("/").length - 1];
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
          ? "text-primary font-bold underline underline-offset-2 transform transition-all"
          : "text-black"
      } ${poppins.className} cursor-pointer`}
    >
      {title}
    </span>
  );
};

export default LandingHeader;
