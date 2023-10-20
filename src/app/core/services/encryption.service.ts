import { Injectable } from "@nestjs/common";
import * as brcypt from "bcrypt";
import { ConfigurationService } from "src/app/modules/configuration/configuration.service";
@Injectable()
export class EncryptionService {
  constructor(private readonly configurationService: ConfigurationService) {}

  async hash(anyString: string) {
    return await brcypt.hash(anyString, this.configurationService.getSalt());
  }
  async isMatch(hashedString: string, normalString: string) {
    return await brcypt.compare(normalString, hashedString);
  }
}
