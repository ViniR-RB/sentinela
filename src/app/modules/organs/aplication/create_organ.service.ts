import { Inject, Injectable } from "@nestjs/common";
import IOrganAdapterGateway from "../adapters/i_organs_gateway";
import OrganEntity from "../domain/organ.entity";
import ICreateOrgansUseCase from "../domain/usecases/i_create_organ_use_case";
import { ORGAN_ADAPTER_GATEWAY } from "../symbols";

@Injectable()
export default class CreateOrganService implements ICreateOrgansUseCase {
  constructor(
    @Inject(ORGAN_ADAPTER_GATEWAY)
    private readonly organGateway: IOrganAdapterGateway,
  ) {}
  async create(organEntity: OrganEntity): Promise<void> {
    return await this.organGateway.create(organEntity);
  }
}
