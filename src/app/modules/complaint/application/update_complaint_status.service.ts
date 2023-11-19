import { Inject, Injectable } from "@nestjs/common";
import IUpdateComplaintStatusUseCase from "../domain/usecases/i_update_complaint_status_use_case";
import { COMPLAINT_GATEWAY } from "../symbols";
@Injectable()
export default class UpdateComplaintStatusService
  implements IUpdateComplaintStatusUseCase
{
  constructor(@Inject(COMPLAINT_GATEWAY) private readonly complaintGateway) {}
  async updateComplaintStatus(id: string, status: string): Promise<void> {
    await this.complaintGateway.updateComplaintStatus(id, status);
  }
}
