import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
  public async create(
    complaintEntity: ComplaintEntity,
  ): Promise<ComplaintEntity> {
    try {
      return await this.complaintRepository.save(
        this.complaintRepository.create(complaintEntity),
      );
    } catch (e) {
      throw new ComplaintRepositoryException(e.message, e.stack);
    }
  }
}
