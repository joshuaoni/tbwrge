import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface PremiumResponse {
  detail?: string;
  url?: string;
}

export const getPremium = async (
  token: string,
  freetrial: boolean
): Promise<PremiumResponse | string> => {
  const response = await axios({
    method: "GET",
    url: API_CONFIG.GET_PREMIUM(freetrial),
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("premium-response: ", { response });
  return response.data;
};
