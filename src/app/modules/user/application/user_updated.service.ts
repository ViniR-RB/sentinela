import { Inject } from "@nestjs/common";
import IUserAdapterGateway from "../adapters/i_user_gateway";
import IUserUpdateUseCase from "../domain/usecases/i_user_update_use_case";
import UserEntity from "../domain/user.entity";
import { USER_ADAPTER_GATEWAY } from "../symbols";

export default class UserUpdateService implements IUserUpdateUseCase {
  constructor(
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,
  ) {}
  public async update(
    id: string,
    userAltered: UserEntity,
  ): Promise<UserEntity> {
    return await this.userAdapterGateway.update(id, userAltered);
  }
}
