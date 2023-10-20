import TokensEntity from "../tokens.entity";

export default interface ILoginUsecase {
  login(email: string, password: string): Promise<TokensEntity>;
}
