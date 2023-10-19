import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesModule } from "src/app/core/services/services.module";
import UserCreateService from "./application/user_create.service";
import UserUpdateService from "./application/user_updated.service";
import UserController from "./controller/user.controller";
import UserModel from "./infra/model/user.model";
import UserRepository from "./infra/repositories/user.repository";
import {
  USER_ADAPTER_GATEWAY,
  USER_CREATE_USE_CASE,
  USER_UPDATE_USE_CASE,
} from "./symbols";

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), ServicesModule],
  providers: [
    // UseCase
    {
      provide: USER_CREATE_USE_CASE,
      useClass: UserCreateService,
    },
    {
      provide: USER_UPDATE_USE_CASE,
      useClass: UserUpdateService,
    },
    // Infra
    {
      provide: USER_ADAPTER_GATEWAY,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
})
export default class UserModule {}
