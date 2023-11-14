import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import OrganEntity from "../domain/organ.entity";
import ICreateOrgansUseCase from "../domain/usecases/i_create_organ_use_case";
import { CREATE_ORGAN_USE_CASE } from "../symbols";

@Controller("/api/organ")
export default class OrganController {
  constructor(
    @Inject(CREATE_ORGAN_USE_CASE)
    private readonly createOrganService: ICreateOrgansUseCase,
  ) {}
  @Post("")
  public async create(@Body() organEntity: OrganEntity) {
    try {
      return await this.createOrganService.create(organEntity);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT, {
        cause: e,
      });
    }
  }
}
