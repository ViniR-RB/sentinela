import { AdministratorType } from "src/app/core/utils/administrator.type";
import TokensEntity from "../tokens.entity";

export default interface IRefreshTokensUseCase {
  refresh(id: string, perfilType: AdministratorType): Promise<TokensEntity>;
}
