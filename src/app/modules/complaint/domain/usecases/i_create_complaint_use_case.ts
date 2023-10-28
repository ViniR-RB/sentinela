import ComplaintEntity from "../complaint.entity";

export default interface ICreateComplaintUseCase {
  create(complaintEntity: ComplaintEntity): Promise<ComplaintEntity>;
}
