import { Inject, Injectable } from "@nestjs/common";
import IEnterpriseAdapterGateway from "../adapters/i_enterprise_gateway";
import EnterpriseEntity from "../domain/enterprise.entity";
import IEnterpriseCreateUseCase from "../domain/usescases/i_create_enterprise_use_case";
import { ENTERPRISE_ADAPTER_GATEWAY } from "../symbols";
@Injectable()
export default class CreateEnterpriseService
  implements IEnterpriseCreateUseCase
{
  constructor(
    @Inject(ENTERPRISE_ADAPTER_GATEWAY)
    private readonly enterpriseAdapterGateway: IEnterpriseAdapterGateway,
  ) {}
  public async create(enterPrise: EnterpriseEntity): Promise<void> {
    return await this.enterpriseAdapterGateway.create(enterPrise);
  }
}
