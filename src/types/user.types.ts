export const RoleType = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  USER: "USER",
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

export interface BaseUser {
  id: string;
  username: string;
  email: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseUser {
  name: string | null;
  isActive: boolean;
  role: RoleType;
  passwordChangedAt: string | null;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: RoleType;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  role?: RoleType;
  isActive?: boolean;
  photo?: string | null;
}

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

export interface UpdateUserMutationVariables {
  id: string;
  payload: UpdateUserInput;
}
