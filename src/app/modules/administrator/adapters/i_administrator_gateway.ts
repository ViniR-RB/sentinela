import AdministratorEntity from "../domain/administrator.entity";

export default interface IAdministratorAdapterGateway {
  create(administrator: AdministratorEntity): Promise<void>;
  findOneById(id: string): Promise<AdministratorEntity>;
  findOneByEmail(email: string): Promise<AdministratorEntity | null>;
}
