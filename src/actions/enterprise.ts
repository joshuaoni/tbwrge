import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface EnterpriseRequestPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  details: string;
}

export interface EnterpriseRequestResponse {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  details: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export const submitEnterpriseRequest = async (
  token: string,
  payload: EnterpriseRequestPayload
): Promise<EnterpriseRequestResponse> => {
  const response = await axios({
    method: "POST",
    url: API_CONFIG.REQUEST_ENTERPRISE,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  console.log("enterprise-request: ", { response });
  return response.data as EnterpriseRequestResponse;
};

export const getEnterpriseRequests = async (
  token: string,
  query?: { page?: number; limit?: number; status?: string; text?: string }
) => {
  const queryParams = query ? new URLSearchParams() : null;

  if (query) {
    if (query.page !== undefined)
      queryParams!.append("page", query.page.toString());
    if (query.limit !== undefined)
      queryParams!.append("limit", query.limit.toString());
    if (query.status) queryParams!.append("status", query.status);
    if (query.text) queryParams!.append("text", query.text);
  }

  const url = queryParams
    ? `${API_CONFIG.GET_ENTERPRISE_REQUESTS}?${queryParams.toString()}`
    : API_CONFIG.GET_ENTERPRISE_REQUESTS;

  const response = await axios({
    method: "GET",
    url,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("enterprise-requests: ", { response });
  console.log("enterprise-requests data: ", response.data);
  return response.data as EnterpriseRequestResponse[];
};

export const updateEnterpriseRequest = async (
  token: string,
  requestId: string,
  payload: Partial<EnterpriseRequestPayload & { status: string }>
): Promise<EnterpriseRequestResponse> => {
  const response = await axios({
    method: "PUT",
    url: `${API_CONFIG.REQUEST_ENTERPRISE}${requestId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: payload,
  });
  console.log("update-enterprise-request: ", { response });
  return response.data as EnterpriseRequestResponse;
};

export const deleteEnterpriseRequest = async (
  token: string,
  requestId: string
): Promise<void> => {
  const response = await axios({
    method: "DELETE",
    url: `${API_CONFIG.REQUEST_ENTERPRISE}${requestId}/`,
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("delete-enterprise-request: ", { response });
  return response.data;
};
