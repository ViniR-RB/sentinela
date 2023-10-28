import { Inject } from "@nestjs/common";
import IUserAdapterGateway from "../adapters/i_user_gateway";
import IUserDeleteUseCase from "../domain/usecases/i_user_delete_use_case";
import { USER_ADAPTER_GATEWAY } from "../symbols";

export default class UserDeleteService implements IUserDeleteUseCase {
  constructor(
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,
  ) {}
  public async delete(id: string): Promise<void> {
    return await this.userAdapterGateway.delete(id);
  }
}
