import BaseModel from "src/app/core/utils/base.model";
import { Entity } from "typeorm";
@Entity({
  name: "administrator",
})
export default class AdministratorModel extends BaseModel {}
