import FileEntity from "../file.entity";

export interface IUploadImageUseCase {
  upload(file: FileEntity): Promise<void>;
}
