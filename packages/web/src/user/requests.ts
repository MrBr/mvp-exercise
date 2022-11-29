import { DataResponse, createRequest, StatusResponse } from "../app";
import { User } from "./types";

export const register = createRequest<
  Pick<User, "username" | "password" | "role">,
  DataResponse<User>
>("/user", "POST");

export const updateUser = (id: number, updates: Pick<User, "username">) =>
  createRequest<Pick<User, "username">, StatusResponse>(
    `/user/${id}`,
    "PUT"
  )(updates);

export const login = createRequest<
  Pick<User, "username" | "password">,
  DataResponse<{ token: string; hasActiveUsers: boolean }>
>("/authorise", "POST");

export const logoutAll = createRequest<void, StatusResponse>(
  "/logout/all",
  "DELETE"
);

export const deleteUser = (id: number) =>
  createRequest<void, StatusResponse>(`/user/${id}`, "DELETE")();

export const reset = createRequest<void, StatusResponse>("/reset", "PUT");

export const deposit = createRequest<{ coins: number }, DataResponse<number>>(
  "/deposit",
  "PUT"
);

export const getMe = createRequest<void, DataResponse<User>>("/me", "GET");
