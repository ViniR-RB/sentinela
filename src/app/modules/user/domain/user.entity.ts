import ComplaintEntity from "../../complaint/domain/complaint.entity";

export default class UserEntity {
  constructor(
    public id: string,
    public complaints: ComplaintEntity[],
  ) {
    this.id = id;
    this.complaints = complaints;
  }
}
