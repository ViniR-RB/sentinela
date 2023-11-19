export default interface IUpdateComplaintStatusUseCase {
  updateComplaintStatus(id: string, status: string): Promise<void>;
}
