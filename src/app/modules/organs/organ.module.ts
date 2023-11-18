import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesModule } from "src/app/core/services/services.module";
import AdministratorModule from "../administrator/administrator.module";
import CreateOrganService from "./aplication/create_organ.service";
import GetAllOrgansIdAndNameService from "./aplication/get_all_organs_id_and_name.service";
import OrganController from "./controller/organ.controller";
import OrganModel from "./infra/model/organ.model";
import OrganRepository from "./infra/repositories/organ.repository";
import {
  CREATE_ORGAN_USE_CASE,
  GET_ALL_ORGANS_ID_AND_NAME_USE_CASE,
  ORGAN_ADAPTER_GATEWAY,
} from "./symbols";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganModel]),
    ServicesModule,
    AdministratorModule,
  ],
  providers: [
    { provide: CREATE_ORGAN_USE_CASE, useClass: CreateOrganService },
    {
      provide: ORGAN_ADAPTER_GATEWAY,
      useClass: OrganRepository,
    },
    {
      provide: GET_ALL_ORGANS_ID_AND_NAME_USE_CASE,
      useClass: GetAllOrgansIdAndNameService,
    },
  ],
  controllers: [OrganController],

  exports: [
    {
      provide: ORGAN_ADAPTER_GATEWAY,
      useClass: OrganRepository,
    },
  ],
})
export default class OrganModule {}
