export default interface IUploadGetUrlImageUseCase {
  getUrlImage(fileName: string): Promise<string>;
}
