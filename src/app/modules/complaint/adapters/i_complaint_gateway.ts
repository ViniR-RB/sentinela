import ComplaintEntity from "../domain/complaint.entity";

export default interface IComplaintGateway {
  create(complaintEntity: ComplaintEntity): Promise<ComplaintEntity>;
}
