import OrganEntity from "../domain/organ.entity";

export default interface IOrganAdapterGateway {
  create(organEntity: OrganEntity): Promise<void>;
  findOneById(id: string): Promise<OrganEntity | null>;
  findOneByEmail(email: string): Promise<OrganEntity | null>;
  getAllOrgansIdAndName(): Promise<OrganEntity[]>;
}
