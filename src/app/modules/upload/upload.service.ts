import { Injectable } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { ConfigurationService } from "../configuration/configuration.service";
@Injectable()
export default class UploadService {
  constructor(private readonly configurationService: ConfigurationService) {}
  async upload(file: Express.Multer.File) {
    const supabaseUrl = this.configurationService.getSupabaseUrl();
    const supabaseKey = this.configurationService.getSupabaseApiKey();

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    const data = await supabase.storage
      .from("upload")
      .upload(file.fieldname, file.buffer, {
        upsert: true,
      });
    return data;
  }
}
