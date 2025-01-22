import DashboardSettingsLayout from "@/components/settings/layout";
import CheckBoxInput from "../../../../components/settings/checkbox-input";
import CheckBoxSectionWrapper from "../../../../components/settings/checkbox-section-wrapper";
import SettingsHeader from "../../../../components/settings/header";

const PrivacyAndSecuritySettingsPage = () => {
  return (
    <DashboardSettingsLayout>
      <SettingsHeader>Privacy & Security</SettingsHeader>

      <CheckBoxSectionWrapper title="Account Privacy">
        <CheckBoxInput label="Profile Visiblity" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Data Sharing & Preferences">
        <CheckBoxInput label="Share Data With LinkedIn" />
        <CheckBoxInput label="Share Data With indeed" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Data Exports">
        <CheckBoxInput label="Activity History" />
        <CheckBoxInput label="CVs" />
        <CheckBoxInput label="Candidate Reports" />
      </CheckBoxSectionWrapper>

      <CheckBoxSectionWrapper title="Delete Account" titleClass="text-red">
        <CheckBoxInput label="I understand this account would delete all my data" />
      </CheckBoxSectionWrapper>
    </DashboardSettingsLayout>
  );
};

export default PrivacyAndSecuritySettingsPage;
