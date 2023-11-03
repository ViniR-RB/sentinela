import FileEntity from "../domain/file.entity";

export interface IUploadGateway {
  upload(file: FileEntity): Promise<void>;
  getUrlImage(fileName: string): Promise<string>;
}
