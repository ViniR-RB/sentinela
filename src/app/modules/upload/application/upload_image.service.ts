import { Inject, Injectable } from "@nestjs/common";
import { IUploadGateway } from "../adapters/i_upload_gateway";
import FileEntity from "../domain/file.entity";
import { IUploadImageUseCase } from "../domain/usecases/i_upload_image_use_case";
import { UPLOAD_GATEWAY } from "../symbols";

@Injectable()
export default class UploadImageService implements IUploadImageUseCase {
  constructor(
    @Inject(UPLOAD_GATEWAY) private readonly uploadGateway: IUploadGateway,
  ) {}

  public async upload(file: FileEntity): Promise<void> {
    return await this.uploadGateway.upload(file);
  }
}
