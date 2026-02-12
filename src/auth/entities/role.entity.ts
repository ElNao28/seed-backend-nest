import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role' })
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

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

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
