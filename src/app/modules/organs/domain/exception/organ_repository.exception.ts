export default class OrganRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("OrganRepositoryException");
    this.message = message;
    this.stack = stack;
  }
}
