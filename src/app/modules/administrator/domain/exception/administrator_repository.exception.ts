export default class AdministratorRepositoryException extends Error {
  constructor(
    readonly message: string,
    readonly stack?: string,
  ) {
    super("AdministratorRepositoryException");
    this.message = message;
    this.stack = stack;
  }
}
