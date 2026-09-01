"use client";

import { authenticatedApi } from "@/config/axiosConfig";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export const RoleType = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER: "USER",
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

/* -------------------------------------------------------------------------- */
/*                                  User Type                                 */
/* -------------------------------------------------------------------------- */

export interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  photo: string | null;
  isActive: boolean;
  role: RoleType;
  passwordChangedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                              Create User                                   */
/* -------------------------------------------------------------------------- */

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: RoleType;
}

/* -------------------------------------------------------------------------- */
/*                              Update User                                   */
/* -------------------------------------------------------------------------- */

export interface UpdateUserInput {
  username?: string;
  email?: string;
  role?: RoleType;
  isActive?: boolean;
  photo?: string | null;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

export interface UsersResponse {
  status: "success";
  results: number;
  data: {
    users: User[];
  };
}

export interface UserResponse {
  status: "success";
  data: {
    user: User;
  };
}

/* -------------------------------------------------------------------------- */
/*                                Get Users                                   */
/* -------------------------------------------------------------------------- */

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await authenticatedApi.get<UsersResponse>("/users");

      return data;
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Get User By ID                                */
/* -------------------------------------------------------------------------- */

export const useUser = (id: string) => {
  return useQuery<UserResponse>({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await authenticatedApi.get<UserResponse>(`/users/${id}`);

      return data;
    },
    enabled: Boolean(id),
  });
};

/* -------------------------------------------------------------------------- */
/*                              Create User                                   */
/* -------------------------------------------------------------------------- */

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserInput): Promise<UserResponse> => {
      const { data } = await authenticatedApi.post<UserResponse>(
        "/users",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Update User                                   */
/* -------------------------------------------------------------------------- */

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserInput;
    }): Promise<UserResponse> => {
      const { data } = await authenticatedApi.patch<UserResponse>(
        `/users/${id}`,
        payload,
      );

      return data;
    },

    onSuccess: (response, variables) => {
      queryClient.setQueryData(["users", variables.id], response);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                              Delete User                                   */
/* -------------------------------------------------------------------------- */

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await authenticatedApi.delete(`/users/${id}`);
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["users", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
