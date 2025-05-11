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
  const { userData } = useUserStore();
  const [editingMember, setEditingMember] = useState<any>(null);

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

        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl">User</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="py-3 px-6 text-left flex items-center space-x-2">
                    {item.user.profile_picture ? (
                      <Image
                        src={item.user.profile_picture}
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        style={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <UserCircle size={40} className="text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-sm text-[#333]">
                        {item.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last Login:{" "}
                        {formatDistanceToNow(new Date(item.user.last_login), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`p-1.5 text-xs rounded-md ${
                        item.accepted
                          ? "text-[#377DFF] bg-[#377DFF]/20"
                          : "text-[#FF3737] bg-[#FF3737]/20"
                      }`}
                    >
                      {item.accepted ? "Accepted" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{item.user.email}</td>
                  <td className="py-3 px-6 space-x-6">
                    {["Edit", "Suspend", "Delete"].map((action, idx) => {
                      if (action === "Edit") {
                        return (
                          <button
                            key={idx}
                            className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                            onClick={() => setEditingMember(item)}
                          >
                            {action}
                          </button>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                        >
                          {action}
                        </button>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingMember && (
        <EditTeamMember
          member={editingMember}
          onClose={() => setEditingMember(null)}
        />
      )}
    </DashboardSettingsLayout>
  );
};

export default TeamsAndCollaborationSettingsPage;
