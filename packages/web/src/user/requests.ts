import { DataResponse, createRequest, StatusResponse } from "../app";
import { User } from "./types";

export const register = createRequest<
  Pick<User, "username" | "password" | "role">,
  DataResponse<User>
>("/user", "POST");

export const login = createRequest<
  Pick<User, "username" | "password">,
  DataResponse<string>
>("/authorise", "POST");

export const reset = createRequest<void, StatusResponse>("/reset", "PUT");

export const deposit = createRequest<{ coins: number }, DataResponse<number>>(
  "/deposit",
  "PUT"
);

export const getMe = createRequest<void, DataResponse<User>>("/me", "GET");
