import BaseModel from "src/app/core/utils/base.model";
import { Column, Entity } from "typeorm";

@Entity({
  name: "enterprise",
})
export default class EnterpriseModel extends BaseModel {
  @Column({
    length: 18,
    type: "varchar",
    unique: true,
  })
  cnpj: string;
}
