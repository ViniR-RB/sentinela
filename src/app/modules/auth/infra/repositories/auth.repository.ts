import { Inject, Injectable } from "@nestjs/common";
import { EncryptionService } from "src/app/core/services/encryption.service";
import GenerateTokensService from "src/app/core/services/generate_tokens.service";
import IAdministratorAdapterGateway from "src/app/modules/administrator/adapters/i_administrator_gateway";
import AdministratorEntity from "src/app/modules/administrator/domain/administrator.entity";
import { ADMINISTRATOR_ADAPTER_GATEWAY } from "src/app/modules/administrator/symbols";
import IAuthGateway from "../../adapters/i_auth_gateway";
import AuthRepositoryException from "../../domain/exceptions/auth_repository.exception";
import EmailOrPasswordException from "../../domain/exceptions/email_or_password.exception";
import TokensEntity from "../../domain/tokens.entity";

@Injectable()
export default class AuthRepository implements IAuthGateway {
  constructor(
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,

    private readonly encryptionService: EncryptionService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}
  async refresh(id: string): Promise<TokensEntity> {
    let authenticaded: AdministratorEntity;
    try {
      authenticaded = await this.administratorGateway.findOneById(id);

      return await this.generateTokensService.generate(authenticaded);
    } catch (error) {
      throw new AuthRepositoryException(error.message, error.stack);
    }
  }
  public async login(email: string, password: string): Promise<TokensEntity> {
    try {
      const finder: AdministratorEntity =
        await this.administratorGateway.findOneByEmail(email);

      const isMatchPassword = await this.encryptionService.isMatch(
        finder.password,
        password,
      );
      if (isMatchPassword === false) {
        throw new EmailOrPasswordException("E-mail ou senha incorreto");
      }
      return await this.generateTokensService.generate(finder);
    } catch (e) {
      throw new AuthRepositoryException(e.message, e.stack);
    }
  }
}
