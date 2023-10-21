import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";
import AuthAdministratorGuard from "src/app/core/guard/auth_administrator.guard";
import EnterpriseEntity from "../domain/enterprise.entity";
import EnterpriseRepositoryException from "../domain/exception/enterprise_repository.exception";
import ICreateEnterpriseUseCase from "../domain/usescases/i_create_enterprise_use_case";
import { ENTERPRISE_CREATE_USE_CASE as CREATE_ENTERPRISE_USE_CASE } from "../symbols";

@Controller("/api/enterprise")
export default class EnterpriseController {
  constructor(
    @Inject(CREATE_ENTERPRISE_USE_CASE)
    private readonly enterpriseCreateUseCase: ICreateEnterpriseUseCase,
  ) {}
  @UseGuards(AuthAdministratorGuard)
  @Post("")
  public async create(@Body() enterprise: EnterpriseEntity) {
    try {
      return await this.enterpriseCreateUseCase.create(enterprise);
    } catch (error) {
      if (error instanceof EnterpriseRepositoryException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT, {
          cause: error.stack,
        });
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.stack,
      });
    }
  }
}
