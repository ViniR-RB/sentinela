export default class OrganAlreadyExistsException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("OrganAlreadyExistsException");
    this.message = message;
    this.stack = stack;
  }
}
