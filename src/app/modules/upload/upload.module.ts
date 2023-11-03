import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../configuration/configuration.module";
import UploadGetUrlImageService from "./application/upload_get_url_image.service";
import UploadImageService from "./application/upload_image.service";
import SupaBaseService from "./infra/supabase/supase.service";
import {
  UPLOAD_GATEWAY,
  UPLOAD_GET_URL_IMAGE_USE_CASE,
  UPLOAD_IMAGE_USE_CASE,
} from "./symbols";

@Module({
  imports: [ConfigurationModule],
  providers: [
    { provide: UPLOAD_GATEWAY, useClass: SupaBaseService },
    { provide: UPLOAD_IMAGE_USE_CASE, useClass: UploadImageService },
    {
      provide: UPLOAD_GET_URL_IMAGE_USE_CASE,
      useClass: UploadGetUrlImageService,
    },
  ],
  exports: [
    { provide: UPLOAD_IMAGE_USE_CASE, useClass: UploadImageService },
    {
      provide: UPLOAD_GET_URL_IMAGE_USE_CASE,
      useClass: UploadGetUrlImageService,
    },
  ],
})
export class UploadModule {}
