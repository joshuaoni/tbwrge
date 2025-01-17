"use client";
import axios, { AxiosResponse } from "axios";

import { API_CONFIG } from "@/constants/api_config";

export type IGetJobOpenJobType =
  | "hybrid"
  | "full_time"
  | "part_time"
  | "internship";

export interface IGetJobOpen {
  search_term: string;
  job_type: IGetJobOpenJobType;
  skills: string[];
  location: string;
}

export interface IGetJobOpenRes {
  id: string;
  company_logo?: string;
  job_title: string;
  company_name: string;
  job_location_name: string;
  start_date: string;
  job_type: string;
  required_skills: string;
  languages: string;
  tags: string;
}

export function formatDateAndDifference(date: string) {
  const startDate = new Date(date);
  const currentDate = new Date();

  // Calculate the difference in time
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  // Determine the difference output
  let differenceOutput;
  if (differenceInDays === 1) {
    differenceOutput = "1 day ago";
  } else if (differenceInDays > 1) {
    differenceOutput = `${differenceInDays} days ago`;
  } else if (differenceInDays === -1) {
    differenceOutput = "in 1 day";
  } else if (differenceInDays < -1) {
    differenceOutput = `in ${Math.abs(differenceInDays)} days`;
  } else {
    differenceOutput = "today";
  }

  return differenceOutput;
}

export const getJobOpen = async (data: IGetJobOpen) => {
  try {
    const options = {
      method: "POST",
      url: API_CONFIG.GET_JOB_OPEN, // Replace with your API endpoint
      data,
    };
    const response = await axios<
      any,
      AxiosResponse<IGetJobOpenRes[]>,
      IGetJobOpen
    >(options);
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
