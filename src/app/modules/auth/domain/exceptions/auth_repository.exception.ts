export default class AuthRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("AuthRepositoryException");
    this.message = message;
    this.stack = stack;
  }
}
