import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import IUserAdapterGateway from "../../adapters/i_user_gateway";
import UserRepositoryException from "../../domain/exception/user_repository.exception";
import UserEntity from "../../domain/user.entity";
import UserModel from "../model/user.model";

@Injectable()
export default class UserRepository implements IUserAdapterGateway {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}
  public async delete(id: string): Promise<void> {
    try {
      await this.findOneById(id);
      await this.userRepository.delete({ id: id });
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
  public async findOneById(id: string): Promise<UserEntity> {
    try {
      const userFinder = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          complaints: true,
        },
      });
      return new UserEntity(
        userFinder.id,
        userFinder.complaints.map((e) => e.fromModelToEntity),
      );
    } catch (error) {
      throw new UserRepositoryException("Usuário não encontrado");
    }
  }
  public async create(): Promise<UserEntity> {
    try {
      const userModel = this.userRepository.create();
      await this.userRepository.save(userModel);
      return new UserEntity(userModel.id, []);
    } catch (error) {
      throw new UserRepositoryException(error.message, error.stack);
    }
  }
}
