import { Injectable } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { ConfigurationService } from "src/app/modules/configuration/configuration.service";
import { IUploadGateway } from "../../adapters/i_upload_gateway";
import FileEntity from "../../domain/file.entity";

@Injectable()
export default class SupaBaseService implements IUploadGateway {
  private readonly supabase: SupabaseClient<any, "public", any>;
  constructor(private readonly configurationService: ConfigurationService) {
    this.supabase = createClient(
      this.configurationService.getSupabaseUrl(),
      this.configurationService.getSupabaseApiKey(),
    );
  }
  async getUrlImage(fileName: string): Promise<string> {
    const { data } = this.supabase.storage
      .from("upload")
      .getPublicUrl(fileName);
    return data.publicUrl;
  }
  public async upload(file: FileEntity): Promise<void> {
    try {
      await this.supabase.storage
        .from(file.storageName)
        .upload(file.fileName, file.buffer, {
          upsert: true,
        });
      return;
    } catch (e) {
      console.log(e);
    }
  }
}
