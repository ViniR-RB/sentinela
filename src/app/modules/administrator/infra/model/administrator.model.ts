import BaseModel from "src/app/core/utils/base.model";
import { AdministratorType } from "src/app/core/utils/perfil.type";
import { Column, Entity } from "typeorm";
@Entity({
  name: "administrator",
})
export default class AdministratorModel extends BaseModel {
  @Column({
    type: "enum",
    enum: AdministratorType,
    name: "AdministratorType",
  })
  administratorType: AdministratorType;
}
