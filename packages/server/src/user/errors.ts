import { ApiError } from "../app";

export class InvalidCredentialsError extends ApiError {
  status = 401;
  constructor() {
    super("Invalid user credentials.");
  }
}
