import BaseModel from "src/app/core/utils/base.model";
import { Entity } from "typeorm";
import AdministratorEntity from "../../domain/administrator.entity";
@Entity({
  name: "administrator",
})
export default class AdministratorModel extends BaseModel {
  get fromModelToEntity(): AdministratorEntity {
    return new AdministratorEntity(
      this.id,
      this.name,
      this.email,
      this.password,
    );
  }
}
