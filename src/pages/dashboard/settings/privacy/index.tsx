import CheckBoxInput from "../checkbox-input";
import CheckBoxSectionWrapper from "../checkbox-section-wrapper";
import SettingsHeader from "../header";
import DashboardSettingsLayout from "../layout";

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
