"use client";
import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const generateJob = async (
  audioBlob: any,
  token: any,
  prompts: any,
  language: string
) => {
  const formData = new FormData();

  if (audioBlob) {
    console.log("audioblob", audioBlob);
    console.log("prompts", prompts);

    // Create a proper file object with explicit MIME type
    const fileName = `job_audio_${new Date()
      .toISOString()
      .replace(/:/g, "-")}.wav`;

    // Check if audioBlob is already a File object
    let audioFile;
    if (audioBlob instanceof File) {
      // If it's already a File, make sure it has the right extension and MIME type
      const newType = audioBlob.type || "audio/wav";
      audioFile = new File([audioBlob], fileName, { type: newType });
    } else {
      // If it's a Blob, convert it to a File with the proper MIME type
      audioFile = new File([audioBlob], fileName, { type: "audio/wav" });
    }

    formData.append("file", audioFile);

    // Automatically save the audio file
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  console.log("language");
  formData.append("language", language);
  if (prompts && prompts.length !== 0) {
    let stringifiedPrompts = prompts.map((tag: any) => JSON.stringify(tag));
    stringifiedPrompts.forEach((tag: any) => {
      console.log("tag", tag);
      formData.append("text", tag);
    });
  } else {
    formData.append("text", "");
  }

  try {
    // Remove the Content-Type header to let axios set it correctly with the boundary
    const response = await axios({
      method: "POST",
      url: API_CONFIG.GENERATE_JOB_NEW,
      headers: {
        Authorization: `Bearer ${token}`,
        // Removing the explicit Content-Type so axios can set it with the boundary
      },
      data: formData,
    });
    console.log({ response });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server error:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
