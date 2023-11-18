import { Inject, Injectable } from "@nestjs/common";
import { EncryptionService } from "src/app/core/services/encryption.service";
import GenerateTokensService from "src/app/core/services/generate_tokens.service";
import IAdministratorAdapterGateway from "src/app/modules/administrator/adapters/i_administrator_gateway";
import { ADMINISTRATOR_ADAPTER_GATEWAY } from "src/app/modules/administrator/symbols";
import IOrganAdapterGateway from "src/app/modules/organs/adapters/i_organs_gateway";
import OrganEntity from "src/app/modules/organs/domain/organ.entity";
import { ORGAN_ADAPTER_GATEWAY } from "src/app/modules/organs/symbols";
import IAuthGateway from "../../adapters/i_auth_gateway";
import AuthRepositoryException from "../../domain/exceptions/auth_repository.exception";
import EmailOrPasswordException from "../../domain/exceptions/email_or_password.exception";
import TokensEntity from "../../domain/tokens.entity";

@Injectable()
export default class AuthRepository implements IAuthGateway {
  constructor(
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,
    @Inject(ORGAN_ADAPTER_GATEWAY)
    private readonly organGateway: IOrganAdapterGateway,
    private readonly encryptionService: EncryptionService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}
  async refresh(id: string): Promise<TokensEntity> {
    try {
      const administratorFinder =
        await this.administratorGateway.findOneById(id);
      if (administratorFinder !== null) {
        return await this.generateTokensService.generate(administratorFinder);
      } else {
        const organFinder = await this.organGateway.findOneById(id);
        return await this.generateTokensService.generate(organFinder);
      }
    } catch (error) {
      throw new AuthRepositoryException(error.message, error.stack);
    }
  }
  public async login(email: string, password: string): Promise<TokensEntity> {
    try {
      const finderAdministrator =
        await this.administratorGateway.findOneByEmail(email);

      if (finderAdministrator == null) {
        const finderOrgan = await this.organGateway.findOneByEmail(email);
        const organ = new OrganEntity(
          finderOrgan.id,
          finderOrgan.name,
          finderOrgan.email,
          finderOrgan.password,
          [],
        );
        if (finderOrgan == null) {
          throw new EmailOrPasswordException("E-mail ou senha incorreto");
        }
        const isMatchPassword = await this.encryptionService.isMatch(
          organ.password,
          password,
        );
        if (isMatchPassword === false) {
          throw new EmailOrPasswordException("E-mail ou senha incorreto");
        }
        return await this.generateTokensService.generate(organ);
      }
      const isMatchPassword = await this.encryptionService.isMatch(
        finderAdministrator.password,
        password,
      );
      if (isMatchPassword === false) {
        throw new EmailOrPasswordException("E-mail ou senha incorreto");
      }
      return await this.generateTokensService.generate(finderAdministrator);
    } catch (e) {
      throw new AuthRepositoryException(e.message, e.stack);
    }
  }
}
