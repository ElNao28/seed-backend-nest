import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Authorization,
  ROLES,
} from 'src/auth/decorators/authorization.decorator';
import { UserId } from './decorators/user-id.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Update user successfully',
    type: UpdateUserDto,
  })
  @Authorization()
  @Put()
  public updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UserId() userId: string,
  ) {
    return this.usersService.updateUser(updateUserDto, userId);
  }

  @ApiOkResponse({
    description: 'Found users',
    type: User,
    isArray: true,
  })
  @Authorization(ROLES.SuperAdmin, ROLES.Admin)
  @Get()
  public getAllUser(@Query() paginationDto: PaginationDto) {
    return this.usersService.getAllUser(paginationDto);
  }
}
