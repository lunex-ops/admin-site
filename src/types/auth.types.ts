import type { BaseUser } from "./user.types";

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
}

export interface ResetPasswordParams {
  token: string;
}

export interface AuthResponse {
  status: "success";
  token: string;
  message?: string;
  data: {
    user: BaseUser;
  };
}

export interface CurrentUserResponse {
  status: "success";
  data: {
    user: BaseUser;
  };
}

export interface MessageResponse {
  status: "success";
  message: string;
}
