import { DataResponse, createRequest } from "../app";
import { User } from "./types";

export const register = createRequest<
  Pick<User, "username" | "password" | "role">,
  DataResponse<User>
>("/user", "POST");

export const login = createRequest<
  Pick<User, "username" | "password">,
  DataResponse<string>
>("/authorise", "POST");

export const getMe = createRequest<void, DataResponse<User>>("/me", "GET");
