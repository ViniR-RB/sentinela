import AdministratorEntity from "../administrator.entity";

export default interface ICreateAdministratorUseCase {
  create(administrator: AdministratorEntity): Promise<void>;
}
