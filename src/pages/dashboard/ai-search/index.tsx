import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import DashboardWrapper from "@/components/dashboard-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { outfit } from "@/constants/app";
import { useTranslation } from "react-i18next";

// Dummy data for the table
const dummyJobData = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    jobType: "Full-time",
    skills: ["React", "TypeScript", "Next.js", "CSS"],
    languages: ["English", "Spanish"],
    tags: ["Remote", "Tech", "Senior Level"],
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    jobType: "Contract",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    languages: ["English", "French"],
    tags: ["Design", "Creative", "Remote"],
  },
  {
    id: 3,
    jobTitle: "Full Stack Engineer",
    jobType: "Full-time",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    languages: ["English", "German"],
    tags: ["Backend", "Frontend", "Mid Level"],
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    jobType: "Full-time",
    skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
    languages: ["English", "Mandarin"],
    tags: ["AI/ML", "Data", "Senior Level"],
  },
  {
    id: 5,
    jobTitle: "Product Manager",
    jobType: "Full-time",
    skills: ["Strategy", "Agile", "Analytics", "Roadmapping"],
    languages: ["English", "Portuguese"],
    tags: ["Product", "Management", "Strategy"],
  },
];

export default function AISearch() {
  const { t } = useTranslation();
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(dummyJobData);

  const handleSearch = async () => {
    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filter dummy data based on search criteria
    let filteredResults = dummyJobData;

    if (jobTitle) {
      filteredResults = filteredResults.filter((job) =>
        job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
      );
    }

    setSearchResults(filteredResults);
    setIsSearching(false);
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

  return (
    <DashboardWrapper>
      <div className={`${outfit.className} space-y-4`}>
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-sm font-bold text-gray-900">
            {t("aiSearch.title")}
          </h1>
          <p className="text-gray-600 text-sm">{t("aiSearch.description")}</p>
        </div>

        {/* Search Filters */}
        <div className="">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Job Title Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("aiSearch.jobTitle")}
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder={t("aiSearch.jobTitlePlaceholder")}
                className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            {/* Country Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("aiSearch.country")}
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={t("aiSearch.countryPlaceholder")}
                className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="text-sm px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={20} />
              {isSearching ? t("aiSearch.searching") : t("aiSearch.search")}
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="">
              <TableHeader className="h-[39.292px] mb-4">
                <TableRow className="bg-[#D6D6D6]">
                  <TableHead className="w-[20%] text-[#898989] h-[39.292px] first:rounded-l-[7.76px]">
                    {t("aiSearch.table.jobTitle")}
                  </TableHead>
                  <TableHead className="w-[15%] text-[#898989] h-[39.292px]">
                    {t("aiSearch.table.jobType")}
                  </TableHead>
                  <TableHead className="w-[25%] text-[#898989] h-[39.292px]">
                    {t("aiSearch.table.skills")}
                  </TableHead>
                  <TableHead className="w-[20%] text-[#898989] h-[39.292px]">
                    {t("aiSearch.table.languages")}
                  </TableHead>
                  <TableHead className="w-[20%] text-[#898989] h-[39.292px] last:rounded-r-[7.76px]">
                    {t("aiSearch.table.tags")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isSearching ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      <Loader2 className="animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : searchResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {t("aiSearch.noJobsFound")}
                    </TableCell>
                  </TableRow>
                ) : (
                  searchResults.map((job) => (
                    <TableRow
                      key={job.id}
                      className="cursor-pointer hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200"
                    >
                      <TableCell>
                        <div className="flex gap-[10px] items-center justify-start bg-[#F9F9F9] py-[5px] rounded-[6px]">
                          <div className="flex items-center justify-center w-[35px] ml-[6px]">
                            <div className="w-[35px] h-[35px] bg-primary rounded-full flex items-center justify-center">
                              <p className="text-white font-medium text-sm">
                                {job.jobTitle.charAt(0)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col w-[217px] gap-[4px]">
                            <h3 className="font-medium tracking-[0%] truncate text-[14px] leading-[15px] text-black">
                              {job.jobTitle}
                            </h3>
                            <div className="text-[12px] tracking-[0%] truncate leading-[15px] text-gray-500">
                              {job.jobType} Position
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full h-[19px] flex items-center justify-start">
                          <p className="font-inter font-normal text-[14px] leading-[100%] tracking-[5%] text-black">
                            {job.jobType}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-start items-center gap-2 overflow-hidden">
                          <ListWithCounter items={job.skills} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-start items-center overflow-hidden">
                          <ListWithCounter items={job.languages} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full overflow-hidden">
                          <ListWithCounterBlue items={job.tags} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {searchResults.length > 0 && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                disabled
              >
                {t("aiSearch.pagination.previous")}
              </button>
              <span className="px-3 py-2 bg-primary text-white rounded-md text-sm">
                1
              </span>
              <button className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                {t("aiSearch.pagination.next")}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
}
