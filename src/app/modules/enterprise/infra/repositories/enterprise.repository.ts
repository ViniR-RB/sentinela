import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EncryptionService } from "src/app/core/services/encryption.service";
import { EntityNotFoundError, Repository } from "typeorm";
import IEnterpriseAdapterGateway from "../../adapters/i_enterprise_gateway";
import EnterpriseEntity from "../../domain/enterprise.entity";
import EnterpriseAlreadyExistsException from "../../domain/exception/enterprise_already_exists.exception";
import EnterpriseRepositoryException from "../../domain/exception/enterprise_repository.exception";
import EnterpriseModel from "../model/enterprise.model";
@Injectable()
export default class EnterpriseRepository implements IEnterpriseAdapterGateway {
  constructor(
    @InjectRepository(EnterpriseModel)
    private readonly enterpriseRepository: Repository<EnterpriseModel>,
    private readonly encryptionService: EncryptionService,
  ) {}
  public async findOneByEmail(email: string): Promise<EnterpriseEntity> {
    try {
      return await this.enterpriseRepository.findOneByOrFail({ email: email });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new EnterpriseRepositoryException("Empresa não existe");
      }
    }
  }
  public async findOneById(id: string): Promise<EnterpriseEntity> {
    try {
      return await this.enterpriseRepository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new EnterpriseRepositoryException("Empresa não existe");
      }
    }
  }

  public async create(enterPrise: EnterpriseEntity): Promise<void> {
    const { cnpj, password } = enterPrise;
    try {
      const userFinder = await this.enterpriseRepository.findOneBy({
        cnpj: cnpj,
      });
      if (userFinder !== null) {
        throw new EnterpriseAlreadyExistsException(
          "Essa empresa já foi cadastrada",
        );
      }
      const hashedPassowrd = await this.encryptionService.hash(password);
      const data = {
        ...enterPrise,
        passowrd: hashedPassowrd,
      };
      await this.enterpriseRepository.save(
        this.enterpriseRepository.create(data),
      );
      return;
    } catch (error) {
      throw new EnterpriseRepositoryException(error.message, error.stack);
    }
  }
}
