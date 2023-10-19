export default class UserRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("UserRepositoryException");
    this.message = message;
    this.stack = stack;
  }
}
