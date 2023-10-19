import UserEntity from "../domain/user.entity";

export default interface IUserAdapterGateway {
  create(userCreate: UserEntity): Promise<void>;
  update(id: string, userAltered: UserEntity): Promise<UserEntity>;
}
