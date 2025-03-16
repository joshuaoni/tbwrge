import { inter, outfit, poppins } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import { BlogCard } from "@/pages/blog-posts";
import LandingFooter from "@/pages/home/components/wrapper/landing-footer";
import LandingHeader from "@/pages/home/components/wrapper/landing-header";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, RefObject, useState } from "react";

const BlogPostDetail = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useIsMobile();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 8);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 8) % 8);
  };

  const router = useRouter();
  const { id } = router.query;

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
            5 EFFICIENT RULES HOW TO ORGANIZE YOUR WORKING PLACE
          </h1>
          <h2
            className={`${outfit.className} text-[20px] md:text-[32px] font-normal mb-[12px] leading-tight md:mb-8`}
          >
            Relationship tips couples therapists are giving all the time
          </h2>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            {isMobile ? (
              <div className="flex items-center gap-2">
                <span>by Paul Lomino</span>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-2">
                  <Image
                    src="/clock.png"
                    alt="read time"
                    width={14}
                    height={14}
                  />
                  <span>2 minute read</span>
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                <Image
                  src="/unsplash_c_GmwfHBDzk.png"
                  alt="Author"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!isMobile && (
              <div className="flex items-center gap-2">
                <span className="text-base">
                  Paul Lomino - Director HR, ABC LTD
                </span>
                <span className="text-gray-400">—</span>
                <div className="flex items-center gap-2">
                  <Image
                    src="/clock.png"
                    alt="read time"
                    width={14}
                    height={14}
                  />
                  <span>2 minute read</span>
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
                    <span>1.6K views</span>
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
                    <span>1.2K shares</span>
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
              <p className="font-medium">1.6K</p>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/share.png" alt="Shares" width={15} height={16} />
              <p className="text[12px] text-gray-600 mt-2">shares</p>
              <p className="font-medium">996K</p>
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
              <p className="font-medium">125</p>
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
              <p className="font-medium">425</p>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`${inter.className} pt-[14px] space-y-6 text-gray-800 flex-1`}
          >
            <p>
              Structured adipisci tate invisible mounted cuis for tempor fire
              held strong praesermit front fear sport etetal. Warmth comfort
              hangs loosely from the body large pocket at the front full button
              detail cotton blend side functional. Bodycon skirts straight waist
              pipping pockets pattern pleated chevron elastic waist print. Show
              more show more show more mini block heel almost toe flexible
              rubber sole simple chic ideal handmade metallic detail.
              Contemporary pure silk pocket square sophisticated handmade coral
              print pocket garden On trend twee this season.
            </p>

            <p>
              Striking pewter studded epaulettes silver stud inner drawstring
              waist internal stripe large single-breasted jacket. Engraved
              attention to detail elegant viscose comes cotton leather strap
              pattern with a pin a buckle clasp. Workwear bow detailing a
              slingback buckle strap stiletto heel timeless go-to shoe
              sophistication sleeves more. First elegant detail cue design
              cut-out sides luxe leather lining versatile shoe must-have new
              season glamorous.
            </p>

            <p>
              Foam padding in the insoles leather finest quality staple flat
              slip-on design pointed toe off-duty shoe. Black knicer lining
              concealed back zip fasten swing style high waisted double layer
              full pattern flare. Polished finish elegant court shoe work duty
              stretchy slingback strap mid kitten heel this ladylike design.
            </p>

            <h2 className="text-[20px] md:text-[30px] mt-8 mb-4">
              EU RIDICULUS FRINGILLA AENEAN
            </h2>

            <p>
              Socis consequat adipiscing sit curabitur donec sem luctus cras
              natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
              laoreet dapibus nec ac ante viverra. A aliquae sit lacus
              scelerisque ut parturient nisi sed enim. Nulla nec quis sit uraque
              sem commodo ultricies neque. Lorem eget venenatis dui ante luctus
              ultricies tellus montes. Quis in sapien tempus.
            </p>

            <ul className="list-disc pl-6 md:pl-16 space-y-2">
              <li>Crisp fresh iconic elegant timeless clean perfume</li>
              <li>Neck straight sharp silhouette and dart detail</li>
              <li>
                Machine wash cold slim fit premium stretch selvedge denim
                comfortable low waist
              </li>
            </ul>

            <p>
              See-through delicate embroidered organza blue fining scallop
              eyelash lace detail dressing. Leather detail shoulder contrasting
              colour contour stunning silhouette working peplum. Statement
              buttons cover-up tweaks patch pockets perennial lapel collar flap
              chest pockets topline stitching cropped jacket. Effortless
              comfortable full leather lining eye-catching unique detail to the
              toe low 'cut-away' sides clean and sleek. Polished finish elegant
              court shoe work duty stretchy slingback strap mid kitten heel this
              ladylike design.
            </p>
          </div>
        </div>

        {/* Social Share Section */}
        <div className="grid grid-cols-4 gap-0 mt-12 mb-8">
          <div className="text-gray-600 border-b border-gray-300 flex justify-center items-center text-xs md:text-base py-2 md:py-2.5">
            694 Shares
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
              694
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
              694
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
              694
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

          {/* Related Posts */}
          {/* Mobile View with Slider */}
          <div className="relative w-full md:hidden mt-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <BlogCard />
                    </div>
                  ))}
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/0 rounded-full p-2 shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[1, 2, 3, 4].map((item) => (
              <BlogCard key={item} />
            ))}
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default BlogPostDetail;
