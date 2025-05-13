import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/hooks/use-user-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeamMember } from "@/actions/update-team-member";
import toast from "react-hot-toast";

interface EditTeamMemberProps {
  member: {
    id: string;
    user: {
      name: string;
      email: string;
    };
    permission: "admin" | "recruiter" | "tools" | "content";
    accepted: boolean;
  };
  onClose: () => void;
}

const EditTeamMember = ({ member, onClose }: EditTeamMemberProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<
    "admin" | "recruiter" | "tools" | "content"
  >("tools");
  const [accepted, setAccepted] = useState(false);
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (member) {
      setName(member.user.name);
      setEmail(member.user.email);
      setPermission(member.permission);
      setAccepted(member.accepted);
    }
  }, [member]);

  const editTeamMemberMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token) throw new Error("No token available");
      return updateTeamMember(
        member.id,
        {
          permission,
          accepted,
        },
        userData.token
      );
    },
    onSuccess: () => {
      toast.success("Team member updated");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["get-members"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update team member");
    },
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">Edit Team Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Permission
            </label>
            <select
              value={permission}
              onChange={(e) =>
                setPermission(
                  e.target.value as "admin" | "recruiter" | "tools" | "content"
                )
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="tools">Tools</option>
              <option value="content">Content</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={accepted ? "accepted" : "pending"}
              onChange={(e) => setAccepted(e.target.value === "accepted")}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <Button
            onClick={() => {
              editTeamMemberMutation.mutate();
            }}
            className="bg-primary text-white w-full"
            disabled={editTeamMemberMutation.isPending}
          >
            {editTeamMemberMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamMember;
