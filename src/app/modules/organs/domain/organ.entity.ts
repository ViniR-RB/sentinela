import ComplaintEntity from "../../complaint/domain/complaint.entity";

export default class OrganEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public complaints: ComplaintEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.complaints = complaints;
  }
}
