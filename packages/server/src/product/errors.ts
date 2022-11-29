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

export class UnexistingProductError extends ApiError {
  status = 400;
  constructor() {
    super("Product does not exists.");
  }
}

export class InvalidUnloadAmountError extends ApiError {
  status = 400;
  constructor() {
    super("Product unload amount must be more than 0.");
  }
}

export class InsufficientAvailableProductsError extends ApiError {
  status = 400;
  constructor() {
    super("Not enough products on the stack.");
  }
}
