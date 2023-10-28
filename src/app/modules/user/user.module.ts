import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesModule } from "src/app/core/services/services.module";
import AdministratorModule from "../administrator/administrator.module";
import UserCreateService from "./application/user_create.service";
import UserDeleteService from "./application/user_updated.service";
import UserController from "./controller/user.controller";
import UserModel from "./infra/model/user.model";
import UserRepository from "./infra/repositories/user.repository";
import {
  USER_ADAPTER_GATEWAY,
  USER_CREATE_USE_CASE,
  USER_DELETE_USE_CASE,
} from "./symbols";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    ServicesModule,
    AdministratorModule,
  ],
  providers: [
    // UseCase
    {
      provide: USER_CREATE_USE_CASE,
      useClass: UserCreateService,
    },
    {
      provide: USER_DELETE_USE_CASE,
      useClass: UserDeleteService,
    },
    // Infra
    {
      provide: USER_ADAPTER_GATEWAY,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [
    {
      provide: USER_ADAPTER_GATEWAY,
      useClass: UserRepository,
    },
  ],
})
export default class UserModule {}
