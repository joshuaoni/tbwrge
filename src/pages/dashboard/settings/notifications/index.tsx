import CheckBoxInput from "../checkbox-input";
import CheckBoxSectionWrapper from "../checkbox-section-wrapper";
import SettingsHeader from "../header";
import DashboardSettingsLayout from "../layout";

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
