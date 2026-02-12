import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Authorization,
  ROLES,
} from 'src/auth/decorators/authorization.decorator';
import { UserId } from './decorators/user-id.decorator';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dto/pagination-dto';
import { Public } from '../common/decorators/public.decorator';

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

  @ApiOkResponse({
    description: 'Found user',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Authorization()
  @Get('me')
  public getUserByToken(@UserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @ApiOkResponse({
    description: 'Found user',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Authorization()
  @Get(':id')
  public getUserById(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.getUserById(userId);
  }
}
