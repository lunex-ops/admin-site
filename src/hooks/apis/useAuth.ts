"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi, unauthenticatedApi } from "@/config/axiosConfig";

import type {
  AuthResponse,
  CurrentUserResponse,
  ForgotPasswordInput,
  MessageResponse,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
  VerifyEmailInput,
} from "@/types/auth.types";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};

export const useCurrentUser = () => {
  return useQuery<CurrentUserResponse>({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const { data } =
        await authenticatedApi.get<CurrentUserResponse>("/auth/me");

      return data;
    },

    retry: false,
  });
};

export const useSignUp = () => {
  return useMutation<AuthResponse, Error, SignUpInput>({
    mutationFn: async (payload) => {
      const { data } = await unauthenticatedApi.post<AuthResponse>(
        "/users/signup",
        payload,
      );

      return data;
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignInInput>({
    mutationFn: async (payload) => {
      const { data } = await unauthenticatedApi.post<AuthResponse>(
        "/users/signin",
        payload,
      );

      return data;
    },

    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.currentUser(), {
        status: "success",
        data: {
          user: response.data.user,
        },
      });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<MessageResponse, Error, ForgotPasswordInput>({
    mutationFn: async (payload) => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/forgot-password",
        payload,
      );

      return data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation<MessageResponse, Error, ResetPasswordInput>({
    mutationFn: async (payload) => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/reset-password",
        payload,
      );

      return data;
    },
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, VerifyEmailInput>({
    mutationFn: async (payload) => {
      const { data } = await unauthenticatedApi.post<MessageResponse>(
        "/auth/verify-email",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.currentUser(),
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, void>({
    mutationFn: async () => {
      const { data } =
        await authenticatedApi.post<MessageResponse>("/auth/logout");

      return data;
    },

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: authKeys.currentUser(),
      });
    },
  });
};
