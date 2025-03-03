export class FetchError extends Error {
  constructor(message?: string, public code?: number, public info?: any) {
    super(message);
    this.name = "FetchError";
  }
}
