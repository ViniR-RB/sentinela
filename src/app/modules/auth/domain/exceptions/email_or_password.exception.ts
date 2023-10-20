export default class EmailOrPasswordException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("EmailOrPasswordException");
    this.message = message;
    this.stack = stack;
  }
}
