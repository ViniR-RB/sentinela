import { Inject, Injectable } from "@nestjs/common";
import IComplaintGateway from "../adapters/i_complaint_gateway";
import ComplaintEntity from "../domain/complaint.entity";
import ICreateComplaintUseCase from "../domain/usecases/i_create_complaint_use_case";
import { COMPLAINT_GATEWAY } from "../symbols";

@Injectable()
export default class CreateComplaintService implements ICreateComplaintUseCase {
  constructor(
    @Inject(COMPLAINT_GATEWAY)
    private readonly complaintGateway: IComplaintGateway,
  ) {}
  public async create(
    complaintEntity: ComplaintEntity,
  ): Promise<ComplaintEntity> {
    console.log(complaintEntity);
    return await this.complaintGateway.create(complaintEntity);
  }
}
