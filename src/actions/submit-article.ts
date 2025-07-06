"use client";

import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface SubmitAnArticleRequestData {
  name: string;
  email: string;
  job_title?: string;
  company?: string;
  profile_image: File | null;
  image: File | null;
  title: string;
  content: string;
  article_upload?: File | null;
  voicenote?: Blob;
}

export const INITIAL_SUBMIT_ARTICLE_REQUEST_DATA: SubmitAnArticleRequestData = {
  name: "",
  email: "",
  profile_image: null,
  image: null,
  title: "",
  content: "",
};

export const submitArticle = async (
  token: string,
  data: SubmitAnArticleRequestData
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("title", data.title);
  formData.append("content", data.content);
  if (data.profile_image) formData.append("profile_image", data.profile_image);
  if (data.image) formData.append("image", data.image);

  if (data.job_title) formData.append("job_title", data.job_title);

  if (data.company) formData.append("company", data.company);

  if (data.article_upload)
    formData.append("article_upload", data.article_upload);

  // if (data.voicenote) formData.append("voicenote", data.voicenote);

  const response = await axios({
    method: "POST",
    url: API_CONFIG.SUBMIT_ARTICLE,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
  console.log({ response });
  return response.data;
};
