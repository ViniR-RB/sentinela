import { Inject, Injectable } from "@nestjs/common";
import { EncryptionService } from "src/app/core/services/encryption.service";
import GenerateTokensService from "src/app/core/services/generate_tokens.service";
import IAdministratorAdapterGateway from "src/app/modules/administrator/adapters/i_administrator_gateway";
import AdministratorEntity from "src/app/modules/administrator/domain/administrator.entity";
import { ADMINISTRATOR_ADAPTER_GATEWAY } from "src/app/modules/administrator/symbols";
import IEnterpriseAdapterGateway from "src/app/modules/enterprise/adapters/i_enterprise_gateway";
import EnterpriseEntity from "src/app/modules/enterprise/domain/enterprise.entity";
import { ENTERPRISE_ADAPTER_GATEWAY } from "src/app/modules/enterprise/symbols";
import IUserAdapterGateway from "src/app/modules/user/adapters/i_user_gateway";
import UserEntity from "src/app/modules/user/domain/user.entity";
import { USER_ADAPTER_GATEWAY } from "src/app/modules/user/symbols";
import IAuthGateway from "../../adapters/i_auth_gateway";
import AuthRepositoryException from "../../domain/exceptions/auth_repository.exception";
import EmailOrPasswordException from "../../domain/exceptions/email_or_password.exception";
import TokensEntity from "../../domain/tokens.entity";
import { PerfilType } from "src/app/core/utils/perfil.type";

@Injectable()
export default class AuthRepository implements IAuthGateway {
  constructor(
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,
    @Inject(ENTERPRISE_ADAPTER_GATEWAY)
    private readonly enterpriseGateway: IEnterpriseAdapterGateway,

    private readonly encryptionService: EncryptionService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}
  async refresh(id: string, perfilType: PerfilType): Promise<TokensEntity> {
    let authenticaded: UserEntity | AdministratorEntity | EnterpriseEntity;
    try {
      if (perfilType === PerfilType.User) {
        authenticaded = await this.userAdapterGateway.findOneById(id);
      } else if (perfilType === PerfilType.Administrator) {
        authenticaded = await this.administratorGateway.findOneById(id);
      } else {
        authenticaded = await this.enterpriseGateway.findOneById(id);
      }

      return await this.generateTokensService.generate(authenticaded);
    } catch (error) {
      throw new AuthRepositoryException(error.message, error.stack);
    }
  }
  public async login(
    email: string,
    password: string,
    perfilType: PerfilType,
  ): Promise<TokensEntity> {
    try {
      let finder: UserEntity | AdministratorEntity | EnterpriseEntity;
      if (perfilType === PerfilType.User) {
        finder = await this.userAdapterGateway.findOneByEmail(email);
      } else if (perfilType === PerfilType.Administrator) {
        finder = await this.administratorGateway.findOneByEmail(email);
      } else {
        finder = await this.enterpriseGateway.findOneByEmail(email);
      }

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
