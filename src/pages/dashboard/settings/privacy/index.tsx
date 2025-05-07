import DashboardSettingsLayout from "@/components/settings/layout";
import CheckBoxInput from "../../../../components/settings/checkbox-input";
import CheckBoxSectionWrapper from "../../../../components/settings/checkbox-section-wrapper";
import SettingsHeader from "../../../../components/settings/header";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateSettings } from "@/actions/update-settings";
import { useUserStore } from "@/hooks/use-user-store";
import toast from "react-hot-toast";
import { getProfileSettings } from "@/actions/get-profile-settings";
import { deleteAccount } from "@/actions/delete-account";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const PrivacyAndSecuritySettingsPage = () => {
  const [visibleProfile, setVisibleProfile] = useState(false);
  const [linkedinDataShare, setLinkedinDataShare] = useState(false);
  const [indeedDataShare, setIndeedDataShare] = useState(false);
  const [exportActivityHistory, setExportActivityHistory] = useState(false);
  const [exportCV, setExportCV] = useState(false);
  const [exportCandidateReports, setExportCandidateReports] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { userData } = useUserStore();
  const router = useRouter();

  const updateSettingsMutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async () => {
      const response = await updateSettings({
        visibile_profile: visibleProfile,
        linkedin_data_share: linkedinDataShare,
        indeed_data_share: indeedDataShare,
        export_activity_history: exportActivityHistory,
        export_cv: exportCV,
        export_candidate_reports: exportCandidateReports,
        token: userData?.token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Privacy settings updated successfully");
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token || !userData?.user?.id)
        throw new Error("No token or user ID available");
      return await deleteAccount(userData.token, userData.user.id);
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      // Clear any local storage or state
      localStorage.clear();
      // Redirect to home page
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete account");
    },
  });

  const { data } = useQuery({
    queryKey: ["get-settings"],
    queryFn: async () => {
      const response = await getProfileSettings({ token: userData?.token });
      return response;
    },
  });

  useEffect(() => {
    if (data) {
      setVisibleProfile(data.visibile_profile);
      setLinkedinDataShare(data.linkedin_data_share);
      setIndeedDataShare(data.indeed_data_share);
      setExportActivityHistory(data.export_activity_history);
      setExportCV(data.export_cv);
      setExportCandidateReports(data.export_candidate_reports);
    }
  }, [data]);

  return (
    <DashboardSettingsLayout>
      <SettingsHeader>Privacy & Security</SettingsHeader>

      <CheckBoxSectionWrapper title="Account Privacy">
        <CheckBoxInput
          label="Profile Visibility"
          value={visibleProfile}
          onChange={(value) => {
            setVisibleProfile(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Data Sharing & Preferences">
        <CheckBoxInput
          label="Share Data With LinkedIn"
          value={linkedinDataShare}
          onChange={(value) => {
            setLinkedinDataShare(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label="Share Data With Indeed"
          value={indeedDataShare}
          onChange={(value) => {
            setIndeedDataShare(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Data Exports">
        <CheckBoxInput
          label="Activity History"
          value={exportActivityHistory}
          onChange={(value) => {
            setExportActivityHistory(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label="CVs"
          value={exportCV}
          onChange={(value) => {
            setExportCV(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label="Candidate Reports"
          value={exportCandidateReports}
          onChange={(value) => {
            setExportCandidateReports(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Delete Account" titleClass="text-red">
        <CheckBoxInput
          label="I understand this account would delete all my data"
          onChange={() => setShowDeleteConfirmation(true)}
        />
      </CheckBoxSectionWrapper>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteAccountMutation.mutate()}
              disabled={deleteAccountMutation.isPending}
            >
              {deleteAccountMutation.isPending
                ? "Deleting..."
                : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardSettingsLayout>
  );
};

export default PrivacyAndSecuritySettingsPage;
