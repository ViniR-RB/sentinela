export default class TokensEntity {
  acessToken: string;
  refreshToken: string;

  constructor(acessToken: string, refreshToken: string) {
    this.acessToken = acessToken;
    this.refreshToken = refreshToken;
  }
}
