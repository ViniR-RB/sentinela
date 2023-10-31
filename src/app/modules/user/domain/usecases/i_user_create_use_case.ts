import UserEntity from "../user.entity";

export default interface IUserCreateUseCase {
  create(): Promise<UserEntity>;
}
