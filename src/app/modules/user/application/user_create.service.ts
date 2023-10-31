import { Inject, Injectable } from "@nestjs/common";
import IUserAdapterGateway from "../adapters/i_user_gateway";
import IUserCreateUseCase from "../domain/usecases/i_user_create_use_case";
import UserEntity from "../domain/user.entity";
import { USER_ADAPTER_GATEWAY } from "../symbols";

@Injectable()
export default class UserCreateService implements IUserCreateUseCase {
  constructor(
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,
  ) {}
  public async create(): Promise<UserEntity> {
    return await this.userAdapterGateway.create();
  }
}
