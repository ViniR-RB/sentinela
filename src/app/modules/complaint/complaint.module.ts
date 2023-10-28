import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CreateComplaintService from "./application/create_complaint.service";
import ComplaintController from "./controller/complaint.controller";
import ComplaintModel from "./infra/model/complaint.model";
import ComplaintRepository from "./infra/repositories/complaint.repository";
import { COMPLAINT_GATEWAY, CREATE_COMPLAINT_USE_CASE } from "./symbols";

@Module({
  imports: [TypeOrmModule.forFeature([ComplaintModel])],
  providers: [
    /* Adapter */
    {
      provide: COMPLAINT_GATEWAY,
      useClass: ComplaintRepository,
    },
    /* UseCases */
    {
      provide: CREATE_COMPLAINT_USE_CASE,
      useClass: CreateComplaintService,
    },
  ],
  controllers: [ComplaintController],
})
export default class ComplaintModule {}
