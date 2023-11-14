import { PerfilType } from "src/app/core/utils/perfil_type";
import TokensEntity from "../tokens.entity";

export default interface IRefreshTokensUseCase {
  refresh(id: string, perfilType: PerfilType): Promise<TokensEntity>;
}
