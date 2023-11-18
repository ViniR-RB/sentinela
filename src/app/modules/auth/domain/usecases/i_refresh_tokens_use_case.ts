import TokensEntity from "../tokens.entity";

export default interface IRefreshTokensUseCase {
  refresh(id: string): Promise<TokensEntity>;
}
