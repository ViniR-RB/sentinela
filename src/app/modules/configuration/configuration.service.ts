import { Injectable } from "@nestjs/common";
require("dotenv").config(); // eslint-disable-line
@Injectable()
export class ConfigurationService {
  private readonly env: NodeJS.ProcessEnv;

  constructor() {
    this.env = process.env;
  }
  getSecretPassword(): string {
    return this.env.SECRETPASSWORD;
  }
  getDbHost(): string {
    return this.env.DB_HOST;
  }
  getDbPort(): number {
    return Number(this.env.DB_PORT);
  }
  getDbUsername(): string {
    return this.env.DB_USERNAME;
  }
  getDbPassword(): string {
    return this.env.DB_PASSWORD;
  }

  getDbDatabase(): string {
    return this.env.DB_DATABASE;
  }
  getSalt(): number {
    return Number(this.env.SALT);
  }
  getSupabaseUrl(): string {
    return this.env.SUPABASE_URL;
  }
  getSupabaseApiKey(): string {
    return this.env.SUPABASE_API_KEY;
  }
}
