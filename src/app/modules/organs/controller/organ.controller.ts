import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";
import AuthAdministratorGuard from "src/app/core/guard/auth_administrator.guard";
import OrganEntity from "../domain/organ.entity";
import ICreateOrgansUseCase from "../domain/usecases/i_create_organ_use_case";
import iGetAllOrgansIdAndName from "../domain/usecases/i_get_organ_id_and_name";
import {
  CREATE_ORGAN_USE_CASE,
  GET_ALL_ORGANS_ID_AND_NAME_USE_CASE,
} from "../symbols";

@Controller("/api/organ")
export default class OrganController {
  constructor(
    @Inject(CREATE_ORGAN_USE_CASE)
    private readonly createOrganService: ICreateOrgansUseCase,
    @Inject(GET_ALL_ORGANS_ID_AND_NAME_USE_CASE)
    private readonly getAllOrgansService: iGetAllOrgansIdAndName,
  ) {}
  @UseGuards(AuthAdministratorGuard)
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
  @Get("")
  public async getAllOrgansIdAndName() {
    return await this.getAllOrgansService.getAllOrgansIdAndName();
  }
}
