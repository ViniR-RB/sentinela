import OrganEntity from "../organ.entity";

export default interface iGetAllOrgansIdAndName {
  getAllOrgansIdAndName(): Promise<OrganEntity[]>;
}
