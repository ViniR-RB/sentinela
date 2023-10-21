import { PerfilType } from "src/app/core/utils/perfil.type";
import TokensEntity from "../tokens.entity";

export default interface ILoginUsecase {
  login(
    email: string,
    password: string,
    perfilType: PerfilType,
  ): Promise<TokensEntity>;
}
