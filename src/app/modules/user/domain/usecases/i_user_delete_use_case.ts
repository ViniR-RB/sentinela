export default interface IUserDeleteUseCase {
  delete(id: string): Promise<void>;
}
