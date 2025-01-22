import DashboardSettingsLayout from "@/components/settings/layout";
import CheckBoxInput from "../../../../components/settings/checkbox-input";
import CheckBoxSectionWrapper from "../../../../components/settings/checkbox-section-wrapper";
import SettingsHeader from "../../../../components/settings/header";

const NotificationsSettingsPage = () => {
  return (
    <DashboardSettingsLayout>
      <SettingsHeader>Notification Preferences</SettingsHeader>

      <CheckBoxSectionWrapper title="Email Notification">
        <CheckBoxInput label="Job Updates" />
        <CheckBoxInput label="Job and Community Updates" />
        <CheckBoxInput label="Platform Announcements" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Whatsapp Notification">
        <CheckBoxInput label="Job Updates" />
        <CheckBoxInput label="Job and Community Updates" />
        <CheckBoxInput label="Platform Announcements" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Telegram Notification">
        <CheckBoxInput label="Job Updates" />
        <CheckBoxInput label="Job and Community Updates" />
        <CheckBoxInput label="Platform Announcements" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="InApp Notification">
        <CheckBoxInput label="Response to Candidate Response" />
        <CheckBoxInput label="Status updates for candidates and jobs" />
      </CheckBoxSectionWrapper>
    </DashboardSettingsLayout>
  );
};

export default NotificationsSettingsPage;
