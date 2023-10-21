import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import IAdministratorAdapterGateway from "src/app/modules/administrator/adapters/i_administrator_gateway";
import { ADMINISTRATOR_ADAPTER_GATEWAY } from "src/app/modules/administrator/symbols";
import IEnterpriseAdapterGateway from "src/app/modules/enterprise/adapters/i_enterprise_gateway";
import { ENTERPRISE_ADAPTER_GATEWAY } from "src/app/modules/enterprise/symbols";
import IUserAdapterGateway from "src/app/modules/user/adapters/i_user_gateway";
import { USER_ADAPTER_GATEWAY } from "src/app/modules/user/symbols";
import { jwtConstants } from "../constants/jwt_constants";

@Injectable()
export default class AuthRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(USER_ADAPTER_GATEWAY)
    private readonly userAdapterGateway: IUserAdapterGateway,
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,
    @Inject(ENTERPRISE_ADAPTER_GATEWAY)
    private readonly enterpriseGateway: IEnterpriseAdapterGateway,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      if (payload.perfilType === "User") {
        await this.userAdapterGateway.findOneById(payload.sub);
      } else if (payload.perfilType === "Administrator") {
        await this.administratorGateway.findOneById(payload.sub);
      } else {
        await this.enterpriseGateway.findOneById(payload.sub);
      }

      request["user"] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
