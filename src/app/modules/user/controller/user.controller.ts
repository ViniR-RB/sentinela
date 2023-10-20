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
import AuthGuard from "src/app/core/guard/auth.guard";
import UserAlreadyExists from "../domain/exception/user_already_exists.exception";
import IUserCreateUseCase from "../domain/usecases/i_user_create_use_case";
import IUserUpdateUseCase from "../domain/usecases/i_user_update_use_case";
import UserEntity from "../domain/user.entity";
import { USER_CREATE_USE_CASE, USER_UPDATE_USE_CASE } from "../symbols";

@Controller("/api/user")
export default class UserController {
  constructor(
    @Inject(USER_CREATE_USE_CASE)
    private readonly userCreateUseCase: IUserCreateUseCase,
    @Inject(USER_UPDATE_USE_CASE)
    private readonly userUpdatedUseCase: IUserUpdateUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() userCreate: UserEntity) {
    try {
      await this.userCreateUseCase.create(userCreate);
      return;
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        throw new HttpException(error.message, HttpStatus.CONFLICT, {
          cause: error.stack,
        });
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.stack,
      });
    }
  }
  @UseGuards(AuthGuard)
  @Put(":id")
  public async updated(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() userAltered: UserEntity,
  ): Promise<UserEntity> {
    try {
      return await this.userUpdatedUseCase.update(id, userAltered);
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
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
