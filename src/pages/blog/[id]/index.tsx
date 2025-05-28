import { inter, outfit, poppins } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import LandingFooter from "@/components/home/wrapper/landing-footer";
import LandingHeader from "@/components/home/wrapper/landing-header";
import { ChevronLeft, ChevronRight, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, RefObject, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogItem } from "@/actions/blog";
import { useUserStore } from "@/hooks/use-user-store";
import { BlogItem } from "@/actions/blog";

const BlogPostDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { id } = router.query;
  const { userData } = useUserStore();

  // Add required refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  // Scroll function
  const scrollToSection = (sectionRef: RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { data: blog, isLoading } = useQuery<BlogItem>({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!userData?.token || !id) throw new Error("No token or ID available");
      return await getBlogItem(userData.token, id as string);
    },
    enabled: !!userData?.token && !!id,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 8);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader
        scrollToSection={scrollToSection}
        aboutUsSectionRef={aboutRef}
        toolsSectionRef={toolsRef}
        pricingSectionRef={pricingRef}
        blogSectionRef={blogRef}
        CommunitySectionRef={communityRef}
      />
      {/* Header Section */}
      <div className="w-full bg-black text-white">
        <div className="md:px-16 mx-auto px-4 py-16 pt-[160px]">
          <h1
            className={`${outfit.className} text-[30px] md:text-[56px] leading-tight mb-[12px] md:mb-6`}
          >
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            {isMobile ? (
              <div className="flex items-center gap-2">
                <span>by {blog.user?.name || "Anonymous"}</span>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-2">
                  <Image
                    src="/clock.png"
                    alt="read time"
                    width={14}
                    height={14}
                  />
                  <span>{blog.views} views</span>
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-black  flex items-center justify-center">
                {blog.user?.photo ? (
                  <Image
                    src={blog.user.photo}
                    alt="Author"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="w-10 h-10 text-white" />
                )}
              </div>
            )}
            {!isMobile && (
              <div className="flex items-center gap-2">
                <span className="text-base">
                  {blog.user?.name || "Anonymous"}
                  {blog.user?.job_title && ` - ${blog.user.job_title}`}
                  {blog.user?.company && ` at ${blog.user.company}`}
                </span>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-2">
                  <Image
                    src="/clock.png"
                    alt="read time"
                    width={14}
                    height={14}
                  />
                  <span>_ minute read</span>
                </div>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/network.png"
                      alt="read time"
                      width={12}
                      height={12}
                    />
                    <span>{blog.views} views</span>
                  </div>
                  <span className="text-gray-400">—</span>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/fb.png"
                      alt="Facebook"
                      width={13.3}
                      height={13.3}
                    />
                    <Image
                      src="/twitter.png"
                      alt="Facebook"
                      width={13.3}
                      height={11.3}
                    />
                    <Image
                      src="/pinterest.png"
                      alt="Facebook"
                      width={13.3}
                      height={13.3}
                    />
                    <span>{blog.shares} shares</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 md:px-16 py-12">
        <div className="relative flex gap-8">
          {/* Side Social Panel */}
          <div className="text-[12px] hidden lg:flex flex-col items-center gap-8 pt-[20px] h-fit">
            <div className="flex flex-col items-center">
              <Image src="/viewb.png" alt="Views" width={12} height={12} />
              <p className="text[12px] text-gray-600 mt-2">views</p>
              <p className="font-medium">{blog.views}</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/share.png" alt="Shares" width={15} height={16} />
              <p className="text[12px] text-gray-600 mt-2">shares</p>
              <p className="font-medium">{blog.shares}</p>
            </div>
            <div className="flex flex-col items-center gap-[2px]">
              <button className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/fbb.png"
                  alt="Facebook"
                  width={16.6}
                  height={16.6}
                />
              </button>
              <p className="font-medium">{blog.shares}</p>
              <button className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/twitterb.png"
                  alt="Facebook"
                  width={17.4}
                  height={14.1}
                />
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/pinterestb.png"
                  alt="Facebook"
                  width={16.6}
                  height={16.6}
                />
              </button>
              <p className="font-medium">{blog.shares}</p>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`${inter.className} pt-[14px] space-y-6 text-gray-800 flex-1`}
          >
            {blog.image && (
              <div className="w-full h-[400px] relative mb-8">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: blog.content || "" }} />
          </div>
        </div>

        {/* Social Share Section */}
        <div className="grid grid-cols-4 gap-0 mt-12 mb-8">
          <div className="text-gray-600 border-b border-gray-300 flex justify-center items-center text-xs md:text-base py-2 md:py-2.5">
            {blog.shares} Shares
          </div>
          <button className="flex items-center gap-1 md:gap-2 text-[#3B5998] flex-1 justify-center border-b border-[#3B5998] py-2 md:py-2.5 hover:bg-gray-50">
            <Image
              src="/fbc.png"
              alt="Facebook"
              width={16}
              height={16}
              className="w-4 md:w-6 h-4 md:h-6"
            />
            <span className="text-xs md:text-base hidden md:inline">SHARE</span>
            <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
              {blog.shares}
            </span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 text-[#1DA1F2] flex-1 justify-center border-b border-gray-300 py-2 md:py-2.5 hover:bg-gray-50">
            <Image
              src="/twc.png"
              alt="Twitter"
              width={16}
              height={16}
              className="w-4 md:w-6 h-4 md:h-6"
            />
            <span className="text-xs md:text-base hidden md:inline">TWEET</span>
            <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
              {blog.shares}
            </span>
          </button>
          <button className="flex items-center gap-1 md:gap-2 text-[#E60023] flex-1 justify-center border-b border-[#E60023] py-2 md:py-2.5 hover:bg-gray-50">
            <Image
              src="/pinc.png"
              alt="Pinterest"
              width={16}
              height={16}
              className="w-4 md:w-6 h-4 md:h-6"
            />
            <span className="text-gray-400 text-xs md:text-base ml-0 md:ml-1">
              {blog.shares}
            </span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12 mb-16">
          <button
            className={`${outfit.className} w-full bg-[#18181B] text-white py-4 rounded text-center text-base font-light tracking-wider`}
          >
            VIEW COMMENTS (0)
          </button>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default BlogPostDetail;
