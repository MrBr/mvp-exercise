export class ApiError extends Error {
  status = 500;
  constructor(msg?: string) {
    super(msg || "Api failed to process the request.");
  }
}
