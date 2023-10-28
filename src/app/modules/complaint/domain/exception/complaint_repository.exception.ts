export default class ComplaintRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("ComplaintRepositoryException");
    this.message = message;
    this.stack = stack;
  }
}
