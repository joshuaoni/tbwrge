import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/hooks/use-user-store";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addTeamMember } from "@/actions/add-team-member";
import toast from "react-hot-toast";

const EditTeamMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userData } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const AddTeamMemberMutation = useMutation({
    mutationKey: ["add-team-member"],
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
      toast.success("Team member added");
      setShowModal(false);
    },
    onError: () => {
      toast.error("Failed to add team member");
    },
  });
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger>
        <div className="bg-primary text-sm text-white px-3 py-1 rounded-full hover:bg-primary/90 transition-colors duration-300">
          Edit
        </div>
      </DialogTrigger>
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
            AddTeamMemberMutation.mutate();
          }}
          className="bg-primary text-white"
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamMember;
