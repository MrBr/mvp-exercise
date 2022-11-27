import { makeRequest } from "../app";
import { User } from "./types";

export const register = makeRequest<
  Pick<User, "username" | "password" | "role">,
  User
>("/user", "POST");
