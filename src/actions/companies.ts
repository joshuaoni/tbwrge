import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface Company {
  id: string;
  reference: string;
  created_at: string;
  updated_at: string;
  website: string;
  name: string;
  description: string;
  logo: string;
}

export const getPublicCompanies = async (
  token: string,
  recruiter_id: string
): Promise<Company[]> => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_PUBLIC_COMPANIES(recruiter_id),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("public-companies: ", { response });
  return response.data;
};
