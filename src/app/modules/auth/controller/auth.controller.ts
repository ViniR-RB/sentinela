import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import AuthRefreshGuard from "src/app/core/guard/auth_refresh.guard";
import AuthRepositoryException from "../domain/exceptions/auth_repository.exception";
import ILoginUsecase from "../domain/usecases/i_login_use_case";
import IRefreshTokensUseCase from "../domain/usecases/i_refresh_tokens_use_case";
import LoginDto from "../dto/login.dto";
import { LOGIN_USECASE, REFRESHTOKENS_USECASE } from "../symbols";

@Controller("/api/auth")
export default class AuthController {
  constructor(
    @Inject(LOGIN_USECASE) private readonly loginUsecase: ILoginUsecase,
    @Inject(REFRESHTOKENS_USECASE)
    private readonly refreshUseCase: IRefreshTokensUseCase,
  ) {}
  @Post("/login")
  async login(@Body() bodyRequest: LoginDto) {
    try {
      const { email, password, perfilType } = bodyRequest;
      return await this.loginUsecase.login(email, password, perfilType);
    } catch (error) {
      if (error instanceof AuthRepositoryException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND, {
          cause: error.stack,
        });
      }
    }
  }
  @UseGuards(AuthRefreshGuard)
  @Get("/refresh")
  async refreshTokens(@Request() req, @Body() body) {
    try {
      const id = req.user.sub;
      const { perfilType } = body;
      return await this.refreshUseCase.refresh(id, perfilType);
    } catch (error) {
      if (error instanceof AuthRepositoryException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND, {
          cause: error.stack,
        });
      }
    }
  }
}
