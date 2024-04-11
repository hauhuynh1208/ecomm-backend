import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  static allowSearch(): string[] {
    return [];
  }
}
