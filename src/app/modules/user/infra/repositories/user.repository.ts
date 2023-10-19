import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "src/app/core/services/encryption.service";
import { Repository } from "typeorm";
import IUserAdapterGateway from "../../adapters/i_user_gateway";
import UserAlreadyExists from "../../domain/exception/user_already_exists.exception";
import UserNotAlreadyExists from "../../domain/exception/user_not_already_exists.exception";
import UserRepositoryException from "../../domain/exception/user_repository.exception";
import UserEntity from "../../domain/user.entity";
import UserModel from "../model/user.model";

@Injectable()
export default class UserRepository implements IUserAdapterGateway {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  public async create(userCreate: UserEntity): Promise<void> {
    const { email } = userCreate;
    try {
      const userFinder = await this.userRepository.findOneBy({
        email: email,
      });
      if (userFinder !== null) {
        throw new UserAlreadyExists("Usuário já existe");
      }
      const hashedPassowrd = await this.encryptionService.hash(
        userCreate.password,
      );
      const data = {
        ...userCreate,
        password: hashedPassowrd,
      };
      await this.userRepository.save(this.userRepository.create(data));
      return;
    } catch (error) {
      throw new UserRepositoryException(error.message, error.stack);
    }
  }
  public async update(
    id: string,
    userAltered: UserEntity,
  ): Promise<UserEntity> {
    try {
      const userFinder = await this.userRepository.findOneBy({
        id: id,
      });
      if (userFinder === null) {
        throw new UserNotAlreadyExists("Usuário não existe");
      }
      this.userRepository.merge(userFinder, userAltered);
      await this.userRepository.update(id, userFinder);
      return userFinder;
    } catch (error) {
      throw new UserRepositoryException(error.message, error.stack);
    }
  }
}
