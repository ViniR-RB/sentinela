import TokensEntity from "../domain/tokens.entity";

export default interface IAuthGateway {
  login(email: string, password: string): Promise<TokensEntity>;
  refresh(id: string): Promise<TokensEntity>;
}
