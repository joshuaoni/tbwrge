import { API_CONFIG } from "@/constants/api_config";

interface CreateScreeningQuestionsRequest {
  job_title: string;
  job_description: string;
  required_skills: string;
  educational_requirements: string;
}

// Response is an array of screening question strings
export type ScreeningQuestionsResponse = string[];

export const createScreeningQuestions = async (
  token: string | undefined,
  data: CreateScreeningQuestionsRequest
): Promise<ScreeningQuestionsResponse> => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const response = await fetch(API_CONFIG.CREATE_SCREENING_QUESTIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to create screening questions"
      );
    }

    const result = await response.json();
    console.log("screening", { result });
    return result as ScreeningQuestionsResponse;
  } catch (error) {
    console.error("Error creating screening questions:", error);
    throw error;
  }
};
