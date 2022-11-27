import { ApiError } from "../router";

export class ForbiddenProductOperationError extends ApiError {
  status = 403;
  constructor() {
    super("Forbidden product operation.");
  }
}

export class InvalidRoleOperationError extends ApiError {
  status = 400;
  constructor() {
    super("Buyer can't create product.");
  }
}
