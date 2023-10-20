import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import TokensEntity from "src/app/modules/auth/domain/tokens.entity";
import UserEntity from "src/app/modules/user/domain/user.entity";

@Injectable()
export default class GenerateTokensService {
  constructor(private jwtService: JwtService) {}
  public async generate(user: UserEntity): Promise<TokensEntity> {
    const payload = {
      sub: user.id,
      name: user.name,
    };
    const access = await this.jwtService.signAsync(payload, {
      expiresIn: "30m",
    });
    const refreshtoken = await this.jwtService.signAsync(payload);
    return new TokensEntity(access, refreshtoken);
  }
}
