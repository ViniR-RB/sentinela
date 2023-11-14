import OrganEntity from "../organ.entity";

export default interface ICreateOrgansUseCase {
  create(organEntity: OrganEntity): Promise<void>;
}
