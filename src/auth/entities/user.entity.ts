import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'second_lastname',
  })
  secondLastname: string;

  @Column({
    type: 'date',
  })
  birthdate: Date;

  @Column({
    type: 'varchar',
    length: 10,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    default: true,
  })
  status: boolean;

  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
