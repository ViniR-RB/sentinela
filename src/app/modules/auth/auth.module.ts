import { Module } from "@nestjs/common";
import { ServicesModule } from "src/app/core/services/services.module";
import AdministratorModule from "../administrator/administrator.module";
import EnterpriseModule from "../enterprise/enterprise.module";
import UserModule from "../user/user.module";
import LoginService from "./application/login.service";
import RefreshTokensService from "./application/refresh_tokens.service";
import AuthController from "./controller/auth.controller";
import AuthRepository from "./infra/repositories/auth.repository";
import { AUTH_GATEWAY, LOGIN_USECASE, REFRESHTOKENS_USECASE } from "./symbols";

@Module({
  imports: [UserModule, ServicesModule, AdministratorModule, EnterpriseModule],
  providers: [
    /* Domain */
    {
      provide: LOGIN_USECASE,
      useClass: LoginService,
    },
    {
      provide: REFRESHTOKENS_USECASE,
      useClass: RefreshTokensService,
    },
    /* Infra */
    {
      provide: AUTH_GATEWAY,
      useClass: AuthRepository,
    },
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
