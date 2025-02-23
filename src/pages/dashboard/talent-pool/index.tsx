import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFilePdf, FaSearch } from "react-icons/fa";

import { getTalents, TalentItem } from "@/actions/talent";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useDebounce } from "@/hooks/debounce";
import { useUserStore } from "@/hooks/use-user-store";

export default function TalentPool() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [type, setType] = useState<"location" | "skills" | "text">("location");
  const searchValDebounce = useDebounce(searchVal, 1500);

  const { userData } = useUserStore();

  const query = useQuery<TalentItem[]>({
    queryKey: ["get-talents", page, searchValDebounce, type],
    queryFn: async () =>
      await getTalents(userData?.token ?? "", {
        page: page.toString(),
        text: searchValDebounce,
        search_type: type,
      }),
  });

  return (
    <DashboardWrapper>
      <span className="font-bold text-xl">Talent Pool</span>
      <div className="p-6  min-h-screen">
        <div className=" mx-auto bg-white p-4 rounded-lg ">
          <div className="flex items-center gap-3">
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search for Keywords"
                className="w-full p-2 pl-8 border text-sm rounded-full bg-[#F0F0F0] focus:outline-none"
                value={type === "text" ? searchVal : ""}
                onChange={(e) => {
                  setType("text");
                  setSearchVal(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border text-sm rounded-lg bg-[#F0F0F0] focus:outline-none"
                value={type === "location" ? searchVal : ""}
                onChange={(e) => {
                  setType("location");
                  setSearchVal(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="Skills"
                className="w-full p-2 border text-sm rounded-lg bg-[#F0F0F0] focus:outline-none"
                value={type === "skills" ? searchVal : ""}
                onChange={(e) => {
                  setType("skills");
                  setSearchVal(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto bg-[#F0F0F0] p-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#D6D6D6] rounded-lg mb-4">
                <tr className="rounded-lg">
                  <th className="p-3 text-[#898989]">CANDIDATE NAME</th>
                  <th className="text-[#898989]">Location</th>
                  <th className="text-[#898989]">Skills</th>
                  <th className="text-[#898989]">Most Recent Position</th>
                  <th className="text-[#898989]">ATTACHMENTS</th>
                </tr>
              </thead>
              <tbody className="">
                {query.data?.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-t cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/dashboard/talent-pool/${candidate.id}/details`
                      )
                    }
                  >
                    <td className="p-3 font-medium whitespace-nowrap text-[#000000] ">
                      {candidate.name}
                    </td>
                    <td className="whitespace-nowrap">
                      {candidate.nationality}
                    </td>
                    <td className="whitespace-nowrap">
                      {candidate.skills_summary}
                    </td>
                    <td className="whitespace-nowrap">
                      {candidate.current_position}
                    </td>
                    <td className="text-blue-500 flex items-center gap-2 whitespace-nowrap">
                      <FaFilePdf /> {candidate.cv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
