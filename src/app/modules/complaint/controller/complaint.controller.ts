import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import ComplaintEntity from "../domain/complaint.entity";
import ComplaintRepositoryException from "../domain/exception/complaint_repository.exception";
import ICreateComplaintUseCase from "../domain/usecases/i_create_complaint_use_case";
import { CREATE_COMPLAINT_USE_CASE } from "../symbols";

@Controller("/api/complaint")
export default class ComplaintController {
  constructor(
    @Inject(CREATE_COMPLAINT_USE_CASE)
    private readonly createComplaint: ICreateComplaintUseCase,
  ) {}
  @Post("")
  @HttpCode(201)
  public async create(@Body() complaintBody: ComplaintEntity) {
    try {
      return await this.createComplaint.create(complaintBody);
    } catch (e) {
      if (e instanceof ComplaintRepositoryException) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: e.stack,
        });
      }
    }
  }
}
