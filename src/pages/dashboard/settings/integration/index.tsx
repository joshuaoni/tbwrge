import DashboardSettingsLayout from "../layout";
import SocialConnection from "./social-connection";

const IntegrationSettingsPage = () => {
  return (
    <DashboardSettingsLayout>
      <div className="space-y-4">
        <SocialConnection
          logo="/images/linkedin.png"
          name="Linkedin"
          isConnected
        />
        <SocialConnection
          logo="/images/indeed.png"
          name="Indeed"
          isConnected={false}
        />
        <SocialConnection
          logo="/images/glassdoor.png"
          name="Glassdoor"
          isConnected
        />
      </div>

      <div className="space-y-4 mt-8">
        <h4 className="mb-6 font-medium text-lg">Connect Calendar</h4>

        <SocialConnection
          logo="/images/calendly.png"
          name="Calendly"
          isConnected={false}
        />
        <SocialConnection
          logo="/images/google-calender.png"
          name="Google Calendar"
          isConnected
        />
      </div>
    </DashboardSettingsLayout>
  );
};

export default IntegrationSettingsPage;
