import { Inject, Injectable } from "@nestjs/common";
import IAuthGateway from "../adapters/i_auth_gateway";
import TokensEntity from "../domain/tokens.entity";
import ILoginUsecase from "../domain/usecases/i_login_use_case";
import { AUTH_GATEWAY } from "../symbols";
@Injectable()
export default class LoginService implements ILoginUsecase {
  constructor(
    @Inject(AUTH_GATEWAY) private readonly authGateway: IAuthGateway,
  ) {}
  public async login(email: string, password: string): Promise<TokensEntity> {
    return await this.authGateway.login(email, password);
  }
}
