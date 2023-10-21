import { Inject, Injectable } from "@nestjs/common";
import { PerfilType } from "src/app/core/utils/perfil.type";
import IAuthGateway from "../adapters/i_auth_gateway";
import TokensEntity from "../domain/tokens.entity";
import IRefreshTokensUseCase from "../domain/usecases/i_refresh_tokens_use_case";
import { AUTH_GATEWAY } from "../symbols";
@Injectable()
export default class RefreshTokensService implements IRefreshTokensUseCase {
  constructor(
    @Inject(AUTH_GATEWAY) private readonly authGateway: IAuthGateway,
  ) {}
  async refresh(id: string, perfilType: PerfilType): Promise<TokensEntity> {
    return await this.authGateway.refresh(id, perfilType);
  }
}
