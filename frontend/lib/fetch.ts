export class FetchError extends Error {
  constructor(
    message?: string,
    public code?: number,
    public info?: any,
    public detail?: string
  ) {
    super(message);
    this.name = "FetchError";
  }
}
