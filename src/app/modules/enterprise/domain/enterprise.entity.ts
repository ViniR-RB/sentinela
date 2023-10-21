export default class EnterpriseEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public cnpj: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cnpj = cnpj;
  }
}
