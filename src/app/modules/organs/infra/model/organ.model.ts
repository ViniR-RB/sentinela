import BaseModel from "src/app/core/utils/base.model";
import { Entity } from "typeorm";

@Entity({
  name: "organ",
})
export default class OrganModel extends BaseModel {}
