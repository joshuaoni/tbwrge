import { API_CONFIG } from "@/constants/api_config";
import axios from "axios";

interface QuestionAnswer {
  question_id: string;
  text: string;
}

export const submitQuestionAnswers = async (
  token: string,
  applicationId: string,
  answers: QuestionAnswer[]
) => {
  const url = `https://api.candivet.com/job/submit-application-answers/${applicationId}/`;
  console.log({ answers, url });
  const response = await axios({
    method: "POST",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: answers,
  });
  console.log({ response });
  return response.data;
};
