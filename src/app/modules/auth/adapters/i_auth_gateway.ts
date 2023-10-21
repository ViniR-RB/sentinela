import { PerfilType } from "src/app/core/utils/perfil.type";
import TokensEntity from "../domain/tokens.entity";

export default interface IAuthGateway {
  login(
    email: string,
    password: string,
    perfilType: PerfilType,
  ): Promise<TokensEntity>;
  refresh(id: string, perfilType: PerfilType): Promise<TokensEntity>;
}
