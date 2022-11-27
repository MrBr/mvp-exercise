import { ApiError } from "../router";

export class UnAuthorizedError extends ApiError {
  status = 401;
  constructor() {
    super("Unauthorized request");
  }
}
