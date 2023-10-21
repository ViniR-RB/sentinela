import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AdministratorModule from "../administrator/administrator.module";
import CreateEnterpriseService from "./application/create_enterprise.service";
import EnterpriseController from "./controller/enterprise.controller";
import EnterpriseModel from "./infra/model/enterprise.model";
import EnterpriseRepository from "./infra/repositories/enterprise.repository";
import {
  ENTERPRISE_ADAPTER_GATEWAY,
  ENTERPRISE_CREATE_USE_CASE,
} from "./symbols";

@Module({
  imports: [TypeOrmModule.forFeature([EnterpriseModel]), AdministratorModule],
  providers: [
    {
      provide: ENTERPRISE_CREATE_USE_CASE,
      useClass: CreateEnterpriseService,
    },
    {
      provide: ENTERPRISE_ADAPTER_GATEWAY,
      useClass: EnterpriseRepository,
    },
  ],
  controllers: [EnterpriseController],
  exports: [
    {
      provide: ENTERPRISE_ADAPTER_GATEWAY,
      useClass: EnterpriseRepository,
    },
  ],
})
export default class EnterpriseModule {}
