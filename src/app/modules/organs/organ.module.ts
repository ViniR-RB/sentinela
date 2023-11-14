import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesModule } from "src/app/core/services/services.module";
import CreateOrganService from "./aplication/create_organ.service";
import OrganController from "./controller/organ.controller";
import OrganModel from "./infra/model/organ.model";
import OrganRepository from "./infra/repositories/organ.repository";
import { CREATE_ORGAN_USE_CASE, ORGAN_ADAPTER_GATEWAY } from "./symbols";

@Module({
  imports: [TypeOrmModule.forFeature([OrganModel]), ServicesModule],
  providers: [
    { provide: CREATE_ORGAN_USE_CASE, useClass: CreateOrganService },
    {
      provide: ORGAN_ADAPTER_GATEWAY,
      useClass: OrganRepository,
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
