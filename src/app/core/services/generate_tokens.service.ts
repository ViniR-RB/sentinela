import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AdministratorEntity from "src/app/modules/administrator/domain/administrator.entity";
import TokensEntity from "src/app/modules/auth/domain/tokens.entity";

@Injectable()
export default class GenerateTokensService {
  constructor(private jwtService: JwtService) {}
  public async generate(
    inputTypeEntity: AdministratorEntity,
  ): Promise<TokensEntity> {
    const payload = {
      sub: inputTypeEntity.id,
      name: inputTypeEntity.name,
      perfilType: "Administrator",
    };

    const access = await this.jwtService.signAsync(payload, {
      expiresIn: "30m",
    });
    const refreshtoken = await this.jwtService.signAsync(payload);
    return new TokensEntity(access, refreshtoken);
  }
}
