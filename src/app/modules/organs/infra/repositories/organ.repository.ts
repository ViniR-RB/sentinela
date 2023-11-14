import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "src/app/core/services/encryption.service";
import { Repository } from "typeorm";
import IOrganAdapterGateway from "../../adapters/i_organs_gateway";
import OrganAlreadyExistsException from "../../domain/exception/organ_already_exists.exception";
import OrganRepositoryException from "../../domain/exception/organ_repository.exception";
import OrganEntity from "../../domain/organ.entity";
import OrganModel from "../model/organ.model";

@Injectable()
export default class OrganRepository implements IOrganAdapterGateway {
  constructor(
    @InjectRepository(OrganModel)
    private readonly organRepository: Repository<OrganModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  async findOneByEmail(email: string): Promise<OrganEntity> {
    try {
      return await this.organRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new OrganRepositoryException(error.message, error.stack);
    }
  }
  async findOneById(id: string): Promise<OrganEntity> {
    try {
      return await this.organRepository.findOneBy({ id: id });
    } catch (error) {
      throw new OrganRepositoryException(error.message, error.stack);
    }
  }
  async create(organEntity: OrganEntity): Promise<void> {
    try {
      const organFinder = await this.organRepository.findOneBy({
        email: organEntity.email,
      });
      if (organFinder !== null) {
        throw new OrganAlreadyExistsException("Orgão já cadastrado");
      }
      const hashedPassword = await this.encryptionService.hash(
        organEntity.password,
      );
      const data = {
        ...organEntity,
        password: hashedPassword,
      };
      await this.organRepository.save(this.organRepository.create(data));
    } catch (e) {
      throw new OrganRepositoryException(e.message, e.stack);
    }
  }
}
