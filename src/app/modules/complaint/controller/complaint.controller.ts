import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import AuthAdministratorGuard from "src/app/core/guard/auth_administrator.guard";
import FileEntity from "../../upload/domain/file.entity";
import IUploadGetUrlImageUseCase from "../../upload/domain/usecases/i_upload_get_url_image_use_case";
import { IUploadImageUseCase } from "../../upload/domain/usecases/i_upload_image_use_case";
import {
  UPLOAD_GET_URL_IMAGE_USE_CASE,
  UPLOAD_IMAGE_USE_CASE,
} from "../../upload/symbols";
import ComplaintEntity from "../domain/complaint.entity";
import ComplaintRepositoryException from "../domain/exception/complaint_repository.exception";
import IGetAllComplaintUseCase from "../domain/usecases/I_get_all_complaint_use_case";
import ICreateComplaintUseCase from "../domain/usecases/i_create_complaint_use_case";
import IUpdateComplaintStatusUseCase from "../domain/usecases/i_update_complaint_status_use_case";
import {
  CREATE_COMPLAINT_USE_CASE,
  GET_ALL_COMPLAINT_USE_CASE,
  UPDATE_COMPLAINT_STATUS_USE_CASE,
} from "../symbols";

@Controller("/api/complaint")
export default class ComplaintController {
  constructor(
    @Inject(CREATE_COMPLAINT_USE_CASE)
    private readonly createComplaint: ICreateComplaintUseCase,
    @Inject(UPLOAD_IMAGE_USE_CASE)
    private readonly uploadImageService: IUploadImageUseCase,
    @Inject(UPLOAD_GET_URL_IMAGE_USE_CASE)
    private readonly uploadGetUrlImageService: IUploadGetUrlImageUseCase,
    @Inject(GET_ALL_COMPLAINT_USE_CASE)
    private readonly getAllComplaintService: IGetAllComplaintUseCase,
    @Inject(UPDATE_COMPLAINT_STATUS_USE_CASE)
    private readonly updateComplaintStatusService: IUpdateComplaintStatusUseCase,
  ) {}
  @Post("")
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("file"))
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() complaintBody: ComplaintEntity,
  ) {
    try {
      const uploadEntity = new FileEntity(
        file.originalname,
        file.buffer,
        "upload",
      );
      console.log(file);
      await this.uploadImageService.upload(uploadEntity);
      const getUrl = await this.uploadGetUrlImageService.getUrlImage(
        uploadEntity.fileName,
      );
      complaintBody.image = getUrl;
      return await this.createComplaint.create(complaintBody);
    } catch (e) {
      if (e instanceof ComplaintRepositoryException) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: e.stack,
        });
      }
    }
  }
  @Get("")
  @HttpCode(200)
  public async getAll() {
    try {
      return await this.getAllComplaintService.getAllComplaint();
    } catch (e) {
      if (e instanceof ComplaintRepositoryException) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: e.stack,
        });
      }
    }
  }
  @UseGuards(AuthAdministratorGuard)
  @Patch(":id")
  public async updateComplaintStatus(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() body: any,
  ) {
    try {
      const { status } = body;
      return await this.updateComplaintStatusService.updateComplaintStatus(
        id,
        status,
      );
    } catch (e) {
      if (e instanceof ComplaintRepositoryException) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: e.stack,
        });
      }
    }
  }
}
