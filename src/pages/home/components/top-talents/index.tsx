import { outfit } from "@/constants/app";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

interface Talent {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
}

const dummyTalents: Talent[] = [
  {
    id: 1,
    name: "John Smith",
    title: "CEO and Founder",
    image: "/unsplash_man.png",
    description:
      "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Senior Developer",
    image: "/unsplash_man.png",
    description:
      "Full-stack developer with expertise in React, Node.js, and cloud architecture",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "UX Designer",
    image: "/unsplash_man.png",
    description:
      "Award-winning designer specializing in user experience and interface design",
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Product Manager",
    image: "/unsplash_man.png",
    description:
      "Product strategy expert with a track record of successful launches",
  },
  {
    id: 5,
    name: "David Wilson",
    title: "Data Scientist",
    image: "/unsplash_man.png",
    description:
      "Machine learning specialist with focus on predictive analytics",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    title: "Marketing Director",
    image: "/unsplash_man.png",
    description:
      "Digital marketing strategist with expertise in growth hacking",
  },
];

const TalentCard = ({ talent }: { talent: Talent }) => {
  return (
    <div
      className="rounded-[28px] border border-black/60 shadow-[0_4px_0_0_rgba(0,0,0,0.7)] bg-white w-[340px] h-[280px] flex flex-col items-center p-7 relative"
      style={{ boxSizing: "border-box" }}
    >
      {/* Profile + Name/Title */}
      <div className="flex gap-4 items-end justify-start w-full">
        <div className="relative w-[84px] h-[84px] mb-2">
          {/* Green SVG shape with shadow */}
          <svg
            className="absolute left-0 top-0 w-full h-full z-0"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 0C54 0 84 30 84 42C84 54 54 84 42 84C30 84 0 54 0 42C0 30 30 0 42 0Z"
              fill="#00C853"
              fillOpacity="0.8"
            />
          </svg>
          {/* Shadow for the SVG shape */}
          <svg
            className="absolute left-2 top-2 w-full h-full z-0"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42 0C54 0 84 30 84 42C84 54 54 84 42 84C30 84 0 54 0 42C0 30 30 0 42 0Z"
              fill="#000"
              fillOpacity="0.18"
            />
          </svg>
          {/* Profile image */}
          <Image
            src={talent.image}
            alt={talent.name}
            width={84}
            height={84}
            className="rounded-full object-cover absolute left-0 top-0 w-[84px] h-[84px] z-10"
          />
        </div>
        <div className="text-left mt-1">
          <div className="font-bold text-[20px] leading-tight text-black">
            {talent.name}
          </div>
          <div className="text-[17px] text-black/80 mt-0.5">{talent.title}</div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full border-t border-black/60 my-5" />
      {/* Description */}
      <div className="text-[17px] text-black text-left w-full leading-snug">
        {talent.description}
      </div>
    </div>
  );
};

const TopTalents = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${outfit.className} bg-white relative h-fit pt-24 md:pt-[74px] flex flex-col items-center justify-center p-4 py-12  md:p-12 md:px-16`}
    >
      {/* Navigation Arrows and Frame Number */}
      <div className="absolute top-8 right-12 flex items-center space-x-4 z-10">
        <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-black hover:bg-white/20">
          {/* Left Arrow SVG */}
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 4l-4 4 4 4" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-white/10 text-black hover:bg-white/20">
          {/* Right Arrow SVG */}
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>

      <h2 className="w-full text-2xl md:text-3xl font-bold text-black mb-8">
        Top Talents
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dummyTalents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  );
};

export default TopTalents;
