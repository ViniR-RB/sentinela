import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "complaint",
})
export default class ComplaintModel {
  @PrimaryColumn({
    type: "uuid",
    generated: "uuid",
    unique: true,
  })
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  longitude: string;
  @Column()
  latitude: string;
  @Column()
  status: string;
  @Column()
  image: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;
  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;
}
