import BaseModel from "src/app/core/utils/base.model";
import { Entity } from "typeorm";

@Entity({
  name: "users",
})
export default class UserModel extends BaseModel {}
