import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Users extends BaseEntity {
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false, select: false })
  password: string;
}
