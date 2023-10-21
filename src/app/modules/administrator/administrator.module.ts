import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CreateAdministratorService from "./application/create_administrator.service";
import AdministratorController from "./controller/administrator.controller";
import AdministratorModel from "./infra/model/administrator.model";
import AdministratorRepository from "./infra/repositories/administrator.repository";
import {
  ADMINISTRATOR_ADAPTER_GATEWAY,
  CREATE_ADMINISTRATOR_USE_CASE,
} from "./symbols";

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorModel])],
  providers: [
    {
      provide: CREATE_ADMINISTRATOR_USE_CASE,
      useClass: CreateAdministratorService,
    },
    {
      provide: ADMINISTRATOR_ADAPTER_GATEWAY,
      useClass: AdministratorRepository,
    },
  ],
  controllers: [AdministratorController],
  exports: [
    {
      provide: ADMINISTRATOR_ADAPTER_GATEWAY,
      useClass: AdministratorRepository,
    },
  ],
})
export default class AdministratorModule {}
