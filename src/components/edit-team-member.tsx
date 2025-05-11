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
import { addTeamMember } from "@/actions/add-team-member";
import toast from "react-hot-toast";

interface EditTeamMemberProps {
  member: any;
  onClose: () => void;
}

const EditTeamMember = ({ member, onClose }: EditTeamMemberProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (member) {
      setName(member.user.name);
      setEmail(member.user.email);
    }
  }, [member]);

  const editTeamMemberMutation = useMutation({
    mutationKey: ["edit-team-member"],
    mutationFn: async () => {
      const response = await addTeamMember({
        name,
        email,
        permission: "tools",
        token: userData?.token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Team member updated");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["get-members"] });
    },
    onError: () => {
      toast.error("Failed to update team member");
    },
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">Edit Team Member</DialogTitle>
        </DialogHeader>
        <label>Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button
          onClick={() => {
            editTeamMemberMutation.mutate();
          }}
          className="bg-primary text-white"
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamMember;
