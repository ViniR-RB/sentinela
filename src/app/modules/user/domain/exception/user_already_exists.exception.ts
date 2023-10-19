export default class UserAlreadyExists extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("UserAlreadyExists");
    this.message = message;
    this.stack = stack;
  }
}
