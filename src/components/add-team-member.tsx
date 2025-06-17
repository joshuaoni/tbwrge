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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeamMember } from "@/actions/add-team-member";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const AddTeamMember = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userData } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

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
      toast.success(t("settings.teams.memberAdded", "Team member added"));
      setShowModal(false);
      setName("");
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["get-members"] });
    },
    onError: () => {
      toast.error(
        t("settings.teams.memberAddError", "Failed to add team member")
      );
    },
  });
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger>
        <div className="flex items-center bg-primary  transition-colors duration-300 px-4 py-2 rounded-lg text-white font-medium shadow-lg">
          <PlusCircle className="mr-2" />
          {t("settings.teams.addTeamMember", "Add a Team Member")}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-6">
            {t("settings.teams.addTeamMemberTitle", "Add Team Member")}
          </DialogTitle>
        </DialogHeader>
        <label>{t("settings.teams.name", "Name")}</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <label>{t("settings.teams.email", "Email")}</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button
          onClick={() => {
            AddTeamMemberMutation.mutate();
          }}
          className="bg-primary text-white"
        >
          {t("settings.teams.add", "Add")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMember;
