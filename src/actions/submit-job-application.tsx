"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const submitJobApplication = async ({
  job_id,
  email,
  name,
  phone,
  nationality,
  country_of_residence,
  experience,
  skills,
  cv,
  cover_letter,
  voicenote,
  answers,
  token,
}: any) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("nationality", nationality);
  formData.append("country_of_residence", country_of_residence);
  formData.append("experience", experience);
  formData.append("skills", skills);
  formData.append("cv", cv);
  formData.append("cover_letter", cover_letter);
  formData.append("voicenote", voicenote);
  formData.append("answers", answers);

  try {
    const options = {
      method: "POST",
      url: API_CONFIG.SUBMIT_JOB_APPLICATION + job_id, // Replace with your API endpoint
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        name,
        email,
        phone,
        nationality,
        country_of_residence,
        experience,
        skills,
        cv,
        cover_letter,
        voicenote,
        answers,
      }),
    };
    const response = await axios(options);
    return response.data; // Return only the response data for convenience
  } catch (error: any) {
    // Handle errors and return meaningful information
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // Request was made, but no response received
      console.error("Error Request:", error.request);
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else caused an error
      console.error("Error Message:", error.message);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
