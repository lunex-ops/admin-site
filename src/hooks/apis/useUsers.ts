"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authenticatedApi } from "@/config/axiosConfig";

import type {
  CreateUserInput,
  UpdateUserMutationVariables,
  UserResponse,
  UsersResponse,
} from "@/types/user.types";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: () => [...userKeys.lists()] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<UsersResponse>("/users");

      return data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery<UserResponse>({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const { data } = await authenticatedApi.get<UserResponse>(`/users/${id}`);

      return data;
    },
    enabled: Boolean(id),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, CreateUserInput>({
    mutationFn: async (payload) => {
      const { data } = await authenticatedApi.post<UserResponse>(
        "/users",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, UpdateUserMutationVariables>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await authenticatedApi.patch<UserResponse>(
        `/users/${id}`,
        payload,
      );

      return data;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(userKeys.detail(variables.id), response);

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await authenticatedApi.delete(`/users/${id}`);
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: userKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};
