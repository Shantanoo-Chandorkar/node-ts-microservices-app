import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  adminId: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  likes: number;
}
