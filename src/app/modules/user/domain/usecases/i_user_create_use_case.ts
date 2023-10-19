import UserEntity from "../user.entity";

export default interface IUserCreateUseCase {
  create(userCreate: UserEntity): Promise<void>;
}
