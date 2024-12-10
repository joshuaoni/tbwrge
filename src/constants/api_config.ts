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
};
