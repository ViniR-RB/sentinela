import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export default abstract class BaseModel {
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
