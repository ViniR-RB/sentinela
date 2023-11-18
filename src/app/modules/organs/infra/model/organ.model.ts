import BaseModel from "src/app/core/utils/base.model";
import ComplaintModel from "src/app/modules/complaint/infra/model/complaint.model";
import { Entity, OneToMany } from "typeorm";
import OrganEntity from "../../domain/organ.entity";

@Entity({
  name: "organ",
})
export default class OrganModel extends BaseModel {
  @OneToMany(() => ComplaintModel, (complaint) => complaint.organId)
  complaints: ComplaintModel[];

  get fromModelToEntity(): OrganEntity {
    return new OrganEntity(
      this.id,
      this.name,
      this.email,
      this.password,
      this.complaints,
    );
  }
}
