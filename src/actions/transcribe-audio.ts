import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

export const transcribeAudio = async (token: string, audioFile: Blob) => {
  const formData = new FormData();
  formData.append("audio", audioFile);

  const response = await axios({
    method: "POST",
    url: API_CONFIG.TRANSCRIBE_AUDIO,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  console.log({ response });
  return response.data as string;
};
