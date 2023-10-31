import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "src/app/core/services/encryption.service";
import { EntityNotFoundError, Repository } from "typeorm";
import IUserAdapterGateway from "../../adapters/i_user_gateway";
import UserRepositoryException from "../../domain/exception/user_repository.exception";
import UserModel from "../model/user.model";
import UserEntity from "../../domain/user.entity";

@Injectable()
export default class UserRepository implements IUserAdapterGateway {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  public async delete(id: string): Promise<void> {
    try {
      const user = await this.findOneById(id);

      await this.userRepository.delete(user);
      return;
    } catch (error) {
      if (error instanceof UserRepositoryException) {
        throw error;
      }
      throw new UserRepositoryException(
        "Não foi possível deletar o usuário",
        error.stack,
      );
    }
  }
  public async findOneById(id: string) {
    try {
      return await this.userRepository.findOneByOrFail({
        id: id,
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UserRepositoryException("Usuário não encontrado");
      }
    }
  }
  public async create(): Promise<UserEntity> {
    try {
      return await this.userRepository.save(this.userRepository.create());
    } catch (error) {
      throw new UserRepositoryException(error.message, error.stack);
    }
  }
}
