import BaseModel from "src/app/core/utils/base.model";
import ComplaintModel from "src/app/modules/complaint/infra/model/complaint.model";
import { Entity, OneToMany } from "typeorm";

@Entity({
  name: "organ",
})
export default class OrganModel extends BaseModel {
  @OneToMany(() => ComplaintModel, (complaint) => complaint.organId)
  complaints: ComplaintModel[];
}
