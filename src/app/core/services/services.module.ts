import { Global, Module } from "@nestjs/common";
import { ConfigurationModule } from "src/app/modules/configuration/configuration.module";
import { ConfigurationService } from "src/app/modules/configuration/configuration.service";
import { EncryptionService } from "./encryption.service";

@Global()
@Module({
  imports: [ConfigurationModule],
  exports: [EncryptionService],
  providers: [ConfigurationService, EncryptionService],
})
export class ServicesModule {}
