import UserEntity from "../domain/user.entity";

export default interface IUserAdapterGateway {
  create(userCreate: UserEntity): Promise<void>;
  update(id: string, userAltered: UserEntity): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity>;
  findOneByEmail(email: string): Promise<UserEntity>;
}
