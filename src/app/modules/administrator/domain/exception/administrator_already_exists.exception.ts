export default class AdministratorAlreadyExistsException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("AdministratorAlreadyExistsException");
    this.message = message;
    this.stack = stack;
  }
}
