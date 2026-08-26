import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/**
 * Get the authentication token.
 *
 * Keep token storage in one place so it can later be
 * replaced with cookies, a Zustand store, etc.
 */
const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

/**
 * Remove the authentication token.
 */
const removeToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
};

/**
 * Create an Axios instance.
 */
const createApiClient = (authenticated: boolean): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10_000,
  });

  /**
   * Request interceptor
   */
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
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  /**
   * Response interceptor
   */
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 401:
            if (authenticated) {
              removeToken();

              /**
               * Do not redirect here.
               *
               * Axios should only handle the HTTP/authentication
               * concern. Let your auth provider/store or
               * Next.js router handle navigation.
               */
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("auth:unauthorized"));
              }
            }
            break;

          case 403:
            console.error("Forbidden");
            break;

          case 404:
            console.error("Resource not found");
            break;

          case 500:
            console.error("Internal server error");
            break;
        }
      } else if (error.request) {
        console.error("No response received from server");
      }

      return Promise.reject(error);
    },
  );

  return client;
};

/**
 * Authenticated API
 *
 * Automatically sends:
 *
 * Authorization: Bearer <token>
 */
export const authenticatedApi = createApiClient(true);

/**
 * Unauthenticated/Public API
 *
 * Does not send an Authorization header.
 */
export const unauthenticatedApi = createApiClient(false);

/**
 * Convenient HTTP methods
 *
 * These wrappers return AxiosResponse<T>.
 */
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

/**
 * Public HTTP methods
 *
 * These requests do NOT require a token.
 */
export const publicGet = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.get<T>(url, config);

export const publicPost = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.post<T>(url, data, config);

export const publicPut = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.put<T>(url, data, config);

export const publicPatch = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.patch<T>(url, data, config);

export const publicDelete = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
) => unauthenticatedApi.delete<T>(url, config);
