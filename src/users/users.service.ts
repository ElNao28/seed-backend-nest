import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { handleDatabaseErrors } from 'src/common/helpers/handler-db-error.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    const foundUser = await this.userRepository.findOneBy({ id: userId });

    if (!foundUser) throw new NotFoundException('User not found');

    try {
      await this.userRepository.update(userId, updateUserDto);
      return updateUserDto;
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }

  public async getAllUser(paginationDto: PaginationDto) {
    const { page, size, sort } = paginationDto;
    try {
      const foundUser = await this.userRepository.find({
        take: size,
        skip: (page - 1) * size,
        order: {
          createAt: sort,
        },
        relations: {
          roles: true,
        },
        where: {
          status: false,
        },
      });
      return foundUser;
    } catch (error) {
      handleDatabaseErrors(error);
    }
  }
}
