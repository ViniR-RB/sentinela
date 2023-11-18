import OrganModel from "src/app/modules/organs/infra/model/organ.model";
import UserModel from "src/app/modules/user/infra/model/user.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import ComplaintEntity from "../../domain/complaint.entity";

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

  @ManyToOne(() => UserModel, (user) => user.complaints, { nullable: false })
  @JoinColumn()
  userId: string;
  @JoinColumn()
  @ManyToOne(() => OrganModel, (organ) => organ.complaints, { nullable: false })
  organId: string;

  get fromModelToEntity(): ComplaintEntity {
    return new ComplaintEntity(
      this.id,
      this.title,
      this.description,
      this.longitude,
      this.latitude,
      this.createdAt,
      this.status,
      this.image,
      this.userId,
      this.organId,
    );
  }
}
