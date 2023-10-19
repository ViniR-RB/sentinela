import {
  Column,
  CreateDateColumn,
  Entity,
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
  @Column()
  name: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;
  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;
}
