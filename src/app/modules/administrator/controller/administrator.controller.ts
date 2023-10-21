import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import AdministratorEntity from "../domain/administrator.entity";
import AdministratorRepositoryException from "../domain/exception/administrator_repository.exception";
import ICreateAdministratorUseCase from "../domain/usecases/i_create_administrator_use_case";
import { CREATE_ADMINISTRATOR_USE_CASE } from "../symbols";

@Controller("/api/administrator")
export default class AdministratorController {
  constructor(
    @Inject(CREATE_ADMINISTRATOR_USE_CASE)
    private readonly createAdministratorService: ICreateAdministratorUseCase,
  ) {}

  @Post("")
  public async create(
    @Body() administrator: AdministratorEntity,
  ): Promise<void> {
    try {
      return await this.createAdministratorService.create(administrator);
    } catch (error) {
      if (error instanceof AdministratorRepositoryException) {
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
