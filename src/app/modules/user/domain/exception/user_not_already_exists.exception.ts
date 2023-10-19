export default class UserNotAlreadyExists extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("UserNotAlreadyExists");
    this.message = message;
    this.stack = stack;
  }
}
