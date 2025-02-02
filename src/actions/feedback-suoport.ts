"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface FeedbackSupportRequestData {
  type: "feedback" | "support";
  category: string;
  subject: string;
  details: string;
  preferred_contact?: string;
  image?: File | null;
}

export const INITIAL_FEEDBACK_SUPPORT_REQUEST_DATA: FeedbackSupportRequestData =
  {
    type: "feedback",
    category: "",
    subject: "",
    details: "",
  };

export const feedbackSupport = async (
  token: string,
  data: FeedbackSupportRequestData
) => {
  const formData = new FormData();

  formData.append("type", data.type);
  formData.append("category", data.category);
  formData.append("subject", data.subject);
  formData.append("details", data.details);
  if (data.preferred_contact)
    formData.append("preferred_contact", data.preferred_contact);
  if (data.image) formData.append("image", data.image);

  const response = await axios({
    method: "POST",
    url: API_CONFIG.FEEDBACK_SUPPORT,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
  return response.data;
};
