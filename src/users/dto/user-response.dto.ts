import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  secondLastname: string;

  @ApiProperty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
