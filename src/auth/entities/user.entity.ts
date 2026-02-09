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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'lastname',
  })
  lastname: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'second_lastname',
    nullable: true,
  })
  secondLastname?: string;

  @ApiProperty()
  @Column({
    type: 'date',
  })
  birthdate: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  phone: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  status: boolean;

  @ApiProperty()
  @CreateDateColumn({
    name: 'create_at',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'update_at',
  })
  updateAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    name: 'delete_at',
  })
  deleteAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];
}
