import EnterpriseEntity from "../domain/enterprise.entity";

export default interface IEnterpriseAdapterGateway {
  create(enterPrise: EnterpriseEntity): Promise<void>;
  findOneById(id: string): Promise<EnterpriseEntity>;
  findOneByEmail(email: string): Promise<EnterpriseEntity>;
}
