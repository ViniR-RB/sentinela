import { Inject, Injectable } from "@nestjs/common";
import IComplaintGateway from "../adapters/i_complaint_gateway";
import ComplaintEntity from "../domain/complaint.entity";
import IGetAllComplaintUseCase from "../domain/usecases/I_get_all_complaint_use_case";
import { COMPLAINT_GATEWAY } from "../symbols";

@Injectable()
export default class GetAllComplaintService implements IGetAllComplaintUseCase {
  constructor(
    @Inject(COMPLAINT_GATEWAY)
    private readonly complaintGateway: IComplaintGateway,
  ) {}
  async getAllComplaint(): Promise<ComplaintEntity[]> {
    return await this.complaintGateway.getAllComplaint();
  }
}
