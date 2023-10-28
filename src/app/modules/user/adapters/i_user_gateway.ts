import UserEntity from "../domain/user.entity";

export default interface IUserAdapterGateway {
  create(userCreate: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findOneById(id: string): Promise<UserEntity>;
}
