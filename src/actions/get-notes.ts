import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export interface Note {
  id: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  text: string;
}

export const getNotes = async (
  token: string,
  candidateId: string
): Promise<Note[]> => {
  try {
    const response = await axios({
      method: "GET",
      url: API_CONFIG.GET_NOTES(candidateId),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("notes", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
