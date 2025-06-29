import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface UpdateApplicationRequest {
  application_ids: string[];
  status: "shortlisted" | "rejected";
}

export interface UpdateApplicationResponse {
  message: string;
  updated_count: number;
}

export const updateApplication = async (
  token: string,
  job_id: string,
  data: UpdateApplicationRequest
): Promise<UpdateApplicationResponse> => {
  console.log({ token });
  const response = await axios({
    method: "PUT",
    url: API_CONFIG.UPDATE_APPLICATION(job_id),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data,
  });
  console.log("update-application: ", { response });
  return response.data;
};
