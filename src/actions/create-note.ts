import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface CreateNoteResponse {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  text: string;
}

export const createNote = async (
  token: string,
  candidateId: string,
  text: string
): Promise<CreateNoteResponse> => {
  try {
    const response = await axios({
      method: "POST",
      url: API_CONFIG.CREATE_NOTE(candidateId),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        text,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};
