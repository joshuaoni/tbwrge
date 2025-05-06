"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface UpdateProfilePayload {
  profile_pic?: string | File | undefined; // Allow File type for profile picture
  name?: string;
  last_name?: string; // Fixed type from `any` to `string`
  country_code?: string;
  old_password?: string;
  new_password?: string;
  active_team_id?: string;
  calendly_link?: string;
  google_calendar_link?: string;
  location?: string;
  username?: string;
  email?: string;
  token: string | null | undefined; // Required to authenticate the API request
  phone: string | undefined;
}

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const {
    profile_pic,
    name,
    last_name,
    country_code,
    old_password,
    new_password,
    active_team_id,
    calendly_link,
    google_calendar_link,
    location,
    username,
    email,
    phone,
    token,
  } = payload;

  const form = new FormData();

  // Only append fields that are defined
  if (profile_pic) form.append("profile_pic", profile_pic);
  if (name) form.append("name", name);
  if (last_name) form.append("last_name", last_name);
  if (country_code) form.append("country_code", country_code);
  if (old_password) form.append("old_password", old_password);
  if (new_password) form.append("new_password", new_password);
  if (active_team_id) form.append("active_team_id", active_team_id);
  if (calendly_link) form.append("calendly_link", calendly_link);
  if (google_calendar_link)
    form.append("google_calendar_link", google_calendar_link);
  if (location) form.append("location", location);
  if (username) form.append("username", username);
  if (email) form.append("email", email);
  if (phone) form.append("phone", phone);

  try {
    const options = {
      method: "PUT",
      url: API_CONFIG.UPDATE_PROFILE,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: form,
    };

    // Log all form data
    console.log("=== Form Data ===");
    console.log("Profile Picture:", form.get("profile_pic"));
    console.log("Name:", form.get("name"));
    console.log("Last Name:", form.get("last_name"));
    console.log("Country Code:", form.get("country_code"));
    console.log("Old Password:", form.get("old_password"));
    console.log("New Password:", form.get("new_password"));
    console.log("Active Team ID:", form.get("active_team_id"));
    console.log("Calendly Link:", form.get("calendly_link"));
    console.log("Google Calendar Link:", form.get("google_calendar_link"));
    console.log("Location:", form.get("location"));
    console.log("Username:", form.get("username"));
    console.log("Email:", form.get("email"));
    console.log("Phone:", form.get("phone"));
    console.log("=================");

    const response = await axios(options);
    console.log("settings profile response", { response });
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle and throw meaningful errors
    if (error.response) {
      console.error("Error Response:", error.response.data);

      // Handle structured validation errors
      if (Array.isArray(error.response.data.detail)) {
        throw new Error(
          error.response.data.detail[0].msg || "Server error occurred"
        );
      }

      // Handle regular string error messages
      throw new Error(error.response.data.detail || "Server error occurred");
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
