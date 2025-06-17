import SocialConnection from "@/components/settings/integration/social-connection";
import DashboardSettingsLayout from "@/components/settings/layout";
import { outfit } from "@/constants/app";
import { updateProfile } from "@/actions/update-profile";
import { getProfile } from "@/actions/get-profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/hooks/use-user-store";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const IntegrationSettingsPage = () => {
  const { t } = useTranslation();
  const [calendlyLink, setCalendlyLink] = useState("");
  const [googleCalendarLink, setGoogleCalendarLink] = useState("");
  const { userData } = useUserStore();
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(userData?.token),
    enabled: !!userData?.token,
  });

  // Update form fields when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setCalendlyLink(profileData.calendly_link || "");
      setGoogleCalendarLink(profileData.google_calender_link || "");
    }
  }, [profileData]);

  // Update calendar links mutation
  const UpdateCalendarLinks = useMutation({
    mutationKey: ["update-calendar-links"],
    mutationFn: async () => {
      const response = await updateProfile({
        calendly_link: calendlyLink,
        google_calender_link: googleCalendarLink,
        token: userData?.token,
        phone: undefined,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(
        t(
          "settings.integration.calendarUpdated",
          "Calendar links updated successfully"
        )
      );
      // Invalidate profile query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          t(
            "settings.integration.calendarUpdateError",
            "Failed to update calendar links"
          )
      );
    },
  });

  return (
    <DashboardSettingsLayout>
      {/* <div className={`${outfit.className} space-y-4`}>
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
      </div> */}

      <div className={`${outfit.className} space-y-4 mt-4`}>
        <h4 className="mb-4 font-medium text-sm">
          {t("settings.integration.calendar", "Calendar")}
        </h4>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-startcenter gap-4">
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

          <div className="flex flex-col items-center gap-4">
            <div>
              <input
                type="text"
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
                placeholder={t(
                  "settings.integration.calendlyPlaceholder",
                  "Please paste your Calendly link here."
                )}
                className="w-[500px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>
            <div>
              <input
                type="text"
                value={googleCalendarLink}
                onChange={(e) => setGoogleCalendarLink(e.target.value)}
                placeholder={t(
                  "settings.integration.googleCalendarPlaceholder",
                  "Please paste your Google Calendar link here."
                )}
                className="w-[500px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#6B7280]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center text-sm">
          <button
            onClick={() => UpdateCalendarLinks.mutate()}
            disabled={UpdateCalendarLinks.isPending}
            className="px-4 py-2 bg-primary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {UpdateCalendarLinks.isPending
              ? t("settings.integration.saving", "Saving...")
              : t("settings.integration.save", "Save")}
          </button>
        </div>
      </div>
    </DashboardSettingsLayout>
  );
};

export default IntegrationSettingsPage;
