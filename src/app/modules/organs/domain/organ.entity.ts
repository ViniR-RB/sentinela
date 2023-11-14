export default class OrganEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
