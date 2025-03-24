import { useRouter } from "next/navigation";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IGetJobOpenRes } from "@/types/jobs";
import { formatDistanceToNow } from "date-fns";

interface TableProps {
  data: IGetJobOpenRes[];
  isLoading?: boolean;
}

interface TableBodyProps {
  jobs: IGetJobOpenRes[];
}

interface TableBodyRowProps {
  job: IGetJobOpenRes;
  className?: string;
  style?: React.CSSProperties;
}

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="w-full my-4" data-testid="table-skeleton">
      <div className="w-full h-[39.292px] rounded-[7.76px] bg-gray-200 mb-4 hidden md:block" />
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="w-full border-b border-gray-100 animate-pulse"
        >
          <div className="md:hidden p-4">
            <div className="space-y-3">
              <div className="w-3/4 h-5 bg-gray-100 rounded" />
              <div className="w-1/2 h-4 bg-gray-100 rounded" />
              <div className="flex gap-2">
                <div className="w-20 h-4 bg-gray-100 rounded" />
                <div className="w-24 h-4 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          <div className="hidden md:grid h-[51px] grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
            <div className="h-full rounded-[10px] p-1 pl-0">
              <div className="h-full w-full bg-gray-100 rounded-[6px]" />
            </div>
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

const TableHeader = () => {
  return (
    <div className="hidden md:grid w-full h-[39.292px] rounded-[7.76px] pt-[11.65px] pb-[11.65px] bg-[#D6D6D6] gap-4 grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center mb-4">
      {["Job Title", "Job Type", "Skills", "Languages", "Tags"].map(
        (text, i) => (
          <div
            key={i}
            className="h-[16px] first:pl-4 text-[#898989] flex items-center justify-start"
          >
            <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
              {text}
            </p>
          </div>
        )
      )}
    </div>
  );
};

const JobDetails = ({
  company,
  location,
  title,
  timeAgo,
  companyLogo,
}: {
  company: string;
  location: string;
  title: string;
  timeAgo: string;
  companyLogo?: string;
}) => {
  return (
    <div className="h-[51px] rounded-[10px] p-[4px] pl-0 gap-[10px] flex items-center">
      <div className="w-full h-full bg-[#F9F9F9] rounded-[10px] pl-[8px] pr-[8px] gap-[10px] flex">
        <div className="flex items-center justify-center w-[38px] h-[38px]">
          {companyLogo ? (
            <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
              <Image
                src={companyLogo}
                alt={title}
                width={38}
                height={38}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-[38px] h-[38px] bg-slate-300 rounded-full flex items-center justify-center">
              <p className="text-white font-medium">{company[0]}</p>
            </div>
          )}
        </div>
        <div className="w-[217px] h-[37px] gap-[4px] flex flex-col">
          <div className="w-[217px] h-[18px] flex items-center">
            <p className="font-inter font-medium text-[12px] leading-[15px] tracking-[0%] truncate text-[#333333]">
              {title}
            </p>
          </div>
          <div className="w-[217px] h-[18px] flex items-center">
            <p className="font-inter font-normal text-[12px] leading-[15px] tracking-[0%] truncate text-[#8F8F8F]">
              {company}, {location} - {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListWithCounter = ({
  items,
  displayCount = 1,
}: {
  items: string[];
  displayCount?: number;
}) => {
  const displayItems = items.slice(0, displayCount);
  const remainingCount = items.length - displayCount;

  return (
    <div className="flex justify-start items-center overflow-hidden">
      <span className="text-sm text-black truncate" title={items.join(", ")}>
        {displayItems.join(", ")}
      </span>
      {remainingCount > 0 && (
        <span
          className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
          title={items.slice(displayCount).join(", ")}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

const ListWithCounterBlue = ({
  items,
  displayCount = 1,
}: {
  items: string[];
  displayCount?: number;
}) => {
  const displayItems = items.slice(0, displayCount);
  const remainingCount = items.length - displayCount;

  return (
    <div className="flex justify-start items-center overflow-hidden">
      <span className="text-sm text-black truncate" title={items.join(", ")}>
        {displayItems.join(", ")}
      </span>
      {remainingCount > 0 && (
        <span
          className="ml-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600"
          title={items.slice(displayCount).join(", ")}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

const formatJobType = (type: string) => {
  const words = type.split("_");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const JobType = ({ type }: { type: string }) => {
  return (
    <div className="w-full h-[19px] flex items-center justify-start">
      <p className="font-inter font-normal text-[16px] leading-[100%] tracking-[5%] text-black">
        {formatJobType(type)}
      </p>
    </div>
  );
};

const JobSkills = ({ skills }: { skills: string }) => {
  const skillsList = (skills || "")
    .split(",")
    .map((skill: string) => skill.trim());
  return (
    <div className="w-full flex justify-start items-center gap-2 overflow-hidden">
      <ListWithCounter items={skillsList} />
    </div>
  );
};

const Languages = ({ languages }: { languages: string }) => {
  const languageList = (languages || "")
    .split(",")
    .map((lang: string) => lang.trim());
  return (
    <div className="w-full flex justify-start items-center overflow-hidden">
      <ListWithCounter items={languageList} />
    </div>
  );
};

const Tags = ({ tags }: { tags: string }) => {
  const tagsList = (tags || "").split(",").map((tag: string) => tag.trim());
  return (
    <div className="w-full overflow-hidden">
      <ListWithCounterBlue items={tagsList} />
    </div>
  );
};

const TableBodyRow = ({ job, className = "", style }: TableBodyRowProps) => {
  const router = useRouter();
  const timeAgo = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
  });

  const handleClick = () => {
    router.push(`/dashboard/job-board/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full hover:bg-gray-50 cursor-pointer transition-all duration-200 ${className}`}
      style={style}
      data-testid="table-row"
    >
      <div className="md:hidden p-4" data-testid="table-row-mobile">
        <div className="space-y-2">
          <h3 className="font-medium text-base text-black">{job.job_title}</h3>
          <p className="text-sm text-gray-600">{job.company_name}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span>{job.job_location_name}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {job.job_type}
            </span>
            {(job.required_skills || "")
              .split(",")
              .slice(0, 2)
              .map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {skill.trim()}
                </span>
              ))}
            {(job.required_skills || "").split(",").length > 2 && (
              <span className="text-xs text-gray-500">
                +{(job.required_skills || "").split(",").length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className="hidden md:grid h-[51px] grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center hover:scale-[1.01] transition-all duration-200"
        data-testid="table-row-desktop"
      >
        <JobDetails
          company={job.company_name}
          location={job.job_location_name}
          title={job.job_title}
          timeAgo={timeAgo}
          companyLogo={job.company_logo}
        />
        <JobType type={job.job_type} />
        <JobSkills skills={job.required_skills} />
        <Languages languages={job.languages} />
        <Tags tags={job.tags} />
      </div>
    </div>
  );
};

const TableBody = ({ jobs }: TableBodyProps) => {
  console.log({ jobs });
  if (!jobs.length) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        No jobs found matching your criteria
      </div>
    );
  }

  return (
    <div className="w-full divide-y divide-gray-100">
      {jobs.map((job, index) => (
        <TableBodyRow
          key={job.id}
          job={job}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </div>
  );
};

const Table = ({ data = [], isLoading = false }: TableProps) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full my-4">
      <TableHeader />
      <TableBody jobs={data} />
    </div>
  );
};

export default Table;
