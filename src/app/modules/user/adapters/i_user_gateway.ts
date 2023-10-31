import UserEntity from "../domain/user.entity";

export default interface IUserAdapterGateway {
  create(): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findOneById(id: string): Promise<UserEntity>;
}
