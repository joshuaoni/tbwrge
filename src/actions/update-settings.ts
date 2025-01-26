"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface UpdateProfilePayload {
  email_job_updates?: boolean;
  email_community_updates?: boolean;
  email_announcements?: boolean;
  whatsapp_job_updates?: boolean;
  whatsapp_community_updates?: boolean;
  whatsapp_announcements?: boolean;
  telegram_job_updates?: boolean;
  telegram_community_updates?: boolean;
  telegram_announcements?: boolean;
  in_app_candidate_app_response?: boolean;
  in_app_jobs_and_candidates?: boolean;
  visibile_profile?: boolean;
  linkedin_data_share?: boolean;
  indeed_data_share?: boolean;
  export_activity_history?: boolean;
  export_cv?: boolean;
  export_candidate_reports?: boolean;
  token?: string | null | undefined;
}

export const updateSettings = async (payload: UpdateProfilePayload) => {
  const {
    email_job_updates,
    email_community_updates,
    email_announcements,
    whatsapp_job_updates,
    whatsapp_community_updates,
    whatsapp_announcements,
    telegram_job_updates,
    telegram_community_updates,
    telegram_announcements,
    in_app_candidate_app_response,
    in_app_jobs_and_candidates,
    visibile_profile,
    linkedin_data_share,
    indeed_data_share,
    export_activity_history,
    export_cv,
    export_candidate_reports,
    token,
  } = payload;

  // Only append fields that are defined

  try {
    const options = {
      method: "PUT",
      url: API_CONFIG.UPDATE_SETTINGS, // Replace with your API endpoint
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email_job_updates,
        email_community_updates,
        email_announcements,
        whatsapp_job_updates,
        whatsapp_community_updates,
        whatsapp_announcements,
        telegram_job_updates,
        telegram_community_updates,
        telegram_announcements,
        in_app_candidate_app_response,
        in_app_jobs_and_candidates,
        visibile_profile,
        linkedin_data_share,
        indeed_data_share,
        export_activity_history,
        export_cv,
        export_candidate_reports,
      }),
    };

    const response = await axios(options);
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle and throw meaningful errors
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
