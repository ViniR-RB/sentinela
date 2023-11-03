import ComplaintEntity from "../complaint.entity";

export default interface IGetAllComplaintUseCase {
  getAllComplaint(): Promise<ComplaintEntity[]>;
}
