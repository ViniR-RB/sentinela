import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AdministratorEntity from "src/app/modules/administrator/domain/administrator.entity";
import TokensEntity from "src/app/modules/auth/domain/tokens.entity";
import EnterpriseEntity from "src/app/modules/enterprise/domain/enterprise.entity";
import UserEntity from "src/app/modules/user/domain/user.entity";

@Injectable()
export default class GenerateTokensService {
  constructor(private jwtService: JwtService) {}
  public async generate(
    inputTypeEntity: UserEntity | AdministratorEntity | EnterpriseEntity,
  ): Promise<TokensEntity> {
    let payload = {};
    if (inputTypeEntity instanceof UserEntity) {
      payload = {
        sub: inputTypeEntity.id,
        name: inputTypeEntity.name,
        perfilType: "User",
      };
    } else if (inputTypeEntity instanceof AdministratorEntity) {
      payload = {
        sub: inputTypeEntity.id,
        name: inputTypeEntity.name,
        perfilType: "Administrator",
      };
    } else {
      payload = {
        sub: inputTypeEntity.id,
        name: inputTypeEntity.name,
        perfilType: "Enterprise",
      };
    }

    const access = await this.jwtService.signAsync(payload, {
      expiresIn: "30m",
    });
    const refreshtoken = await this.jwtService.signAsync(payload);
    return new TokensEntity(access, refreshtoken);
  }
}
