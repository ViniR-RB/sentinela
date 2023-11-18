import { Inject, Injectable } from "@nestjs/common";
import IOrganAdapterGateway from "../adapters/i_organs_gateway";
import OrganEntity from "../domain/organ.entity";
import iGetAllOrgansIdAndName from "../domain/usecases/i_get_organ_id_and_name";
import { ORGAN_ADAPTER_GATEWAY } from "../symbols";

@Injectable()
export default class GetAllOrgansIdAndNameService
  implements iGetAllOrgansIdAndName
{
  constructor(
    @Inject(ORGAN_ADAPTER_GATEWAY)
    private readonly organGateway: IOrganAdapterGateway,
  ) {}
  async getAllOrgansIdAndName(): Promise<OrganEntity[]> {
    return await this.organGateway.getAllOrgansIdAndName();
  }
}
