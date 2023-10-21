import EnterpriseEntity from "../enterprise.entity";

export default interface IEnterpriseCreateUseCase {
  create(enterPrise: EnterpriseEntity): Promise<void>;
}
