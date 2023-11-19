import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Repository } from "typeorm";
import IComplaintGateway from "../../adapters/i_complaint_gateway";
import ComplaintEntity from "../../domain/complaint.entity";
import ComplaintRepositoryException from "../../domain/exception/complaint_repository.exception";
import ComplaintModel from "../model/complaint.model";
@Injectable()
export default class ComplaintRepository implements IComplaintGateway {
  constructor(
    @InjectRepository(ComplaintModel)
    private readonly complaintRepository: Repository<ComplaintModel>,
  ) {}
  async updateComplaintStatus(id: string, status: string): Promise<void> {
    try {
      const complaintFinder = await this.complaintRepository.findOneByOrFail({
        id: id,
      });
      const complaintModifiy = {
        ...complaintFinder,
        status: status,
      };
      await this.complaintRepository.save(
        this.complaintRepository.create(complaintModifiy),
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new ComplaintRepositoryException("Essa denúncia não existe");
      }
      throw new ComplaintRepositoryException(
        "Hove um erro inesperado em alterar as denúncias",
      );
    }
  }
  async getAllComplaint(): Promise<ComplaintEntity[]> {
    try {
      const complaintList = await this.complaintRepository.find();
      const complaintEntityList = complaintList.map((e) => e.fromModelToEntity);
      return complaintEntityList;
    } catch (e) {
      throw new ComplaintRepositoryException(e.message, e.stack);
    }
  }
  public async create(
    complaintEntity: ComplaintEntity,
  ): Promise<ComplaintEntity> {
    try {
      if (complaintEntity.userId == null || complaintEntity.organId == null) {
        throw new ComplaintRepositoryException(
          "Você não pode criar uma denuncia sem o orgão responsável ou sem o id do usuário",
        );
      }
      return await this.complaintRepository.save(
        this.complaintRepository.create(complaintEntity),
      );
    } catch (e) {
      throw new ComplaintRepositoryException(e.message, e.stack);
    }
  }
}
