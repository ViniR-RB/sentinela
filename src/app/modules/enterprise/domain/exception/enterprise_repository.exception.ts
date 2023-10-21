export default class EnterpriseRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("EnterpriseRepository");
    this.message = message;
    this.stack = stack;
  }
}
