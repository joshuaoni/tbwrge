import { getTeamMembers } from "@/actions/get-team-members";
import AddTeamMember from "@/components/add-team-member";
import EditTeamMember from "@/components/edit-team-member";
import DashboardSettingsLayout from "@/components/settings/layout";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const TeamsAndCollaborationSettingsPage = () => {
  const _ = require("lodash");

  const [teams, setTeams] = useState([
    {
      name: "Tobi",
      status: "Accepted",
      email: "test@gmail.com",
    },
    {
      name: "Dave",
      status: "Accepted",
      email: "test@gmail.com",
    },
    {
      name: "Tobi",
      status: "Accepted",
      email: "test@gmail.com",
    },
  ]);
  const { userData } = useUserStore();

  const { data } = useQuery({
    queryKey: ["get-members"],
    queryFn: async () => {
      const response = await getTeamMembers(userData?.token);
      return response;
    },
  });

  return (
    <DashboardSettingsLayout>
      <div className="h-screen flex flex-col space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Teams & Collaboration
          </h1>
          <AddTeamMember />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gray-100 text-gray-600 font-semibold py-3 px-5 rounded-md">
          {["User", "Status", "Email", "Actions"].map((text, i) => (
            <div
              key={i}
              className={twMerge("text-center", i === 0 && "text-left")}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Team List */}
        <div className="space-y-4">
          {data?.map((item: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center bg-white p-4 rounded-md shadow-sm transition-shadow duration-300"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                {item.user.profile_picture != null ? (
                  <Image
                    alt="profile_pic"
                    src={item.user.profile_picture}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                ) : (
                  <UserCircle size={40} className="text-gray-500" />
                )}

                <div>
                  <p className="font-medium text-gray-800">{item.user.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(item.user.last_login), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <span
                  className={twMerge(
                    "px-3 py-1 text-xs rounded-md font-medium",
                    item.accepted
                      ? "bg-[#377DFF33] text-blue-500 text-xs"
                      : "bg-[#377DFF33] text-blue-500 text-xs"
                  )}
                >
                  {item.accepted ? "Accepted" : "Pending"}
                </span>
              </div>

              {/* Email */}
              <div className="text-center text-gray-700">{item.user.email}</div>

              {/* Actions */}
              <div className="flex justify-center space-x-3">
                {["Edit", "Suspend", "Delete"].map((action, idx) => {
                  if (action === "Edit") {
                    return <EditTeamMember />;
                  }
                  return (
                    <button
                      key={idx}
                      className="bg-primary text-white text-sm px-3 py-1 rounded-full hover:bg-primary/90 transition-colors duration-300"
                    >
                      {action}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardSettingsLayout>
  );
};

export default TeamsAndCollaborationSettingsPage;
