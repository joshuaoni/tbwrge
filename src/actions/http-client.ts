import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import { MAIN_URL } from "@/constants/api_config";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";
import { CookieStorage } from "@/lib/storage";

export class Client {
  private axiosClient: AxiosInstance;
  private readonly cookieStorage = new CookieStorage();

  constructor() {
    this.axiosClient = this.createAxiosClient();
  }

  private createAxiosClient() {
    const apiClient = axios.create({
      baseURL: MAIN_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.cookieStorage.getItem(ACCESS_TOKEN_KEY)}`,
      },
    });

    // if reponse status is 401, sredirect to login page
    apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<Error>) => {
        if (error.config && error?.response?.status === 401) {
          this.redirectToLogin();
        }

        return Promise.reject(error);
      }
    );

    return apiClient;
  }

  private async redirectToLogin() {
    window.location.href = "/home/sign-in";
    this.cookieStorage.deleteItem(ACCESS_TOKEN_KEY);
  }

  create(config: AxiosRequestConfig) {
    return this.axiosClient(config);
  }
}
