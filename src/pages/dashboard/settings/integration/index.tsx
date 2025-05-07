import SocialConnection from "@/components/settings/integration/social-connection";
import DashboardSettingsLayout from "@/components/settings/layout";
import { outfit } from "@/constants/app";

const IntegrationSettingsPage = () => {
  return (
    <DashboardSettingsLayout>
      <div className={`${outfit.className} space-y-4`}>
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

      <div className={`${outfit.className} space-y-4 mt-8`}>
        <h4 className="mb-6 font-medium text-lg">Connect Calendar</h4>

        <SocialConnection
          logo="/images/calendly.png"
          name="Calendly"
          isConnected={false}
        />
        <div>
          <input
            type="text"
            name="currentPosition"
            value={""}
            onChange={() => {}}
            placeholder="Please paste your Calendly link here."
            className="w-[500px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>
        <SocialConnection
          logo="/images/google-calender.png"
          name="Google Calendar"
          isConnected
        />
        <div>
          <input
            type="text"
            name="currentPosition"
            value={""}
            onChange={() => {}}
            placeholder="Please paste your Google Calendar link here."
            className="w-[500px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
          />
        </div>
      </div>
    </DashboardSettingsLayout>
  );
};

export default IntegrationSettingsPage;
