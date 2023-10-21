import { Inject, Injectable } from "@nestjs/common";
import IAdministratorAdapterGateway from "../adapters/i_administrator_gateway";
import AdministratorEntity from "../domain/administrator.entity";
import ICreateAdministratorUseCase from "../domain/usecases/i_create_administrator_use_case";
import { ADMINISTRATOR_ADAPTER_GATEWAY } from "../symbols";

@Injectable()
export default class CreateAdministratorService
  implements ICreateAdministratorUseCase
{
  constructor(
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,
  ) {}
  public async create(administrator: AdministratorEntity): Promise<void> {
    return await this.administratorGateway.create(administrator);
  }
}
