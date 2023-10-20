import { Inject, Injectable } from "@nestjs/common";
import { EncryptionService } from "src/app/core/services/encryption.service";
import GenerateTokensService from "src/app/core/services/generate_tokens.service";
import IUserAdapterGateway from "src/app/modules/user/adapters/i_user_gateway";
import UserEntity from "src/app/modules/user/domain/user.entity";
import { USER_ADAPTER_GATEWAY } from "src/app/modules/user/symbols";
import IAuthGateway from "../../adapters/i_auth_gateway";
import AuthRepositoryException from "../../domain/exceptions/auth_repository.exception";
import EmailOrPasswordException from "../../domain/exceptions/email_or_password.exception";
import TokensEntity from "../../domain/tokens.entity";

@Injectable()
export default class AuthRepository implements IAuthGateway {
  constructor(
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,

    private readonly encryptionService: EncryptionService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}
  async refresh(id: string): Promise<TokensEntity> {
    const userAuthenticaded = await this.userAdapterGateway.findOneById(id);
    return await this.generateTokensService.generate(
      new UserEntity(
        userAuthenticaded.id,
        userAuthenticaded.name,
        userAuthenticaded.email,
        userAuthenticaded.password,
      ),
    );
  }
  public async login(email: string, password: string): Promise<TokensEntity> {
    try {
      const userFinder = await this.userAdapterGateway.findOneByEmail(email);
      const isMatchPassword = await this.encryptionService.isMatch(
        userFinder.password,
        password,
      );
      if (isMatchPassword === false) {
        throw new EmailOrPasswordException("E-mail ou senha incorreto");
      }
      return await this.generateTokensService.generate(
        new UserEntity(
          userFinder.id,
          userFinder.name,
          userFinder.email,
          userFinder.password,
        ),
      );
    } catch (e) {
      throw new AuthRepositoryException(e.message, e.stack);
    }
  }
}
