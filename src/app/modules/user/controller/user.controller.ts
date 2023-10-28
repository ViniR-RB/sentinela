import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import IUserCreateUseCase from "../domain/usecases/i_user_create_use_case";
import IUserDeleteUseCase from "../domain/usecases/i_user_delete_use_case";
import UserEntity from "../domain/user.entity";
import { USER_CREATE_USE_CASE, USER_DELETE_USE_CASE } from "../symbols";
import AuthAdministratorGuard from "src/app/core/guard/auth_administrator.guard";

@Controller("/api/user")
export default class UserController {
  constructor(
    @Inject(USER_CREATE_USE_CASE)
    private readonly userCreateUseCase: IUserCreateUseCase,
    @Inject(USER_DELETE_USE_CASE)
    private readonly userDeleteUseCase: IUserDeleteUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() userCreate: UserEntity) {
    try {
      await this.userCreateUseCase.create(userCreate);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.stack,
      });
    }
  }
  @UseGuards(AuthAdministratorGuard)
  @Put(":id")
  public async delete(
    @Param("id", new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    try {
      return await this.userDeleteUseCase.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.stack,
      });
    }
  }
}
