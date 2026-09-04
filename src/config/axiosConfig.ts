import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { ApiError } from "@/lib/api-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const TOKEN_KEY = "token";

const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
};

const getErrorMessage = (error: AxiosError): string => {
  const data = error.response?.data;

  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  if (typeof data === "string") {
    return data;
  }

  return error.message || "Something went wrong";
};

const createApiClient = (authenticated: boolean): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10_000,
  });

  client.interceptors.request.use(
    (config) => {
      if (authenticated) {
        const token = getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401 && authenticated) {
        removeToken();

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:unauthorized"));
        }
      }

      return Promise.reject(new ApiError(getErrorMessage(error), status ?? 0));
    },
  );

  return client;
};

export const authenticatedApi = createApiClient(true);

export const unauthenticatedApi = createApiClient(false);

export const authGet = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) => authenticatedApi.get<T>(url, config);

export const authPost = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => authenticatedApi.post<T>(url, data, config);

export const authPut = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => authenticatedApi.put<T>(url, data, config);

export const authPatch = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => authenticatedApi.patch<T>(url, data, config);

export const authDelete = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) => authenticatedApi.delete<T>(url, config);

export const publicGet = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.get<T>(url, config);

export const publicPost = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.post<T>(url, data, config);
