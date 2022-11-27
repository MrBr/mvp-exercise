import { ApiError } from "../router";

export class InvalidBuyerError extends ApiError {
  status = 400;
  constructor() {
    super("Only buyer can buy product.");
  }
}
