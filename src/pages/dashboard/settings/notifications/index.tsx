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
import { useTranslation } from "react-i18next";

const NotificationsSettingsPage = () => {
  const { t } = useTranslation();
  const [jobUpdates, setJobUpdates] = useState(false);
  const [jobCommunityUpdates, setJobCommunityUpdates] = useState(false);
  const [platformAnnouncements, setPlatformAnnouncements] = useState(false);
  const [whatsappJobUpdates, setWhatsappJobUpdates] = useState(false);
  const [whatsappJobCommunityUpdates, setWhatsappJobCommunityUpdates] =
    useState(false);
  const [whatsappPlatformAnnouncements, setWhatsappPlatformAnnouncements] =
    useState(false);
  const [telegramJobUpdates, setTelegramJobUpdates] = useState(false);
  const [telegramJobCommunityUpdates, setTelegramJobCommunityUpdates] =
    useState(false);
  const [telegramPlatformAnnouncements, setTelegramPlatformAnnouncements] =
    useState(false);
  const [responseToCandidateResponse, setResponseToCandidateResponse] =
    useState(false);
  const [statusUpdates, setStatusUpdates] = useState(false);
  const { userData } = useUserStore();
  const UpdateSettings = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async () => {
      const response = await updateSettings({
        email_job_updates: jobUpdates,
        email_community_updates: jobCommunityUpdates,
        email_announcements: platformAnnouncements,
        whatsapp_job_updates: whatsappJobUpdates,
        whatsapp_community_updates: whatsappJobCommunityUpdates,
        whatsapp_announcements: whatsappPlatformAnnouncements,
        telegram_job_updates: telegramJobUpdates,
        telegram_community_updates: telegramJobCommunityUpdates,
        telegram_announcements: telegramPlatformAnnouncements,
        in_app_candidate_app_response: responseToCandidateResponse,
        in_app_jobs_and_candidates: statusUpdates,
        token: userData?.token,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(
        t(
          "settings.notifications.notificationUpdated",
          "Notification Updated Successfully"
        )
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
      setJobUpdates(data.email_job_updates);
      setJobCommunityUpdates(data.email_community_updates);
      setPlatformAnnouncements(data.email_announcements);
      setWhatsappJobUpdates(data.whatsapp_job_updates);
      setWhatsappJobCommunityUpdates(data.whatsapp_community_updates);
      setWhatsappPlatformAnnouncements(data.whatsapp_announcements);
      setTelegramJobUpdates(data.telegram_job_updates);
      setTelegramJobCommunityUpdates(data.telegram_community_updates);
      setTelegramPlatformAnnouncements(data.telegram_announcements);
      setResponseToCandidateResponse(data.in_app_candidate_app_response);
      setStatusUpdates(data.in_app_jobs_and_candidates);
    }
  }, [data]);

  return (
    <DashboardSettingsLayout>
      <SettingsHeader>
        {t("settings.notifications.title", "Notification Preferences")}
      </SettingsHeader>

      <CheckBoxSectionWrapper
        title={t(
          "settings.notifications.emailNotification",
          "Email Notification"
        )}
      >
        <CheckBoxInput
          value={jobUpdates}
          onChange={(value) => {
            setJobUpdates(value), UpdateSettings.mutate();
          }}
          label={t("settings.notifications.jobUpdates", "Job Updates")}
        />
        <CheckBoxInput
          value={jobCommunityUpdates}
          onChange={(val) => {
            setJobCommunityUpdates(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.jobCommunityUpdates",
            "Job and Community Updates"
          )}
        />
        <CheckBoxInput
          value={platformAnnouncements}
          onChange={(val) => {
            setPlatformAnnouncements(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.platformAnnouncements",
            "Platform Announcements"
          )}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper
        title={t(
          "settings.notifications.whatsappNotification",
          "Whatsapp Notification"
        )}
      >
        <CheckBoxInput
          value={whatsappJobUpdates}
          onChange={(val) => {
            setWhatsappJobUpdates(val), UpdateSettings.mutate();
          }}
          label={t("settings.notifications.jobUpdates", "Job Updates")}
        />
        <CheckBoxInput
          value={whatsappJobCommunityUpdates}
          onChange={(val) => {
            setWhatsappJobCommunityUpdates(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.jobCommunityUpdates",
            "Job and Community Updates"
          )}
        />
        <CheckBoxInput
          value={whatsappPlatformAnnouncements}
          onChange={(val) => {
            setWhatsappPlatformAnnouncements(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.platformAnnouncements",
            "Platform Announcements"
          )}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper
        title={t(
          "settings.notifications.telegramNotification",
          "Telegram Notification"
        )}
      >
        <CheckBoxInput
          value={telegramJobUpdates}
          onChange={(val) => {
            setTelegramJobUpdates(val), UpdateSettings.mutate();
          }}
          label={t("settings.notifications.jobUpdates", "Job Updates")}
        />
        <CheckBoxInput
          value={telegramJobCommunityUpdates}
          onChange={(val) => {
            setTelegramJobCommunityUpdates(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.jobCommunityUpdates",
            "Job and Community Updates"
          )}
        />
        <CheckBoxInput
          value={telegramPlatformAnnouncements}
          onChange={(val) => {
            setTelegramPlatformAnnouncements(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.platformAnnouncements",
            "Platform Announcements"
          )}
        />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper
        title={t(
          "settings.notifications.inAppNotification",
          "InApp Notification"
        )}
      >
        <CheckBoxInput
          value={responseToCandidateResponse}
          onChange={(val) => {
            setResponseToCandidateResponse(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.responseToCandidateResponse",
            "Response to Candidate Response"
          )}
        />
        <CheckBoxInput
          value={statusUpdates}
          onChange={(val) => {
            setStatusUpdates(val), UpdateSettings.mutate();
          }}
          label={t(
            "settings.notifications.statusUpdates",
            "Status updates for candidates and jobs"
          )}
        />
      </CheckBoxSectionWrapper>
    </DashboardSettingsLayout>
  );
};

export default NotificationsSettingsPage;
