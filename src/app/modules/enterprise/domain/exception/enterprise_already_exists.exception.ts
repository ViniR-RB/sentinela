export default class EnterpriseAlreadyExistsException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("EnterpriseAlreadyExistsException");
    this.message = message;
    this.stack = stack;
  }
}
