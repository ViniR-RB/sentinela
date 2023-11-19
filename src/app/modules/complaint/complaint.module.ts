import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AdministratorModule from "../administrator/administrator.module";
import { UploadModule } from "../upload/upload.module";
import CreateComplaintService from "./application/create_complaint.service";
import GetAllComplaintService from "./application/get_all_complaint.service";
import UpdateComplaintStatusService from "./application/update_complaint_status.service";
import ComplaintController from "./controller/complaint.controller";
import ComplaintModel from "./infra/model/complaint.model";
import ComplaintRepository from "./infra/repositories/complaint.repository";
import {
  COMPLAINT_GATEWAY,
  CREATE_COMPLAINT_USE_CASE,
  GET_ALL_COMPLAINT_USE_CASE,
  UPDATE_COMPLAINT_STATUS_USE_CASE,
} from "./symbols";

@Module({
  imports: [
    TypeOrmModule.forFeature([ComplaintModel]),
    UploadModule,
    AdministratorModule,
  ],
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
    {
      provide: GET_ALL_COMPLAINT_USE_CASE,
      useClass: GetAllComplaintService,
    },
    {
      provide: UPDATE_COMPLAINT_STATUS_USE_CASE,
      useClass: UpdateComplaintStatusService,
    },
  ],
  controllers: [ComplaintController],
})
export default class ComplaintModule {}
