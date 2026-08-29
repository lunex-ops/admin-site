"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi, unauthenticatedApi } from "@/config/axiosConfig";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface User {
  id: string;
  username: string;
  email: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  photo?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  passwordConfirm: string;
  token: string;
}

export interface VerifyEmailInput {
  token: string;
}

interface AuthResponse {
  status: "success";
  token: string;
  message?: string;
  data: {
    user: User;
  };
}

interface UserResponse {
  status: "success";
  data: {
    user: User;
  };
}

interface MessageResponse {
  status: "success";
  message: string;
}

/* -------------------------------------------------------------------------- */
/*                                Query Keys                                  */
/* -------------------------------------------------------------------------- */

export const authKeys = {
  currentUser: ["auth", "current-user"] as const,
};

/* -------------------------------------------------------------------------- */
/*                              Current User                                  */
/* -------------------------------------------------------------------------- */

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser,

    queryFn: async (): Promise<UserResponse> => {
      const { data } = await authenticatedApi.get<UserResponse>("/auth/me");

      return data;
    },

    retry: false,
  });
};

/* -------------------------------------------------------------------------- */
/*                                  Sign Up                                   */
/* -------------------------------------------------------------------------- */

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload: SignUpInput): Promise<AuthResponse> => {
      const { data } = await unauthenticatedApi.post<AuthResponse>(
        "/users/signup",
        payload,
      );

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                  Sign In                                   */
/* -------------------------------------------------------------------------- */

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SignInInput): Promise<AuthResponse> => {
      const { data } = await unauthenticatedApi.post<AuthResponse>(
        "/users/signin",
        payload,
      );

      return data;
    },

    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.currentUser, {
        status: "success",
        data: {
          user: response.data.user,
        },
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Forgot Password                               */
/* -------------------------------------------------------------------------- */

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (
      payload: ForgotPasswordInput,
    ): Promise<MessageResponse> => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/forgot-password",
        payload,
      );

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Reset Password                                */
/* -------------------------------------------------------------------------- */

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (
      payload: ResetPasswordInput,
    ): Promise<MessageResponse> => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/reset-password",
        payload,
      );

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                               Verify Email                                 */
/* -------------------------------------------------------------------------- */

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: VerifyEmailInput): Promise<MessageResponse> => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/verify-email",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.currentUser,
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                   Logout                                   */
/* -------------------------------------------------------------------------- */

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<MessageResponse> => {
      const { data } =
        await authenticatedApi.post<MessageResponse>("/auth/logout");

      return data;
    },

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: authKeys.currentUser,
      });
    },
  });
};
