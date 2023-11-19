import ComplaintEntity from "../domain/complaint.entity";

export default interface IComplaintGateway {
  create(complaintEntity: ComplaintEntity): Promise<ComplaintEntity>;
  getAllComplaint(): Promise<ComplaintEntity[]>;
  updateComplaintStatus(id: string, status: string): Promise<void>;
}
