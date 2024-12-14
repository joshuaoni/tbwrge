export const MAIN_URL = "https://api.candivet.com";

export const API_CONFIG = {
  REGISTER_USER: `${MAIN_URL}/auth/user-register/`,
  VERIFY_EMAIL: `${MAIN_URL}/auth/verify-account/`,
  LOGIN_USER: `${MAIN_URL}/auth/login/`,
  LOGIN_USER_GOOGLE: `${MAIN_URL}/auth/google/`,
  FORGOT_PASSWORD: `${MAIN_URL}/auth/request-password-reset/`,
  RESET_PASSWORD: `${MAIN_URL}/auth/confirm-password-reset/`,
  CREATE_JOB: `${MAIN_URL}/job/create-job/`,
  SUMMARIZE_CV: `${MAIN_URL}/cv/summarize-cv/`,
  TRANSLATE_CV: `${MAIN_URL}/cv/translate-cv/`,
  VET_CV: `${MAIN_URL}/cv/vetting-cv/`,
  HEAD_TO_HEAD: `${MAIN_URL}/cv/head-to-head/`,
  GENERATE_CV: `${MAIN_URL}/cv/generate-cv/`,
  RANK_CV: `${MAIN_URL}/cv/rank-cv/`,
  SUMMARIZE_COVER_LETTER: `${MAIN_URL}/cl/summarize-cl/`,
  VET_COVER_LETTER: `${MAIN_URL}/cl/vett-cl/`,
  RANK_COVER_LETTER: `${MAIN_URL}/cl/rank-cl/`,
  GENERATE_COVER_LETTER: `${MAIN_URL}/cl/generate-cl/`,
  REWRITE_COVER_LETTER: `${MAIN_URL}/cl/rewrite-cl/`,
};
