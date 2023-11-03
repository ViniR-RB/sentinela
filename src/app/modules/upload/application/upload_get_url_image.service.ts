import { Inject } from "@nestjs/common";
import { IUploadGateway } from "../adapters/i_upload_gateway";
import IUploadGetUrlImageUseCase from "../domain/usecases/i_upload_get_url_image_use_case";
import { UPLOAD_GATEWAY } from "../symbols";

export default class UploadGetUrlImageService
  implements IUploadGetUrlImageUseCase
{
  constructor(
    @Inject(UPLOAD_GATEWAY) private readonly uploadGateway: IUploadGateway,
  ) {}
  async getUrlImage(fileName: string): Promise<string> {
    return await this.uploadGateway.getUrlImage(fileName);
  }
}
