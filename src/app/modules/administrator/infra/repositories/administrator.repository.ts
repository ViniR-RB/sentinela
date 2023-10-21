import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "src/app/core/services/encryption.service";
import { EntityNotFoundError, Repository } from "typeorm";
import IAdministratorAdapterGateway from "../../adapters/i_administrator_gateway";
import AdministratorEntity from "../../domain/administrator.entity";
import AdministratorAlreadyExistsException from "../../domain/exception/administrator_already_exists.exception";
import AdministratorRepositoryException from "../../domain/exception/administrator_repository.exception";
import AdministratorModel from "../model/administrator.model";
@Injectable()
export default class AdministratorRepository
  implements IAdministratorAdapterGateway
{
  constructor(
    @InjectRepository(AdministratorModel)
    private readonly administratorRepository: Repository<AdministratorModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  public async findOneByEmail(email: string): Promise<AdministratorEntity> {
    try {
      return await this.administratorRepository.findOneByOrFail({
        email: email,
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new AdministratorRepositoryException(
          "Administrator não existe",
          error.stack,
        );
      }
      throw new AdministratorRepositoryException(error.message, error.stack);
    }
  }
  public async findOneById(id: string): Promise<AdministratorEntity> {
    try {
      return await this.administratorRepository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new AdministratorRepositoryException(
          "Administrator não existe",
          error.stack,
        );
      }
      throw new AdministratorRepositoryException(error.message, error.stack);
    }
  }

  public async create(administrator: AdministratorEntity): Promise<void> {
    const { id, password } = administrator;
    try {
      const administratorFinder = await this.administratorRepository.findOneBy({
        id: id,
      });
      if (administratorFinder !== null) {
        throw new AdministratorAlreadyExistsException(
          "Administrator já existe",
        );
      }
      const hashedPassword = await this.encryptionService.hash(password);
      const data = {
        ...administrator,
        password: hashedPassword,
      };
      await this.administratorRepository.save(
        this.administratorRepository.create(data),
      );
      return;
    } catch (error) {
      throw new AdministratorRepositoryException(error.message, error.stack);
    }
  }
}
