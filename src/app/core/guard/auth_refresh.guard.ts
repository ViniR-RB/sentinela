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
import IOrganAdapterGateway from "src/app/modules/organs/adapters/i_organs_gateway";
import { ORGAN_ADAPTER_GATEWAY } from "src/app/modules/organs/symbols";
import { jwtConstants } from "../constants/jwt_constants";

@Injectable()
export default class AuthRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(ADMINISTRATOR_ADAPTER_GATEWAY)
    private readonly administratorGateway: IAdministratorAdapterGateway,
    @Inject(ORGAN_ADAPTER_GATEWAY)
    private readonly organGateway: IOrganAdapterGateway,
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
      const administratorFinder = await this.administratorGateway.findOneById(
        payload.sub,
      );

      if (administratorFinder === null) {
        const organFinder = await this.organGateway.findOneById(payload.sub);

        if (organFinder == null) {
          throw Error("Usuário ou token inválido");
        }
        request["user"] = payload;
        return true;
      }

      request["user"] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
