import ComplaintModel from "src/app/modules/complaint/infra/model/complaint.model";
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "users",
})
export default class UserModel {
  @PrimaryColumn({
    type: "uuid",
    generated: "uuid",
    unique: true,
  })
  id: string;
  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;
  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;

  @OneToMany(() => ComplaintModel, (complaint) => complaint.userId)
  complaints: ComplaintModel[];
}
