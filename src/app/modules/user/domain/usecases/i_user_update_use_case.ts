import UserEntity from "../user.entity";

export default interface IUserUpdateUseCase {
  update(id: string, userAltered: UserEntity): Promise<UserEntity>;
}
