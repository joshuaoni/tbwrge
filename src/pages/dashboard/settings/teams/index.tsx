import { getTeamMembers } from "@/actions/get-team-members";
import { deleteTeamMember } from "@/actions/delete-team-member";
import { updateTeamMember } from "@/actions/update-team-member";
import AddTeamMember from "@/components/add-team-member";
import EditTeamMember from "@/components/edit-team-member";
import DashboardSettingsLayout from "@/components/settings/layout";
import { useUserStore } from "@/hooks/use-user-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const TeamsAndCollaborationSettingsPage = () => {
  const { t } = useTranslation();
  const _ = require("lodash");
  const { userData } = useUserStore();
  const [editingMember, setEditingMember] = useState<any>(null);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const [memberToSuspend, setMemberToSuspend] = useState<any>(null);
  const [memberToUnsuspend, setMemberToUnsuspend] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Active Users");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["get-members"],
    queryFn: async () => {
      const response = await getTeamMembers(userData?.token);
      return response;
    },
  });

  const filteredMembers = data?.filter((member: any) => {
    if (activeTab === "Active Users") {
      return !member.suspended;
    } else if (activeTab === "Suspended Users") {
      return member.suspended;
    }
    return true;
  });

  const deleteMutation = useMutation({
    mutationFn: async (memberId: string) => {
      if (!userData?.token) throw new Error("No token available");
      return deleteTeamMember(memberId, userData.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-members"] });
      setMemberToDelete(null);
      toast.success(
        t("settings.teams.memberDeleted", "Team member deleted successfully")
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          t("settings.teams.deleteMemberError", "Failed to delete team member")
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      memberId,
      data,
    }: {
      memberId: string;
      data: {
        permission?: "admin" | "tools";
        accepted?: boolean;
        suspended?: boolean;
      };
    }) => {
      if (!userData?.token) throw new Error("No token available");
      return updateTeamMember(memberId, data, userData.token);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["get-members"] });
      setMemberToSuspend(null);
      if (variables.data.suspended) {
        toast.success(
          t(
            "settings.teams.memberSuspended",
            "Team member suspended successfully"
          )
        );
      } else if (variables.data.suspended === false) {
        toast.success(
          t(
            "settings.teams.memberUnsuspended",
            "Team member unsuspended successfully"
          )
        );
      } else {
        toast.success(
          t("settings.teams.memberUpdated", "Team member updated successfully")
        );
      }
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          t("settings.teams.updateMemberError", "Failed to update team member")
      );
    },
  });

  const handleSuspend = (member: any) => {
    setMemberToSuspend(member);
  };

  const handleUnsuspend = (member: any) => {
    setMemberToUnsuspend(member);
  };

  return (
    <DashboardSettingsLayout>
      <div className="h-screen flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {t("settings.teams.title", "Teams & Collaboration")}
          </h1>
          <AddTeamMember />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6">
          {[
            t("settings.teams.activeUsers", "Active Users"),
            t("settings.teams.suspendedUsers", "Suspended Users"),
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium ${
                activeTab === tab ? "text-[#2563EB]" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl">
          <table className="w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#D6D6D6] text-[#898989] text-sm font-bold">
                <th className="py-3 px-6 text-left rounded-tl-xl">
                  {t("settings.teams.user", "User")}
                </th>
                <th className="py-3 px-6 text-left">
                  {t("settings.teams.status", "Status")}
                </th>
                <th className="py-3 px-6 text-left">
                  {t("settings.teams.email", "Email")}
                </th>
                <th className="py-3 px-6 text-left rounded-tr-xl">
                  {t("settings.teams.actions", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers?.map((item: any, i: number) => (
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
                        {t("settings.teams.lastLogin", "Last Login")}:{" "}
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
                      {item.accepted
                        ? t("settings.teams.accepted", "Accepted")
                        : t("settings.teams.pending", "Pending")}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{item.user.email}</td>
                  <td className="py-3 px-6 space-x-6">
                    {[
                      t("settings.teams.edit", "Edit"),
                      t("settings.teams.suspend", "Suspend"),
                      t("settings.teams.delete", "Delete"),
                    ].map((action, idx) => {
                      if (action === t("settings.teams.edit", "Edit")) {
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
                      if (action === t("settings.teams.delete", "Delete")) {
                        return (
                          <button
                            key={idx}
                            className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                            onClick={() => setMemberToDelete(item)}
                          >
                            {action}
                          </button>
                        );
                      }
                      if (action === t("settings.teams.suspend", "Suspend")) {
                        return item.suspended ? (
                          <button
                            key={idx}
                            className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                            onClick={() => handleUnsuspend(item)}
                            disabled={updateMutation.isPending}
                          >
                            {t("settings.teams.unsuspend", "Unsuspend")}
                          </button>
                        ) : (
                          <button
                            key={idx}
                            className="bg-primary text-white px-6 py-2 rounded-3xl text-sm font-semibold"
                            onClick={() => handleSuspend(item)}
                            disabled={updateMutation.isPending}
                          >
                            {t("settings.teams.suspend", "Suspend")}
                          </button>
                        );
                      }
                      return null;
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
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!memberToDelete}
        onOpenChange={() => setMemberToDelete(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>
              {t("settings.teams.deleteMember", "Delete Team Member")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "settings.teams.deleteConfirmation",
                "Are you sure you want to delete {{name}}? This action cannot be undone.",
                { name: memberToDelete?.user?.name }
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setMemberToDelete(null)}
            >
              {t("settings.teams.cancel", "Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                memberToDelete && deleteMutation.mutate(memberToDelete.id)
              }
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("settings.teams.deleting", "Deleting...")
                : t("settings.teams.delete", "Delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <Dialog
        open={!!memberToSuspend}
        onOpenChange={() => setMemberToSuspend(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>
              {t("settings.teams.suspendMember", "Suspend Team Member")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "settings.teams.suspendConfirmation",
                "Are you sure you want to suspend {{name}}? This action can be undone later.",
                { name: memberToSuspend?.user?.name }
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setMemberToSuspend(null)}
            >
              {t("settings.teams.cancel", "Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (memberToSuspend) {
                  updateMutation.mutate({
                    memberId: memberToSuspend.id,
                    data: { suspended: true },
                  });
                  setMemberToSuspend(null);
                }
              }}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending
                ? t("settings.teams.suspending", "Suspending...")
                : t("settings.teams.suspend", "Suspend")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsuspend Confirmation Dialog */}
      <Dialog
        open={!!memberToUnsuspend}
        onOpenChange={() => setMemberToUnsuspend(null)}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>
              {t("settings.teams.unsuspendMember", "Unsuspend Team Member")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "settings.teams.unsuspendConfirmation",
                "Are you sure you want to unsuspend {{name}}? They will regain access to the platform.",
                { name: memberToUnsuspend?.user?.name }
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setMemberToUnsuspend(null)}
            >
              {t("settings.teams.cancel", "Cancel")}
            </Button>
            <Button
              variant="default"
              onClick={() => {
                if (memberToUnsuspend) {
                  updateMutation.mutate({
                    memberId: memberToUnsuspend.id,
                    data: { suspended: false },
                  });
                  setMemberToUnsuspend(null);
                }
              }}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending
                ? t("settings.teams.unsuspending", "Unsuspending...")
                : t("settings.teams.unsuspend", "Unsuspend")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardSettingsLayout>
  );
};

export default TeamsAndCollaborationSettingsPage;
