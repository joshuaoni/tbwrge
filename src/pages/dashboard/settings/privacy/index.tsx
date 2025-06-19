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
import { useTranslation } from "react-i18next";

const PrivacyAndSecuritySettingsPage = () => {
  const { t } = useTranslation();
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
      toast.success(
        t(
          "settings.privacy.privacyUpdated",
          "Privacy settings updated successfully"
        )
      );
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      if (!userData?.token) throw new Error("No token available");
      return await deleteAccount(userData.token);
    },
    onSuccess: () => {
      toast.success(
        t("settings.privacy.accountDeleted", "Account deleted successfully")
      );
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          t("settings.privacy.deleteAccountError", "Failed to delete account")
      );
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
      <SettingsHeader>
        {t("settings.privacy.title", "Privacy & Security")}
      </SettingsHeader>

      <CheckBoxSectionWrapper
        title={t("settings.privacy.accountPrivacy", "Account Privacy")}
      >
        <CheckBoxInput
          label={t("settings.privacy.profileVisibility", "Profile Visibility")}
          value={visibleProfile}
          onChange={(value) => {
            setVisibleProfile(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper
        title={t(
          "settings.privacy.dataSharingPreferences",
          "Data Sharing & Preferences"
        )}
      >
        <CheckBoxInput
          label={t("settings.privacy.shareDataLinkedIn")}
          value={linkedinDataShare}
          onChange={(value) => {
            setLinkedinDataShare(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label={t(
            "settings.privacy.shareDataIndeed",
            "Share Data With Indeed"
          )}
          value={indeedDataShare}
          onChange={(value) => {
            setIndeedDataShare(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper
        title={t("settings.privacy.dataExports", "Data Exports")}
      >
        <CheckBoxInput
          label={t("settings.privacy.activityHistory", "Activity History")}
          value={exportActivityHistory}
          onChange={(value) => {
            setExportActivityHistory(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label={t("settings.privacy.cvs", "CVs")}
          value={exportCV}
          onChange={(value) => {
            setExportCV(value);
            updateSettingsMutation.mutate();
          }}
        />
        <CheckBoxInput
          label={t("settings.privacy.candidateReports", "Candidate Reports")}
          value={exportCandidateReports}
          onChange={(value) => {
            setExportCandidateReports(value);
            updateSettingsMutation.mutate();
          }}
        />
      </CheckBoxSectionWrapper>

      <button
        onClick={() => setShowDeleteConfirmation(true)}
        className="mt-4 px-4 py-2 text-white bg-red hover:bg-red/80 rounded-lg transition-colors text-sm font-medium"
      >
        {t("settings.privacy.deleteAccount", "Delete Account")}
      </button>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent className="bg-white text-[#333] shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle>
              {t("settings.privacy.deleteAccount", "Delete Account")}
            </DialogTitle>
            <DialogDescription>
              {t(
                "settings.privacy.deleteAccountMessage",
                "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white text-[#2563EB] border border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              {t("settings.privacy.cancel", "Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteAccountMutation.mutate()}
              disabled={deleteAccountMutation.isPending}
            >
              {deleteAccountMutation.isPending
                ? t("settings.privacy.deleting", "Deleting...")
                : t("settings.privacy.deleteAccount", "Delete Account")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardSettingsLayout>
  );
};

export default PrivacyAndSecuritySettingsPage;
