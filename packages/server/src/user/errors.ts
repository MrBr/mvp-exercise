import { ApiError } from "../router";
import { ALLOWED_DEPOSITS } from "./constants";

export class InvalidCredentialsError extends ApiError {
  status = 401;
  constructor() {
    super("Invalid user credentials.");
  }
}

export class InvalidUpdatePayloadError extends ApiError {
  status = 400;
  constructor(fields: string[]) {
    super(`Updating forbidden fields: ${fields.join(", ")}`);
  }
}

export class InvalidDepositError extends ApiError {
  status = 400;
  constructor() {
    super(`Invalid deposit allowed deposits: ${ALLOWED_DEPOSITS.join(",")}`);
  }
}

export class InvalidDepositor extends ApiError {
  status = 400;
  constructor() {
    super("Only buyers can make deposit.");
  }
}
