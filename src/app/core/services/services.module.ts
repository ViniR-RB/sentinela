import { Global, Module } from "@nestjs/common";
import { ConfigurationModule } from "src/app/modules/configuration/configuration.module";
import { ConfigurationService } from "src/app/modules/configuration/configuration.service";
import { EncryptionService } from "./encryption.service";
import GenerateTokensService from "./generate_tokens.service";

@Global()
@Module({
  imports: [ConfigurationModule],
  exports: [EncryptionService, GenerateTokensService],
  providers: [ConfigurationService, EncryptionService, GenerateTokensService],
})
export class ServicesModule {}
